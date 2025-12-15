'use client'

import { PracticeModeBox, NavBar } from '../components'
import { useState } from 'react'

export default function Home() {
    const [userInput, setUserInput] = useState('');
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
    return (
      <div className="space-y-6 min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500">
        <NavBar />
        <div className="px-6 py-8">
          <PracticeModeBox />
        </div>
        
      </div>
    )
}