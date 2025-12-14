'use client'

import { COLORS } from '../lib/colors'
import { FeatureButtonGrid, WordCardFront } from '../components'
import { useState } from 'react'

export default function Home() {
    const [userInput, setUserInput] = useState('');
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
    return (
        <FeatureButtonGrid />
    )
}