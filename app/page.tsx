'use client'

import { COLORS } from '../lib/colors'
import { FeatureButtonGrid, CardHeader, AudioButton, SubmitAnswerButton, SpellingInput } from '../components'
import { WordCardFront } from '../components'
import { useState } from 'react'

export default function Home() {
    const [userInput, setUserInput] = useState('');
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
    return (
        <main>
            <WordCardFront
                color={COLORS.blue.bg}
                colorDark={COLORS.blue.bgDark}
                colorHover={COLORS.blue.bgHover}
                colorFocus={COLORS.blue.bgFocus}
                headerText="UIL Spelling Practice"
                score_correct={12}
                score_total={15}
            />
            <WordCardFront
                color={COLORS.red.bg}
                colorDark={COLORS.red.bgDark}
                colorHover={COLORS.red.bgHover}
                colorFocus={COLORS.red.bgFocus}
                headerText="UIL Spelling Practice"
                score_correct={12}
                score_total={15}
            />
            <WordCardFront
                color={COLORS.green.bg}
                colorDark={COLORS.green.bgDark}
                colorHover={COLORS.green.bgHover}
                colorFocus={COLORS.green.bgFocus}
                headerText="UIL Spelling Practice"
                score_correct={12}
                score_total={15}
            />
            <WordCardFront
                color={COLORS.yellow.bg}
                colorDark={COLORS.yellow.bgDark}
                colorHover={COLORS.yellow.bgHover}
                colorFocus={COLORS.yellow.bgFocus}
                headerText="UIL Spelling Practice"
                score_correct={12}
                score_total={15}
            />
            <WordCardFront
                color={COLORS.pink.bg}
                colorDark={COLORS.pink.bgDark}
                colorHover={COLORS.pink.bgHover}
                colorFocus={COLORS.pink.bgFocus}
                headerText="UIL Spelling Practice"
                score_correct={12}
                score_total={15}
            />
            <WordCardFront
                color={COLORS.orange.bg}
                colorDark={COLORS.orange.bgDark}
                colorHover={COLORS.orange.bgHover}
                colorFocus={COLORS.orange.bgFocus}
                headerText="UIL Spelling Practice"
                score_correct={12}
                score_total={15}
            />
            <FeatureButtonGrid />
        </main>
    )
}