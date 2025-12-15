'use client'

import { COLORS } from '../../lib/colors'
import PracticeMode from '../atoms/PracticeMode'

// re-examine html tags + arial labels

export default function PracticeModeGrid() {
    return (
        <main className="grid grid-cols-2 gap-4">
            <PracticeMode
                fromColor={COLORS.blue.bgTransitionFrom}
                toColor={COLORS.blue.bgTransitionTo}
                buttonText="Spelling Practice"
                subText="Listen & type"
                href="/spelling"
            />
                
            <PracticeMode
                fromColor={COLORS.red.bgTransitionFrom}
                toColor={COLORS.red.bgTransitionTo}
                buttonText="Vocabulary"
                subText="Flashcards"
                href="/vocab"
            />

            <PracticeMode
                fromColor={COLORS.green.bgTransitionFrom}
                toColor={COLORS.green.bgTransitionTo}
                buttonText="Word Lists"
                subText="Identify the misspelled word"
                href="/mock-spelling"
            />

            <PracticeMode
                fromColor={COLORS.yellow.bgTransitionFrom}
                toColor={COLORS.yellow.bgTransitionTo}
                buttonText="Practice Test"
                subText="Timed mode"
                href="/mock-vocab"
            />
        </main>      
    )
}