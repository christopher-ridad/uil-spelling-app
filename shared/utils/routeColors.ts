import { COLORS, ColorScheme } from './colors'

const ROUTE_COLOR_KEY: Record<string, keyof typeof COLORS> = {
  '/dashboard/spelling': 'blue',
  '/dashboard/vocab': 'red',
  '/dashboard/word-lists': 'green',
  '/dashboard/mock-test': 'yellow',
}

export function getRouteColors(pathname: string): ColorScheme | null {
  const key = ROUTE_COLOR_KEY[pathname]
  return key ? COLORS[key] : null
}
