import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'wordlist.json')
        const words = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        
        return NextResponse.json({ words, count: words.length })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load words' }, { status: 500})
    }
}