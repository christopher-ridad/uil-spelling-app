'use client'

import { PracticeModeBox } from '../components'
import { useState } from 'react'

export default function Home() {
    const [userInput, setUserInput] = useState('');
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500">
        <PracticeModeBox />
      </div>
    )
}