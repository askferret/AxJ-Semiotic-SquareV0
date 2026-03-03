'use client'

import { Pencil, Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { SemioticSquareData, PositionId } from '@/app/api/generate-square/route'

interface SlotProps {
  positionId: PositionId
  label: string
  description: string
  isAIGenerated: boolean
  onLabelChange: (val: string) => void
  onDescriptionChange: (val: string) => void
  isEdge: boolean
}

function EditableSlot({
  positionId,
  label,
  description,
  isAIGenerated,
  onLabelChange,
  onDescriptionChange,
  isEdge,
}: SlotProps) {
  const [editingLabel, setEditingLabel] = useState(false)
  const [editingDesc, setEditingDesc] = useState(false)
  const [localLabel, setLocalLabel] = useState(label)
  const [localDesc, setLocalDesc] = useState(description)
  const labelRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setLocalLabel(label)
    setLocalDesc(description)
  }, [label, description])

  useEffect(() => {
    if (editingLabel) labelRef.current?.focus()
  }, [editingLabel])

  useEffect(() => {
    if (editingDesc) descRef.current?.focus()
  }, [editingDesc])

  const commitLabel = () => {
    setEditingLabel(false)
    onLabelChange(localLabel)
  }

  const commitDesc = () => {
    setEditingDesc(false)
    onDescriptionChange(localDesc)
  }

  return (
    <div
      className={cn(
        'group relative flex flex-col gap-2 rounded-md border p-3 transition-shadow hover:shadow-sm',
        isEdge ? 'bg-muted/50 border-border' : 'bg-primary/8 dark:bg-primary/12 border-primary/30'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="shrink-0 rounded bg-foreground/10 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-foreground/60">
            {positionId}
          </span>
          {editingLabel ? (
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <input
                ref={labelRef}
                value={localLabel}
                onChange={(e) => setLocalLabel(e.target.value)}
                onBlur={commitLabel}
                onKeyDown={(e) => e.key === 'Enter' && commitLabel()}
                className="flex-1 min-w-0 rounded border border-primary/40 bg-background px-1.5 py-0.5 text-sm font-semibold text-foreground outline-none ring-1 ring-primary/30"
                aria-label={`Edit label for position ${positionId}`}
                maxLength={60}
              />
              <button type="button" onClick={commitLabel} className="shrink-0 text-primary hover:text-primary/80" aria-label="Confirm label">
                <Check className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setEditingLabel(true)}
              className="group/label flex items-center gap-1 min-w-0 text-left"
              aria-label={`Edit label: ${localLabel}`}
            >
              <span className="truncate text-sm font-semibold text-foreground">{localLabel}</span>
              <Pencil className="h-2.5 w-2.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/label:opacity-100" aria-hidden="true" />
            </button>
          )}
        </div>
        {isAIGenerated && (
          <span className="shrink-0 flex items-center gap-0.5 rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium text-primary uppercase tracking-wide" title="AI-generated">
            <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
            <span className="hidden sm:inline">AI</span>
          </span>
        )}
      </div>
      {editingDesc ? (
        <div className="flex flex-col gap-1">
          <textarea
            ref={descRef}
            value={localDesc}
            onChange={(e) => setLocalDesc(e.target.value)}
            onBlur={commitDesc}
            rows={2}
            className="w-full rounded border border-primary/40 bg-background px-2 py-1.5 text-xs text-foreground outline-none ring-1 ring-primary/30 resize-none leading-relaxed"
            aria-label={`Edit description for position ${positionId}`}
            maxLength={400}
          />
          <button type="button" onClick={commitDesc} className="self-end flex items-center gap-1 text-[10px] text-primary hover:text-primary/80" aria-label="Confirm description">
            <Check className="h-3 w-3" />
            Done
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => setEditingDesc(true)} className="group/desc text-left" aria-label={`Edit description for position ${positionId}`}>
          <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2 group-hover/desc:text-foreground transition-colors">
            {localDesc}
          </p>
        </button>
      )}
    </div>
  )
}

interface SemioticSquareDiagramProps {
  data: SemioticSquareData
  isAIGenerated: boolean
  onDataChange: (data: SemioticSquareData) => void
}

