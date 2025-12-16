'use client'

import { PracticeModeBox, NavBar } from '../components'

export default function Home() {
    return (
      <div className="space-y-6 min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500">
        <NavBar />
        <div className="px-6 py-8">
          <PracticeModeBox />
        </div>
        
      </div>
    )
}