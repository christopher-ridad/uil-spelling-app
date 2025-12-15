// scripts/fetchDefinitions.js
const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')

async function lookupWord(word) {
  try {
    // Clean the word for URL (replace spaces with '+', remove trailing parentheses and handle apostrophe)
     const cleanedWord = word.split(',')[0].trim()  // Take the first word if there are multiple
    
    // Remove any trailing parentheses and replace multiple spaces with '+' and normalize apostrophe's
    const formattedWord = cleanedWord
      .replace(/\s?\([^)]+\)$/, '') 
      .replace(/\s+/g, '+')
      .replace(/[’']/g, '%27')   
    
    console.log(formattedWord)
    const url = `https://ahdictionary.com/word/search.html?q=${formattedWord}`

    console.log(`Fetching: ${word} from ${url}`)
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const $ = cheerio.load(response.data)
    
    // Extract definition
    const definition = $('.ds-single').first().text().trim() || 
                       $('.ds-list').first().text().trim()

    // Extract part of speech
    const partOfSpeech = $('.pos').first().text().trim()
    
    // Extract example if available (better selector)
    const example = $('.ds-single .illustration').first().text().trim() ||
                    $('.ds-single .pseg').last().text().trim()

    if (!definition) {
      console.log(`❌ No definition found for: ${word}`);
      return null
    }
    
    console.log(`✅ Found: ${word}`)
    
    return {
      word: word,
      partOfSpeech: partOfSpeech || null,
      definition: definition,
      example: example || null,
      source: 'American Heritage Dictionary'
    }
    
  } catch (error) {
    console.log(`❌ Error fetching ${word}:`, error.message);
    return null
  }
}

async function fetchAllDefinitions() {
  const words = JSON.parse(fs.readFileSync('./data/wordlist.json', 'utf-8'));
  const wordDefinitionMap = {};  // Map to store word-definition data
  
  console.log(`Starting to fetch definitions for ${words.length} words...\n`);
  
  // Loop through each word and fetch its definition
  for (let i = 0; i < 10; i++) {
    const word = words[i];
    
    console.log(`[${i + 1}/${words.length}] Processing: ${word}`);
    
    // Fetch definition from API or web scraping (adjust as necessary)
    const wordData = await lookupWord(word);
    
    if (wordData) {
      wordDefinitionMap[word] = wordData;  // Store the word and its metadata
    } else {
      wordDefinitionMap[word] = { error: 'Not found' };
    }
    
    // Wait between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Save the word-definition map to a file
  fs.writeFileSync('./data/words-with-definitions.json', JSON.stringify(wordDefinitionMap, null, 2));
  
  console.log(`\n✅ Fetching complete!`);
}

fetchAllDefinitions()
