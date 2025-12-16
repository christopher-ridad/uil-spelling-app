'use client'

import { PracticeModeBox, NavBar } from '../components'
import { RecentWordBox, StatsWidgetGrid, WelcomeBox } from '../components'

export default function Home() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500">
        <NavBar />
        <div className="px-6 pt-8">
          <WelcomeBox userName={"Chris"} streak={5}/>
        </div>
        <div className="px-6">
          <StatsWidgetGrid />
        </div>
        <div className="px-6">
          <PracticeModeBox />
        </div>
        <div className="px-6 py-8">
          <RecentWordBox />
        </div>
      </div>
    )
}