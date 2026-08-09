import { COLORS, ColorScheme } from './colors'

const ROUTE_COLOR_KEY: Record<string, keyof typeof COLORS> = {
  '/dashboard/spelling': 'sky',
  '/dashboard/vocab': 'sky',
  '/dashboard/word-lists': 'sky',
  '/dashboard/mock-test': 'sky',
}

export function getRouteColors(pathname: string): ColorScheme | null {
  const key = ROUTE_COLOR_KEY[pathname]
  return key ? COLORS[key] : null
}
