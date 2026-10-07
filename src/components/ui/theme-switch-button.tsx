'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/theme'

interface ThemeSwitchProps {
  className?: string
  withLabel?: boolean
}

export function ThemeSwitch({ className = '', withLabel = false }: ThemeSwitchProps) {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'
  const label = `Switch to ${isLight ? 'dark' : 'light'} mode`

  return (
    <button
      type="button"
      onClick={(event) => toggle(event.currentTarget)}
      aria-label={label}
      aria-pressed={isLight}
      title={label}
      className={`${
        withLabel
          ? 'group flex h-[42px] flex-1 items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 text-[13px] font-medium text-slate-300 transition hover:border-emerald-400/35 hover:text-emerald-300'
          : 'relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-slate-200 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400'
      } ${className}`}
    >
      <span className={`relative flex h-5 w-5 items-center justify-center ${withLabel ? 'h-6 w-6' : ''}`}>
        <Sun
          aria-hidden="true"
          data-theme-icon=""
          className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isLight ? 'scale-100 translate-y-0 opacity-100' : 'scale-50 translate-y-5 opacity-0'
          }`}
        />
        <Moon
          aria-hidden="true"
          data-theme-icon=""
          className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            !isLight ? 'scale-100 translate-y-0 opacity-100' : 'scale-50 translate-y-5 opacity-0'
          }`}
        />
      </span>
      {withLabel && <span>{isLight ? 'Light mode' : 'Dark mode'}</span>}
    </button>
  )
}
