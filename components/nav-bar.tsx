'use client'

import { Moon, Sun, FlaskConical, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface NavBarProps {
  theme: 'light' | 'dark'
  onThemeToggle: () => void
  onSampleMode: () => void
  isSampleLoading: boolean
}

export function NavBar({ theme, onThemeToggle, onSampleMode, isSampleLoading }: NavBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b border-border bg-background/95 px-4 backdrop-blur-sm sm:px-6">
      {/* Logo + tool name */}
      <div className="flex items-center gap-2.5 mr-auto">
        <div
          className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground"
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.9" />
            <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.5" />
            <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.5" />
            <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.9" />
            <line x1="8" y1="4" x2="8" y2="12" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
            <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
          </svg>
        </div>
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Semiotic Square <span className="text-primary font-bold">— Source Mapping</span>
        </span>
        <span className="hidden sm:inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary uppercase tracking-wide">
          Find sources in between
        </span>
      </div>

      {/* Nav actions */}
      <nav className="flex items-center gap-1" aria-label="Main navigation">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSampleMode}
                disabled={isSampleLoading}
                className="h-8 gap-1.5 px-3 text-xs font-medium text-muted-foreground hover:text-foreground"
                aria-label="Load sample mode demonstration"
              >
                <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Sample Mode</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Load a precomputed demo example</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-8 gap-1.5 px-3 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <a
                  href="#help"
                  aria-label="Help and documentation"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('help')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Help</span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>About source mapping and the method</p>
            </TooltipContent>
          </Tooltip>

          <div className="mx-1 h-5 w-px bg-border" aria-hidden="true" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onThemeToggle}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </header>
  )
}
