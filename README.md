# UIL Spelling App

A study app for UIL Spelling, built on the official 2025-26 UIL word list. The app parses the source PDF into structured data, auto-fetches definitions for each word, and turns the list into interactive practice modes: spelling drills, vocab flashcards, and mock tests, with progress tracked per user.

**Status:** in active development. Spelling practice is wired to the real word list and Supabase; vocab and mock-test modes currently render with placeholder data while the underlying data flow is finalized.

---

## Features

- **Word list pipeline:** parses the official UIL spelling list PDF into structured JSON, then fetches definitions, part of speech, and example sentences for each word
- **Spelling practice:** flippable card interface, pulls a random word from the real list, tracks correct/incorrect attempts per user via Supabase
- **Vocab flashcards:** definition-first study mode for building word familiarity
- **Mock test mode:** timed, scored practice sessions
- **Auth + progress tracking:** Supabase-backed accounts so practice history persists across sessions

## Tech Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Supabase (Auth, Postgres) · pdfjs-dist · Cheerio

## Architecture

- **`components/`:** split into `atoms`, `molecules`, `organisms`, and `templates`, roughly small to large, so simple pieces (a button, a word display) build up into full page layouts (the flippable spelling card, vocab card)
- **`scripts/parsePDF.js`:** one-time script that extracts the raw UIL word list from the source PDF into `data/wordlist.json`
- **`scripts/fetchDefinitions.js`:** enriches the parsed word list with definitions, part of speech, and examples, producing `data/words-with-definitions.json`
- **`lib/wordProgress.ts`:** handles reading/writing per-user word attempt history to Supabase
- **`app/api/`:** API routes serving word data to the client (e.g. random word selection for spelling practice)

## Getting Started

**Requirements:** Node.js 18+, npm, and a Supabase project.

```bash
npm install
cp .env.example .env
```

Fill in `.env` with your Supabase project URL and anon key:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

```bash
npm run dev
```

Runs at `http://localhost:3000`.

### Regenerating the word list

If the UIL word list PDF changes, regenerate the data files with:
```bash
npm run parse-pdf
npm run fetch-definitions
```

## Author
 
Built by [Christopher Ridad](https://linkedin.com/in/christopher-ridad).
