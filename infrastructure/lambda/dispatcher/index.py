#
# Dispatcher Lambda: reads the bundled word list, checks Supabase for
# words that already have a misspelling, and enqueues one SQS message
# per remaining word for the worker Lambda to pick up.
#
# Invoke with an empty event to dispatch everything, or
# {"limit": 25} to only dispatch the first 25 (unprocessed) words -
# useful for testing against a free-tier Gemini quota.
#
import json
import os
import urllib.request
import boto3

sqs = boto3.client('sqs')

def clean_word(word):
  # some wordlist entries carry multiple variants in one string,
  # e.g. "à gogo, àgo-go" - use the first
  return word.split(',')[0].strip()

def get_existing_words(supabase_url, anon_key):
  url = f"{supabase_url}/rest/v1/word_misspellings?select=word"
  req = urllib.request.Request(url, headers={
    "apikey": anon_key,
    "Authorization": f"Bearer {anon_key}"
  })
  with urllib.request.urlopen(req, timeout=10) as response:
    rows = json.loads(response.read().decode("utf-8"))
    return set(row["word"] for row in rows)

def lambda_handler(event, context):
  queue_url = os.environ["QUEUE_URL"]
  supabase_url = os.environ["SUPABASE_URL"]
  supabase_anon_key = os.environ["SUPABASE_ANON_KEY"]

  wordlist_path = os.path.join(os.path.dirname(__file__), "wordlist.json")
  with open(wordlist_path) as f:
    words = json.load(f)

  limit = event.get("limit") if isinstance(event, dict) else None
  if isinstance(limit, int) and limit > 0:
    words = words[:limit]

  print(f"**Loaded {len(words)} word(s) from bundled wordlist")

  try:
    existing = get_existing_words(supabase_url, supabase_anon_key)
    print(f"**Found {len(existing)} word(s) already in Supabase")
  except Exception as e:
    print("**Warning: could not check existing words, proceeding without skip:", str(e))
    existing = set()

  enqueued = 0
  skipped = 0

  for raw_word in words:
    word = clean_word(raw_word)
    if word in existing:
      skipped += 1
      continue

    sqs.send_message(
      QueueUrl=queue_url,
      MessageBody=json.dumps({"word": word})
    )
    enqueued += 1

  message = f"Enqueued {enqueued} word(s), skipped {skipped} already-generated word(s)"
  print("**" + message)

  return {
    "statusCode": 200,
    "body": json.dumps({"message": message, "data": {"enqueued": enqueued, "skipped": skipped}})
  }
