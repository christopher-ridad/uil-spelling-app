'use client'

import { COLORS } from '@/shared/utils/colors'
import PracticeMode from '../PracticeMode'

// re-examine html tags + arial labels

export default function PracticeModeGrid() {
    return (
        <main className="grid grid-cols-2 gap-4">
            <PracticeMode
                fromColor={COLORS.blue.bgTransitionFrom}
                toColor={COLORS.blue.bgTransitionTo}
                buttonText="Spelling Practice"
                subText="Listen & type"
                href="/dashboard/spelling"
            />
                
            <PracticeMode
                fromColor={COLORS.red.bgTransitionFrom}
                toColor={COLORS.red.bgTransitionTo}
                buttonText="Vocabulary"
                subText="Flashcards"
                href="/dashboard/vocab"
            />

            <PracticeMode
                fromColor={COLORS.green.bgTransitionFrom}
                toColor={COLORS.green.bgTransitionTo}
                buttonText="Word Lists"
                subText="Identify the misspelled word"
                href="/dashboard/word-lists"
            />

            <PracticeMode
                fromColor={COLORS.yellow.bgTransitionFrom}
                toColor={COLORS.yellow.bgTransitionTo}
                buttonText="Practice Test"
                subText="Timed mode"
                href="/dashboard/mock-test"
            />
            <PracticeMode
                fromColor={COLORS.pink.bgTransitionFrom}
                toColor={COLORS.pink.bgTransitionTo}
                buttonText="Practice Test"
                subText="Timed mode"
                href="/dashboard/all-words"
            />
        </main>      
    )
}