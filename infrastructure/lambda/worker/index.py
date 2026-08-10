#
# Worker Lambda: triggered by SQS, one message per word. Generates a
# misspelling via Gemini and writes it to Supabase's word_misspellings
# table via PostgREST (service_role key).
#
# Secrets (Gemini API key, Supabase service_role key) are fetched from
# Secrets Manager at runtime via their ARN, cached per execution
# environment - never injected as plain Lambda environment variables,
# since those are readable in plaintext by anyone with
# lambda:GetFunctionConfiguration.
#
# Returns batchItemFailures so SQS only retries the specific messages
# that failed, not the whole batch.
#
import json
import os
import urllib.request
import urllib.error
import boto3
import google.genai as genai

secrets_client = boto3.client('secretsmanager')

_gemini_key_cache = None
_supabase_key_cache = None

def get_secret(secret_arn):
  response = secrets_client.get_secret_value(SecretId=secret_arn)
  return response["SecretString"]

def get_gemini_key():
  global _gemini_key_cache
  if _gemini_key_cache is None:
    _gemini_key_cache = get_secret(os.environ["GEMINI_SECRET_ARN"])
  return _gemini_key_cache

def get_supabase_key():
  global _supabase_key_cache
  if _supabase_key_cache is None:
    _supabase_key_cache = get_secret(os.environ["SUPABASE_SECRET_ARN"])
  return _supabase_key_cache

def generate_misspelling(word):
  client = genai.Client(api_key=get_gemini_key())

  prompt = (
    f"Generate exactly one realistic, plausible misspelling of the word '{word}'. "
    f"It should look like a common student mistake, not random characters. "
    f"Respond only with the misspelled word as a plain string, no explanation, no extra text."
  )

  response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt
  )
  return response.text.strip()

def save_to_supabase(word, misspelling):
  supabase_url = os.environ["SUPABASE_URL"]
  service_role_key = get_supabase_key()

  endpoint = f"{supabase_url}/rest/v1/word_misspellings"
  payload = json.dumps({
    "word": word,
    "misspelling": misspelling,
    "source": "gemini"
  }).encode("utf-8")

  req = urllib.request.Request(
    endpoint,
    data=payload,
    method="POST",
    headers={
      "apikey": service_role_key,
      "Authorization": f"Bearer {service_role_key}",
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates"
    }
  )

  with urllib.request.urlopen(req, timeout=10) as response:
    return response.status

def lambda_handler(event, context):
  batch_item_failures = []

  for record in event.get("Records", []):
    message_id = record["messageId"]
    try:
      body = json.loads(record["body"])
      word = body["word"]

      print(f"**Processing: {word}")
      misspelling = generate_misspelling(word)
      print(f"**Generated: {word} -> {misspelling}")

      save_to_supabase(word, misspelling)
      print(f"**Saved: {word}")

    except Exception as e:
      print(f"**Failed to process message {message_id}:", str(e))
      batch_item_failures.append({"itemIdentifier": message_id})

  return {"batchItemFailures": batch_item_failures}
