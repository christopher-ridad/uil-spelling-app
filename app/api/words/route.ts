import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const random = searchParams.get('random');
    
    // Load the word list
    const wordListPath = path.join(process.cwd(), 'data', 'wordlist.json');
    const wordList = JSON.parse(fs.readFileSync(wordListPath, 'utf-8'));
    
    // Load the definitions map
    const definitionsPath = path.join(process.cwd(), 'data', 'words-with-definitions.json');
    const definitionsMap = JSON.parse(fs.readFileSync(definitionsPath, 'utf-8'));
    
    // If random=true, return a single random word with its definition
    if (random === 'true') {
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      const wordData = definitionsMap[randomWord];
      
      if (!wordData) {
        return NextResponse.json({ 
          error: 'Definition not found',
          word: randomWord 
        }, { status: 404 });
      }
      
      return NextResponse.json({
        word: randomWord,
        definition: wordData.definition,
        partOfSpeech: wordData.partOfSpeech,
        example: wordData.example,
        source: wordData.source
      });
    }
    
    // Otherwise return all words with definitions
    // CHECK THIS
    const allWordsWithData = wordList.map((word: string) => ({
      word: word,
      ...definitionsMap[word]
    }));
    
    return NextResponse.json({ 
      words: allWordsWithData, 
      count: allWordsWithData.length 
    });
    
  } catch (error) {
    console.error('Error loading words:', error);
    return NextResponse.json({ error: 'Failed to load words' }, { status: 500 });
  }
}