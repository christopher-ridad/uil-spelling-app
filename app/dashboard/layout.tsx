'use client'

import { usePathname } from 'next/navigation'
import NavBar from '@/shared/components/NavBar'
import { NEUTRAL_CANVAS } from '@/shared/utils/colors'
import { getRouteColors } from '@/shared/utils/routeColors'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const colors = getRouteColors(pathname)
  const canvasClass = colors
    ? `${colors.bgCanvasFrom} ${colors.bgCanvasTo}`
    : `${NEUTRAL_CANVAS.from} ${NEUTRAL_CANVAS.via} ${NEUTRAL_CANVAS.to}`

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br ${canvasClass}`}>
      <NavBar />
      <main className="flex-1 flex flex-col">
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  )
}
