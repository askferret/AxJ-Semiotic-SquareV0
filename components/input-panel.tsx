'use client'

import { Loader2, Sparkles, FlaskConical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { AIModelId } from '@/app/api/generate-square/route'

const MAX_CHARS = 1200

const MODEL_OPTIONS: { value: AIModelId; label: string }[] = [
  { value: 'anthropic', label: 'Claude Sonnet 4.6' },
  { value: 'google', label: 'Gemini Flash 3' },
]

interface InputPanelProps {
  value: string
  onChange: (val: string) => void
  model: AIModelId
  onModelChange: (model: AIModelId) => void
  onGenerate: () => void
  onSampleMode: () => void
  isGenerating: boolean
  isSampleLoading: boolean
  error: string | null
}

export function InputPanel({
  value,
  onChange,
  model,
  onModelChange,
  onGenerate,
  onSampleMode,
  isGenerating,
  isSampleLoading,
  error,
}: InputPanelProps) {
  const charCount = value.length
  const isOverLimit = charCount > MAX_CHARS
  const canGenerate = value.trim().length >= 20 && !isOverLimit && !isGenerating

  return (
    <section aria-labelledby="input-heading">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="story-input" id="input-heading" className="text-sm font-semibold text-foreground">
            Story Pitch / Field Notes
          </Label>
          <span
            className={cn(
              'text-xs tabular-nums transition-colors',
              isOverLimit
                ? 'text-destructive font-semibold'
                : charCount > MAX_CHARS * 0.9
                ? 'text-warning-foreground'
                : 'text-muted-foreground'
            )}
            aria-live="polite"
            aria-label={`${charCount} of ${MAX_CHARS} characters`}
          >
            {charCount}/{MAX_CHARS}
          </span>
        </div>

        <Textarea
          id="story-input"
          placeholder="Paste a story pitch, research notes, or field observations. Describe the topic, tensions, or community you're exploring. We'll map the positions and show you who's in between..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          maxLength={MAX_CHARS + 50}
          className={cn(
            'resize-none text-sm leading-relaxed transition-colors',
            isOverLimit && 'border-destructive focus-visible:ring-destructive/30'
          )}
          aria-describedby={error ? 'input-error' : undefined}
          aria-invalid={isOverLimit || !!error}
          disabled={isGenerating || isSampleLoading}
        />

        {error && (
          <p
            id="input-error"
            role="alert"
            className="text-xs text-destructive font-medium"
          >
            {error}
          </p>
        )}

        {isOverLimit && (
          <p role="alert" className="text-xs text-destructive">
            Text exceeds the {MAX_CHARS}-character limit. Please shorten your input.
          </p>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs hidden sm:block">
              Minimum 20 characters. Powered by AI analysis.
            </p>
            <Select
              value={model}
              onValueChange={(v) => onModelChange(v as AIModelId)}
              disabled={isGenerating || isSampleLoading}
            >
              <SelectTrigger size="sm" className="w-[160px]">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                {MODEL_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 sm:ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onSampleMode}
              disabled={isGenerating || isSampleLoading}
              className="gap-1.5 text-xs"
              aria-label="Load a sample demonstration"
            >
              {isSampleLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              Sample
            </Button>
            <Button
              size="sm"
              onClick={onGenerate}
              disabled={!canGenerate}
              className="gap-1.5 text-xs font-semibold"
              aria-label="Map this topic"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  Mapping...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Map this
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
