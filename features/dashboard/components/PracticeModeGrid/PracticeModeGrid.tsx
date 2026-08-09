'use client'

import { COLORS } from '@/shared/utils/colors'
import PracticeMode from '../PracticeMode'

// re-examine html tags + arial labels

export default function PracticeModeGrid() {
    return (
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PracticeMode
                fromColor={COLORS.blue.bgTransitionFrom}
                toColor={COLORS.blue.bgTransitionTo}
                buttonText="Spelling Practice"
                subText="Listen & type"
                href="/dashboard/spelling"
            />
                
            <PracticeMode
                fromColor={COLORS.indigo.bgTransitionFrom}
                toColor={COLORS.indigo.bgTransitionTo}
                buttonText="Vocabulary"
                subText="Flashcards"
                href="/dashboard/vocab"
            />

            <PracticeMode
                fromColor={COLORS.sky.bgTransitionFrom}
                toColor={COLORS.sky.bgTransitionTo}
                buttonText="Word Lists"
                subText="Identify the misspelled word"
                href="/dashboard/word-lists"
            />

            <PracticeMode
                fromColor={COLORS.cyan.bgTransitionFrom}
                toColor={COLORS.cyan.bgTransitionTo}
                buttonText="Practice Test"
                subText="Timed mode"
                href="/dashboard/mock-test"
            />
            <PracticeMode
                fromColor={COLORS.blue.bgTransitionFrom}
                toColor={COLORS.blue.bgTransitionTo}
                buttonText="All Words"
                subText="Browse the full list"
                href="/dashboard/all-words"
            />
        </main>      
    )
}