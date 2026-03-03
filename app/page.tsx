'use client'

import { useState, useCallback, useEffect } from 'react'
import { NavBar } from '@/components/nav-bar'
import { InputPanel } from '@/components/input-panel'
import { ResultsPanel } from '@/components/results-panel'
import { Separator } from '@/components/ui/separator'
import type { SemioticSquareData, AIModelId } from '@/app/api/generate-square/route'
import { BookOpen, GitMerge, ArrowLeftRight, Zap } from 'lucide-react'

export type AnalyzeMode = 'quick' | 'guided'
export type GuidedStep = 1 | 2 | 3 | 4

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState<SemioticSquareData | null>(null)
  const [isAIGenerated, setIsAIGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSampleLoading, setIsSampleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPitch, setCurrentPitch] = useState('')
  const [model, setModel] = useState<AIModelId>('anthropic')
  const [mode, setMode] = useState<AnalyzeMode>('quick')
  const [guidedStep, setGuidedStep] = useState<GuidedStep>(1)

  // Theme management
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      document.documentElement.classList.toggle('dark', next === 'dark')
      return next
    })
  }, [])

  // Generate from AI
  const handleGenerate = useCallback(async () => {
    if (!inputText.trim() || inputText.length < 20) return
    setIsGenerating(true)
    setError(null)

    try {
      const res = await fetch('/api/generate-square', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, model }),
      })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error ?? 'Unknown error')
      }
      const data: SemioticSquareData = await res.json()
      setResult(data)
      setCurrentPitch(inputText)
      setIsAIGenerated(true)
      if (mode === 'guided') {
        setGuidedStep(2)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }, [inputText, model, mode])

  // Load sample / demo mode
  const handleSampleMode = useCallback(async () => {
    setIsSampleLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/demo-square', { method: 'POST' })
      if (!res.ok) throw new Error('Failed to load sample')
      const data: { label: string; pitch: string; square: SemioticSquareData } = await res.json()
      setInputText(data.pitch)
      setResult(data.square)
      setCurrentPitch(data.pitch)
      setIsAIGenerated(false)
      if (mode === 'guided') {
        setGuidedStep(2)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sample.')
    } finally {
      setIsSampleLoading(false)
    }
  }, [mode])

  const handleModeChange = useCallback((next: AnalyzeMode) => {
    setMode(next)
    if (next === 'guided') {
      setGuidedStep(1)
      if (result) setGuidedStep(2)
    }
  }, [result])

  const handleGuidedNext = useCallback(() => {
    setGuidedStep((s) => (s < 4 ? ((s + 1) as GuidedStep) : s))
  }, [])

  const handleGuidedBack = useCallback(() => {
    setGuidedStep((s) => (s > 2 ? ((s - 1) as GuidedStep) : s))
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <NavBar
        theme={theme}
        onThemeToggle={toggleTheme}
        onSampleMode={handleSampleMode}
        isSampleLoading={isSampleLoading}
      />

      <main className="mx-auto max-w-3xl px-4 pt-24 pb-20 sm:px-6">
        {/* Page header */}
        <header className="mb-8 flex flex-col gap-2">
          <h1 className="sr-only">Semiotic Square — Source Mapping</h1>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-xl">
            Understand complexity beyond binaries. Paste a story pitch, research notes, or field observations.
            The tool maps the tensions within your topic—showing opposing positions,{' '}
            <span className="font-medium text-foreground">hidden contradictions, and voices caught in between</span>.
            Useful for journalists, ethnographers, researchers, students, and anyone mapping context.
          </p>
        </header>

        {/* Mode toggle */}
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            onClick={() => handleModeChange('quick')}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === 'quick'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-transparent text-muted-foreground hover:text-foreground'
            }`}
            aria-pressed={mode === 'quick'}
          >
            Quick analyze
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('guided')}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === 'guided'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-transparent text-muted-foreground hover:text-foreground'
            }`}
            aria-pressed={mode === 'guided'}
          >
            Guided worksheet
          </button>
        </div>

        {/* Input section */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm mb-6">
          <InputPanel
            value={inputText}
            onChange={setInputText}
            model={model}
            onModelChange={setModel}
            onGenerate={handleGenerate}
            onSampleMode={handleSampleMode}
            isGenerating={isGenerating}
            isSampleLoading={isSampleLoading}
            error={error}
          />
        </div>

        {/* Results section */}
        {result && (
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm mb-8">
            <ResultsPanel
              data={result}
              isAIGenerated={isAIGenerated}
              pitch={currentPitch}
              onDataChange={setResult}
              mode={mode}
              guidedStep={mode === 'guided' ? guidedStep : 4}
              onGuidedNext={handleGuidedNext}
              onGuidedBack={handleGuidedBack}
            />
          </div>
        )}

        {/* Empty state when no result */}
        {!result && !isGenerating && (
          <div className="rounded-lg border border-dashed border-border p-8 flex flex-col items-center gap-3 text-center mb-8">
            <div className="grid grid-cols-2 gap-2 opacity-30" aria-hidden="true">
              <div className="h-12 w-20 rounded bg-primary/20" />
              <div className="h-12 w-20 rounded bg-muted" />
              <div className="h-12 w-20 rounded bg-muted" />
              <div className="h-12 w-20 rounded bg-primary/20" />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Paste your topic, story idea, or research notes above. We'll map the tensions and show you
              positions you might have missed.
            </p>
            <p className="text-xs text-muted-foreground">
              <button
                onClick={handleSampleMode}
                className="underline underline-offset-2 hover:text-foreground transition-colors font-medium"
                disabled={isSampleLoading}
              >
                Try a sample
              </button>{' '}
              first to see how it works.
            </p>
          </div>
        )}

        {/* Loading state */}
        {isGenerating && (
          <div
            className="rounded-lg border border-border bg-card p-8 flex flex-col items-center gap-3 text-center mb-8"
            aria-live="polite"
            aria-label="Generating semiotic square"
          >
            <div className="grid grid-cols-2 gap-2" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-12 w-20 rounded bg-muted animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
            <p className="text-sm font-medium text-foreground">Mapping tensions...</p>
            <p className="text-xs text-muted-foreground">
              Finding oppositions, contradictions, and voices in between.
            </p>
          </div>
        )}

        <Separator className="mb-8" />

        {/* Help / About section */}
        <section id="help" aria-labelledby="help-heading" className="flex flex-col gap-6">
          <div>
            <h2
              id="help-heading"
              className="mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground"
            >
              How it works
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">
              This tool identifies the key tensions in your topic, then uncovers positions you might miss.
              Most topics are more complex than "two sides." This method forces you beyond binary thinking
              into the messy, real positions people actually hold.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                Icon: ArrowLeftRight,
                title: 'Opposition',
                description:
                  'The two main tensions in your topic—the positions that seem to matter most.',
              },
              {
                Icon: GitMerge,
                title: 'Contradiction',
                description:
                  'What contradicts each position—the overlooked positions that don\'t simply oppose.',
              },
              {
                Icon: Zap,
                title: 'In-between',
                description:
                  'Specific people or groups who hold mixed or nuanced positions—the ones journalists often miss.',
              },
              {
                Icon: BookOpen,
                title: 'Why it matters',
                description:
                  'For journalists, researchers, and anyone mapping context. Moves beyond \"both sides.\"',
              },
            ].map(({ Icon, title, description }) => (
              <div key={title} className="flex gap-3 rounded-md border border-border p-3">
                <div className="shrink-0 flex h-7 w-7 items-center justify-center rounded bg-primary/10">
                  <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xs font-semibold text-foreground">{title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-4 px-6 text-center">
        <p className="text-xs text-muted-foreground">
        </p>
      </footer>
    </div>
  )
}
