// scripts/generateMisspellings.js
const fs = require('fs')
const axios = require('axios')

const MISSPELL_API_URL = 'https://qk7g2mpk1h.execute-api.us-east-1.amazonaws.com/test/misspell'
const OUTPUT_PATH = './data/word-misspellings.json'
const DELAY_MS = 300

// some wordlist entries carry multiple variants in one string, e.g. "à gogo, àgo-go" - use the first
function cleanWord(word) {
  return word.split(',')[0].trim()
}

async function generateMisspelling(word) {
  try {
    const response = await axios.post(MISSPELL_API_URL, { word }, {
      headers: { 'Content-Type': 'application/json' }
    })

    const misspelling = response.data?.data?.misspelling

    if (!misspelling) {
      console.log(`❌ No misspelling returned for: ${word}`)
      return null
    }

    console.log(`✅ ${word} -> ${misspelling}`)
    return misspelling
  } catch (error) {
    console.log(`❌ Error generating misspelling for ${word}:`, error.message)
    return null
  }
}

async function generateAllMisspellings() {
  const words = JSON.parse(fs.readFileSync('./data/wordlist.json', 'utf-8'))

  // optional: node scripts/generateMisspellings.js 25  -> only process the first 25 words
  const limitArg = parseInt(process.argv[2], 10)
  const wordsToProcess = Number.isInteger(limitArg) ? words.slice(0, limitArg) : words

  // resume support: merge into whatever's already been generated so a partial/interrupted run isn't wasted
  const misspellingMap = fs.existsSync(OUTPUT_PATH)
    ? JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8'))
    : {}

  console.log(`Starting to generate misspellings for ${wordsToProcess.length} words...\n`)

  for (let i = 0; i < wordsToProcess.length; i++) {
    const word = cleanWord(wordsToProcess[i])

    if (misspellingMap[word]) {
      console.log(`[${i + 1}/${wordsToProcess.length}] Skipping (already have): ${word}`)
      continue
    }

    console.log(`[${i + 1}/${wordsToProcess.length}] Processing: ${word}`)

    const misspelling = await generateMisspelling(word)
    if (misspelling) {
      misspellingMap[word] = misspelling
      // write after every word so an interrupted run doesn't lose progress
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(misspellingMap, null, 2))
    }

    await new Promise(resolve => setTimeout(resolve, DELAY_MS))
  }

  console.log(`\n✅ Generation complete! ${Object.keys(misspellingMap).length}/${words.length} words have a misspelling.`)
}

generateAllMisspellings()
