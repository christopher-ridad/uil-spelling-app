'use client'

import { usePathname } from 'next/navigation'
import NavBar from '@/shared/components/NavBar'
import { NEUTRAL_CANVAS } from '@/shared/utils/colors'
import { getRouteColors } from '@/shared/utils/routeColors'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const colors = getRouteColors(pathname)
  const from = colors?.bgCanvasFrom ?? NEUTRAL_CANVAS.from
  const to = colors?.bgCanvasTo ?? NEUTRAL_CANVAS.to

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br ${from} ${to}`}>
      <NavBar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  )
}
