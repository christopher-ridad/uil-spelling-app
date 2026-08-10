// scripts/generateMisspellings.js
//
// Calls the misspell Lambda once per word. The Lambda itself persists
// the result to Supabase's word_misspellings table (service_role key,
// server-side) - this script's only job is to drive the loop and skip
// words that already have a row, so repeat runs don't burn Gemini
// quota re-generating misspellings that already exist.
const fs = require('fs')
const axios = require('axios')

const MISSPELL_API_URL = 'https://qk7g2mpk1h.execute-api.us-east-1.amazonaws.com/test/misspell'
const DELAY_MS = 300

// scripts run outside Next.js, so .env.local isn't loaded automatically
function loadEnvLocal() {
  const raw = fs.readFileSync('./.env.local', 'utf-8')
  const env = {}
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([^=]+)=(.*)$/)
    if (!match) continue
    let value = match[2].trim()
    if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
      value = value.slice(1, -1)
    }
    env[match[1].trim()] = value
  }
  return env
}

// some wordlist entries carry multiple variants in one string, e.g. "à gogo, àgo-go" - use the first
function cleanWord(word) {
  return word.split(',')[0].trim()
}

async function getExistingWords(supabaseUrl, anonKey) {
  const response = await axios.get(`${supabaseUrl}/rest/v1/word_misspellings?select=word`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`
    }
  })
  return new Set(response.data.map(row => row.word))
}

async function generateMisspelling(word) {
  try {
    const response = await axios.post(MISSPELL_API_URL, { word }, {
      headers: { 'Content-Type': 'application/json' }
    })

    const { misspelling, saved } = response.data?.data || {}

    if (!misspelling) {
      console.log(`❌ No misspelling returned for: ${word}`)
      return false
    }

    if (!saved) {
      console.log(`⚠️  Generated but NOT saved to Supabase (check Lambda env vars/logs): ${word} -> ${misspelling}`)
      return false
    }

    console.log(`✅ ${word} -> ${misspelling}`)
    return true
  } catch (error) {
    console.log(`❌ Error generating misspelling for ${word}:`, error.message)
    return false
  }
}

async function generateAllMisspellings() {
  const env = loadEnvLocal()
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !anonKey) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
    process.exit(1)
  }

  const words = JSON.parse(fs.readFileSync('./data/wordlist.json', 'utf-8'))

  // optional: node scripts/generateMisspellings.js 25  -> only process the first 25 words
  const limitArg = parseInt(process.argv[2], 10)
  const wordsToProcess = Number.isInteger(limitArg) ? words.slice(0, limitArg) : words

  console.log('Checking which words already have a misspelling in Supabase...')
  const existingWords = await getExistingWords(supabaseUrl, anonKey)
  console.log(`Found ${existingWords.size} existing word(s).\n`)

  console.log(`Starting to generate misspellings for ${wordsToProcess.length} words...\n`)

  let generatedCount = 0

  for (let i = 0; i < wordsToProcess.length; i++) {
    const word = cleanWord(wordsToProcess[i])

    if (existingWords.has(word)) {
      console.log(`[${i + 1}/${wordsToProcess.length}] Skipping (already have): ${word}`)
      continue
    }

    console.log(`[${i + 1}/${wordsToProcess.length}] Processing: ${word}`)

    const success = await generateMisspelling(word)
    if (success) generatedCount++

    await new Promise(resolve => setTimeout(resolve, DELAY_MS))
  }

  console.log(`\n✅ Run complete! ${generatedCount} new misspelling(s) saved to Supabase this run.`)
}

generateAllMisspellings()
