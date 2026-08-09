export interface ColorScheme {
  bg: string
  bgDark: string
  bgLight: string
  bgHover: string
  bgFocus: string
  bgText: string
  bgBorder: string
  bgBorder2: string
  bgCanvasFrom: string
  bgCanvasTo: string
  bgTransitionFrom: string
  bgTransitionTo: string
}

export const NEUTRAL_CANVAS = {
  from: 'from-blue-200',
  via: 'via-sky-300',
  to: 'to-indigo-300'
}

export const COLORS: Record<'blue' | 'indigo' | 'sky' | 'cyan', ColorScheme> = {
  blue: {
    bg: 'bg-blue-600',
    bgDark: 'bg-blue-700',
    bgLight: 'bg-blue-50',
    bgHover: 'hover:bg-blue-700',
    bgFocus: 'focus:border-blue-600',
    bgText: 'text-blue-700',
    bgBorder: 'border-blue-200',
    bgBorder2: 'border-blue-500',
    bgCanvasFrom: 'from-blue-100',
    bgCanvasTo: 'to-blue-200',
    bgTransitionFrom: 'from-blue-500',
    bgTransitionTo: 'to-blue-600'
  },
  indigo: {
    bg: 'bg-indigo-600',
    bgDark: 'bg-indigo-700',
    bgLight: 'bg-indigo-50',
    bgHover: 'hover:bg-indigo-700',
    bgFocus: 'focus:border-indigo-600',
    bgText: 'text-indigo-700',
    bgBorder: 'border-indigo-200',
    bgBorder2: 'border-indigo-500',
    bgCanvasFrom: 'from-indigo-100',
    bgCanvasTo: 'to-indigo-200',
    bgTransitionFrom: 'from-indigo-500',
    bgTransitionTo: 'to-indigo-600'
  },
  sky: {
    bg: 'bg-sky-600',
    bgDark: 'bg-sky-700',
    bgLight: 'bg-sky-50',
    bgHover: 'hover:bg-sky-700',
    bgFocus: 'focus:border-sky-600',
    bgText: 'text-sky-700',
    bgBorder: 'border-sky-200',
    bgBorder2: 'border-sky-500',
    bgCanvasFrom: 'from-sky-100',
    bgCanvasTo: 'to-sky-200',
    bgTransitionFrom: 'from-sky-500',
    bgTransitionTo: 'to-sky-600'
  },
  cyan: {
    bg: 'bg-cyan-600',
    bgDark: 'bg-cyan-700',
    bgLight: 'bg-cyan-50',
    bgHover: 'hover:bg-cyan-700',
    bgFocus: 'focus:border-cyan-600',
    bgText: 'text-cyan-700',
    bgBorder: 'border-cyan-200',
    bgBorder2: 'border-cyan-500',
    bgCanvasFrom: 'from-cyan-100',
    bgCanvasTo: 'to-cyan-200',
    bgTransitionFrom: 'from-cyan-500',
    bgTransitionTo: 'to-cyan-600'
  }
}
