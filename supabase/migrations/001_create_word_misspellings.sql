-- word_misspellings: one AI-generated plausible misspelling per word,
-- used by Word Lists mode's "spot the correct spelling" quiz.
-- One row per word (word is UNIQUE) - the current gameplay design only
-- needs a single misspelling per word, paired with 4 correctly-spelled
-- filler words at practice time.

create table if not exists word_misspellings (
  id uuid primary key default gen_random_uuid(),
  word text not null unique,
  misspelling text not null,
  source text not null default 'gemini',
  created_at timestamptz not null default now()
);

alter table word_misspellings enable row level security;

-- content data, not user-specific - safe to read publicly.
-- no insert/update/delete policy: only the service_role key (which
-- bypasses RLS) is meant to write here, from the worker Lambda.
create policy "word_misspellings are publicly readable"
  on word_misspellings
  for select
  using (true);
