const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

async function parseUILSpellingList() {
  try {
    const pdfPath = './data/uil-spelling-list-25-26.pdf';
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdf = await loadingTask.promise;
    
    console.log(`PDF loaded: ${pdf.numPages} pages\n`);
    
    let allText = '';
    
    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Combine all text items from the page
      const pageText = textContent.items.map(item => item.str).join(' ');
      allText += pageText + '\n';
    }
    
    // Parse the words
    const words = extractWords(allText);
    
    // Save as JSON
    fs.writeFileSync('./data/wordlist.json', JSON.stringify(words, null, 2));
    console.log(`\nExtracted ${words.length} words`);
    console.log('Saved to data/wordlist.json');
    
    console.log('\nFirst 10 words:');
    console.log(words.slice(0, 10));
    
    console.log('\nLast 10 words:');
    console.log(words.slice(-10));
    
  } catch (error) {
    console.error('Error:', error);
  }
}

function extractWords(text) {
  const words = [];
  
  // Match everything that looks like: NUMBER. WORD
  const regex = /(\d+)\.\s+(.+?)(?=\s+\d+\.|$)/gs;
  
  let match;
  while ((match = regex.exec(text)) !== null) {
    const num = parseInt(match[1]);
    let word = match[2];
    
    // Clean the word
    word = word
      .replace(/\s*•\s*/g, '')           // Remove bullets
      .replace(/\s+\d+\s*$/g, '')        // Remove trailing page numbers
      .replace(/\s+/g, ' ')              // Normalize spaces
      .trim();
    
    // Skip page numbers and empty strings
    if (word && word.length > 0 && !word.match(/^\d+$/)) {
      words.push({ number: num, word: word });
    }
  }
    
  console.log('\nTotal words found:', words.length);  
  return words.map(w => w.word);
}

parseUILSpellingList();