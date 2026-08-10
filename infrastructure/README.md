# Misspelling generation pipeline (AWS CDK)

Event-driven pipeline for populating Supabase's `word_misspellings` table: a dispatcher Lambda enqueues one SQS message per word, a worker Lambda consumes the queue, calls Gemini for a plausible misspelling, and writes it to Supabase.

This replaces/complements the ad-hoc `scripts/generateMisspellings.js` (sequential, run from a laptop) with the fan-out shape described in issue #11: independently retryable per-word jobs instead of one long-running loop.

## Architecture

```
aws lambda invoke misspell-dispatcher
        |
        v
  bundled wordlist.json --(skip words already in Supabase)--> SQS queue (misspelling-generation-queue)
                                                                       |
                                                                       v
                                                          worker Lambda (misspell-worker)
                                                          - Gemini call (google-generativeai layer)
                                                          - writes to Supabase via PostgREST
                                                                       |
                                                            fails 3x -> misspelling-generation-dlq
```

The existing hand-created `misspell` Lambda (API Gateway-triggered, used for the original manual/curl testing) is untouched and still works independently - this stack doesn't replace it, it adds the fan-out path alongside it.

## Prerequisites

- Two secrets already created in Secrets Manager with real values set (not via this stack - see below):
  - `misspell-pipeline/gemini-api-key`
  - `misspell-pipeline/supabase-service-role-key`
- `infrastructure/.env` (gitignored, copy from `.env.example`) with `SUPABASE_URL` and `SUPABASE_ANON_KEY` - these are the same public values already in the app's `.env.local`.
- AWS CLI configured with credentials for the target account.

## Creating the secrets (one-time, do this yourself)

The stack references these secrets by name but doesn't create their values - the actual Gemini/Supabase keys should never pass through CDK source or an AI assistant's context.

```bash
aws secretsmanager create-secret --name "misspell-pipeline/gemini-api-key" \
  --secret-string "REPLACE_ME" --region us-east-1

aws secretsmanager create-secret --name "misspell-pipeline/supabase-service-role-key" \
  --secret-string "REPLACE_ME" --region us-east-1
```

Then set the real values via the Secrets Manager console (Retrieve secret value -> Edit), not the CLI, to avoid the value landing in shell history.

## Deploy

```bash
cd infrastructure
npm install
npx cdk bootstrap aws://<account-id>/us-east-1   # one-time per account/region
npx cdk synth                                     # review what would be created
npx cdk deploy
```

## Running a generation batch

The dispatcher isn't wired to an API Gateway route (no admin UI exists yet to call it from - see issue #9) - invoke it directly:

```bash
# dispatch everything not already in Supabase
aws lambda invoke --function-name misspell-dispatcher --region us-east-1 \
  --payload '{}' --cli-binary-format raw-in-base64-out response.json

# or limit to the first N words of the list (useful for testing against a free-tier quota)
aws lambda invoke --function-name misspell-dispatcher --region us-east-1 \
  --payload '{"limit": 25}' --cli-binary-format raw-in-base64-out response.json
```

The worker picks up messages automatically via its SQS event source mapping - no separate step needed. Watch progress with:

```bash
aws logs tail /aws/lambda/misspell-worker --follow --region us-east-1
```

Re-running the dispatcher is always safe - it skips any word that already has a row in `word_misspellings`.

## Notes

- **No reserved concurrency on the worker.** This AWS account's total Lambda concurrency limit is 10 (AWS requires at least 10 unreserved), so there's nothing to reserve. The account-wide cap already bounds total parallelism.
- **Secrets are fetched at runtime**, not injected as Lambda environment variables - env vars are readable in plaintext by anyone with `lambda:GetFunctionConfiguration`, which isn't true of Secrets Manager reads (scoped, auditable via CloudTrail).
- **Batch size 1** on the SQS trigger, with `reportBatchItemFailures` enabled - a failed word retries on its own (up to 3 times, then the DLQ) rather than requeuing an entire batch.
- If `cdk destroy` is ever run, the DLQ and queue are both `RemovalPolicy.DESTROY` (default) - any unprocessed messages would be lost. Not a concern for a queue that's expected to drain quickly, but worth knowing.