export function SemioticSquareDiagram({ data, isAIGenerated, onDataChange }: SemioticSquareDiagramProps) {
  const [showHowItWorks, setShowHowItWorks] = useState(false)

  const updatePosition = (positionId: PositionId, field: 'label' | 'description', value: string) => {
    onDataChange({
      ...data,
      positions: {
        ...data.positions,
        [positionId]: {
          ...data.positions[positionId],
          [field]: value,
        },
      },
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <div className="h-px flex-1 bg-border" aria-hidden="true" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Axis</span>
          <span className="text-sm font-semibold text-foreground text-balance text-center">{data.axis}</span>
        </div>
        <div className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>

      <div className="relative" role="region" aria-label="Source map diagram (8 slots)">
        <div className="grid grid-cols-3 gap-2" style={{ gridTemplateRows: 'auto 1fr auto' }}>
          {/* Row 0: 1, 1-2, 2 */}
          <EditableSlot
            positionId="1"
            label={data.positions['1'].label}
            description={data.positions['1'].description}
            isAIGenerated={isAIGenerated}
            onLabelChange={(v) => updatePosition('1', 'label', v)}
            onDescriptionChange={(v) => updatePosition('1', 'description', v)}
            isEdge={false}
          />
          <EditableSlot
            positionId="1-2"
            label={data.positions['1-2'].label}
            description={data.positions['1-2'].description}
            isAIGenerated={isAIGenerated}
            onLabelChange={(v) => updatePosition('1-2', 'label', v)}
            onDescriptionChange={(v) => updatePosition('1-2', 'description', v)}
            isEdge={true}
          />
          <EditableSlot
            positionId="2"
            label={data.positions['2'].label}
            description={data.positions['2'].description}
            isAIGenerated={isAIGenerated}
            onLabelChange={(v) => updatePosition('2', 'label', v)}
            onDescriptionChange={(v) => updatePosition('2', 'description', v)}
            isEdge={false}
          />
          {/* Row 1: 1-4, axis, 2-3 */}
          <EditableSlot
            positionId="1-4"
            label={data.positions['1-4'].label}
            description={data.positions['1-4'].description}
            isAIGenerated={isAIGenerated}
            onLabelChange={(v) => updatePosition('1-4', 'label', v)}
            onDescriptionChange={(v) => updatePosition('1-4', 'description', v)}
            isEdge={true}
          />
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border bg-muted/30 p-2 min-h-[60px]">
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Axis</span>
            <span className="text-xs font-semibold text-foreground text-center line-clamp-2">{data.axis}</span>
          </div>
          <EditableSlot
            positionId="2-3"
            label={data.positions['2-3'].label}
            description={data.positions['2-3'].description}
            isAIGenerated={isAIGenerated}
            onLabelChange={(v) => updatePosition('2-3', 'label', v)}
            onDescriptionChange={(v) => updatePosition('2-3', 'description', v)}
            isEdge={true}
          />
          {/* Row 2: 4, 3-4, 3 */}
          <EditableSlot
            positionId="4"
            label={data.positions['4'].label}
            description={data.positions['4'].description}
            isAIGenerated={isAIGenerated}
            onLabelChange={(v) => updatePosition('4', 'label', v)}
            onDescriptionChange={(v) => updatePosition('4', 'description', v)}
            isEdge={false}
          />
          <EditableSlot
            positionId="3-4"
            label={data.positions['3-4'].label}
            description={data.positions['3-4'].description}
            isAIGenerated={isAIGenerated}
            onLabelChange={(v) => updatePosition('3-4', 'label', v)}
            onDescriptionChange={(v) => updatePosition('3-4', 'description', v)}
            isEdge={true}
          />
          <EditableSlot
            positionId="3"
            label={data.positions['3'].label}
            description={data.positions['3'].description}
            isAIGenerated={isAIGenerated}
            onLabelChange={(v) => updatePosition('3', 'label', v)}
            onDescriptionChange={(v) => updatePosition('3', 'description', v)}
            isEdge={false}
          />
        </div>
      </div>

      <div className="rounded-md border border-border bg-muted/40">
        <button
          type="button"
          onClick={() => setShowHowItWorks((v) => !v)}
          className="flex w-full items-center justify-between px-3 py-2.5 text-left hover:bg-muted/60 transition-colors rounded-md"
          aria-expanded={showHowItWorks}
          aria-controls="how-it-works-panel"
        >
          <h3 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Understanding the structure</h3>
          {showHowItWorks ? <ChevronUp className="h-4 w-4 text-muted-foreground" aria-hidden="true" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
        </button>
        {showHowItWorks && (
          <div id="how-it-works-panel" className="border-t border-border px-3 py-2.5">
            <dl className="grid gap-1.5 sm:grid-cols-2">
              <div className="flex gap-2">
                <dt className="shrink-0 flex items-center">
                  <span className="inline-block w-6 text-[9px] font-bold uppercase text-primary">Opp</span>
                </dt>
                <dd className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">Opposition (1/2):</span> {data.relationships.contrariety}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0 flex items-center">
                  <span className="inline-block w-6 text-[9px] font-bold uppercase text-foreground/50">Crd</span>
                </dt>
                <dd className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">Contradiction (1/3):</span> {data.relationships.contradiction_A_notA}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0 flex items-center">
                  <span className="inline-block w-6 text-[9px] font-bold uppercase text-foreground/50">Crd</span>
                </dt>
                <dd className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">Contradiction (2/4):</span> {data.relationships.contradiction_B_notB}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0 flex items-center">
                  <span className="inline-block w-6 text-[9px] font-bold uppercase text-primary/60">Imp</span>
                </dt>
                <dd className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">Implication:</span> {data.relationships.implication_A}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  )
}
