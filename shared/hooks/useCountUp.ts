'use client'

import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, duration = 1000): number {
    const [value, setValue] = useState(0)
    const frameRef = useRef<number | undefined>(undefined)

    useEffect(() => {
        const start = performance.now()
        const from = 0

        const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(from + (target - from) * eased))

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(tick)
            }
        }

        frameRef.current = requestAnimationFrame(tick)
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current)
        }
    }, [target, duration])

    return value
}
