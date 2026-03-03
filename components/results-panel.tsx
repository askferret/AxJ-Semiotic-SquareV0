'use client'

import { useState } from 'react'
import { Download, Copy, Check, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SemioticSquareDiagram } from '@/components/semiotic-square-diagram'
import type { SemioticSquareData, PositionId } from '@/app/api/generate-square/route'
import type { GuidedStep } from '@/app/page'
import { cn } from '@/lib/utils'

interface ResultsPanelProps {
  data: SemioticSquareData
  isAIGenerated: boolean
  pitch: string
  onDataChange: (data: SemioticSquareData) => void
  mode?: 'quick' | 'guided'
  guidedStep?: GuidedStep
  onGuidedNext?: () => void
  onGuidedBack?: () => void
}

const POSITION_ORDER: PositionId[] = ['1', '2', '3', '4', '1-2', '2-3', '3-4', '1-4']

function buildPromptsText(data: SemioticSquareData, pitch: string): string {
  const lines: string[] = [
    `SOURCE MAPPING: ${data.title}`,
    `Axis: ${data.axis}`,
    '',
    `Source Text:`,
    pitch,
    '',
    '--- WHO TO LOOK FOR ---',
    '',
    ...POSITION_ORDER.flatMap((id) => {
      const p = data.positions[id]
      const prompts = p.sourcePrompts?.length ? p.sourcePrompts : p.examples
      return [
        `${id} — ${p.label}`,
        p.description,
        `Source prompts: ${prompts.join('; ')}`,
        '',
      ]
    }),
    '--- RELATIONSHIPS ---',
    '',
    `Opposition: ${data.relationships.contrariety}`,
    `Contradiction 1/3: ${data.relationships.contradiction_A_notA}`,
    `Contradiction 2/4: ${data.relationships.contradiction_B_notB}`,
    `Implication A: ${data.relationships.implication_A}`,
    `Implication B: ${data.relationships.implication_B}`,
  ]
  return lines.join('\n')
}

async function exportPDF(data: SemioticSquareData, pitch: string) {
  const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib')

  const doc = await PDFDocument.create()
  const page = doc.addPage([595, 842]) // A4
  const font = await doc.embedFont(StandardFonts.Helvetica)
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold)
  const { height } = page.getSize()

  let y = height - 50
  const left = 50
  const lineHeight = 14
  const maxWidth = 495

  const drawText = (
    text: string,
    opts: { bold?: boolean; size?: number; color?: [number, number, number]; indent?: number }
  ) => {
    const { bold = false, size = 10, color = [0.15, 0.15, 0.2], indent = 0 } = opts
    const words = text.split(' ')
    let line = ''
    for (const word of words) {
      const test = line ? `${line} ${word}` : word
      const w = (bold ? fontBold : font).widthOfTextAtSize(test, size)
      if (w > maxWidth - indent && line) {
        page.drawText(line, {
          x: left + indent,
          y,
          size,
          font: bold ? fontBold : font,
          color: rgb(...(color as [number, number, number])),
        })
        y -= lineHeight
        line = word
      } else {
        line = test
      }
    }
    if (line) {
      page.drawText(line, {
        x: left + indent,
        y,
        size,
        font: bold ? fontBold : font,
        color: rgb(...(color as [number, number, number])),
      })
      y -= lineHeight
    }
  }

  const spacer = (n = 1) => { y -= lineHeight * n }

  // Worksheet header
  drawText('Semiotic Square — Source Mapping (Worksheet)', { bold: true, size: 14, color: [0.2, 0.4, 0.8] })
  spacer(0.5)
  drawText(data.title, { bold: true, size: 12 })
  drawText(`Axis: ${data.axis}`, { size: 9, color: [0.45, 0.45, 0.55] })
  spacer()

  // Step 1: Story topic / source
  drawText('Step 1 — Story topic / source text', { bold: true, size: 10, color: [0.2, 0.4, 0.8] })
  spacer(0.3)
  drawText(pitch.slice(0, 350) + (pitch.length > 350 ? '...' : ''), { size: 8, color: [0.4, 0.4, 0.5] })
  spacer()

  // Step 2: Oppositions (1, 2)
  drawText('Step 2 — Find tensions. Oppositions (top corners):', { bold: true, size: 10, color: [0.2, 0.4, 0.8] })
  spacer(0.3)
  drawText(`1. ${data.positions['1'].label}`, { size: 9 })
  drawText(data.positions['1'].description, { size: 8, color: [0.4, 0.4, 0.5], indent: 8 })
  spacer(0.2)
  drawText(`2. ${data.positions['2'].label}`, { size: 9 })
  drawText(data.positions['2'].description, { size: 8, color: [0.4, 0.4, 0.5], indent: 8 })
  spacer()

  // Step 3: Contradictions (3, 4)
  drawText('Step 3 — Find contradictions (bottom corners):', { bold: true, size: 10, color: [0.2, 0.4, 0.8] })
  spacer(0.3)
  drawText(`3. ${data.positions['3'].label} (contradiction to 1)`, { size: 9 })
  drawText(data.positions['3'].description, { size: 8, color: [0.4, 0.4, 0.5], indent: 8 })
  spacer(0.2)
  drawText(`4. ${data.positions['4'].label} (contradiction to 2)`, { size: 9 })
  drawText(data.positions['4'].description, { size: 8, color: [0.4, 0.4, 0.5], indent: 8 })
  spacer()

  // Step 4 & 5: Who to look for (all 8 slots)
  drawText('Step 4 & 5 — Who to look for (sources per position; fill in the gaps)', { bold: true, size: 10, color: [0.2, 0.4, 0.8] })
  spacer(0.3)

  for (const id of POSITION_ORDER) {
    const p = data.positions[id]
    const prompts = p.sourcePrompts?.length ? p.sourcePrompts : p.examples
    drawText(`${id} — ${p.label}`, { bold: true, size: 9 })
    if (prompts.length) {
      drawText(`Who to look for: ${prompts.join('; ')}`, { size: 8, color: [0.4, 0.4, 0.5], indent: 6 })
    }
    spacer(0.25)
  }

  spacer(0.5)
  drawText('Understanding the structure', { bold: true, size: 10, color: [0.2, 0.4, 0.8] })
  spacer(0.3)
  drawText(`Opposition: ${data.relationships.contrariety}`, { size: 8, color: [0.35, 0.35, 0.45] })
  spacer(0.2)
  drawText(`Contradiction 1/3: ${data.relationships.contradiction_A_notA}`, { size: 8, color: [0.35, 0.35, 0.45] })
  spacer(0.2)
  drawText(`Contradiction 2/4: ${data.relationships.contradiction_B_notB}`, { size: 8, color: [0.35, 0.35, 0.45] })
  spacer(0.2)
  drawText(`Implication: ${data.relationships.implication_A}`, { size: 8, color: [0.35, 0.35, 0.45] })

  const bytes = await doc.save()
  const blob = new Blob([bytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `semiotic-square-${data.title.toLowerCase().replace(/\s+/g, '-').slice(0, 40)}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}

export function ResultsPanel({
  data,
  isAIGenerated,
  pitch,
  onDataChange,
  mode = 'quick',
  guidedStep = 4,
  onGuidedNext,
  onGuidedBack,
}: ResultsPanelProps) {
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)

  const isGuided = mode === 'guided'
  const showFullPanel = !isGuided || guidedStep === 4

  const handleCopyAll = async () => {
    const text = buildPromptsText(data, pitch)
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExportPDF = async () => {
    setExporting(true)
    try {
      await exportPDF(data, pitch)
    } finally {
      setExporting(false)
    }
  }

  return (
    <section aria-labelledby="results-heading" className="flex flex-col gap-5">
      {/* Step indicator (guided mode) */}
      {isGuided && (
        <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2">
          <span className="text-xs font-medium text-muted-foreground">
            Step {guidedStep} of 4
            {guidedStep === 2 && ': Confirm oppositions'}
            {guidedStep === 3 && ': Confirm contradictions'}
            {guidedStep === 4 && ': Full map & source prompts'}
          </span>
        </div>
      )}

      {/* Results header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h2 id="results-heading" className="text-base font-bold text-foreground text-balance">
              {data.title}
            </h2>
            {isAIGenerated && (
              <span className="flex items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary uppercase tracking-wide shrink-0">
                <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                AI
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Axis: <span className="font-medium text-foreground">{data.axis}</span>
          </p>
        </div>

        {showFullPanel && (
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={handleCopyAll} className="gap-1.5 text-xs" aria-label="Save map to clipboard">
              {copied ? <><Check className="h-3.5 w-3.5 text-green-600" aria-hidden="true" /> Saved</> : <><Copy className="h-3.5 w-3.5" aria-hidden="true" /> Save map</>}
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF} disabled={exporting} className="gap-1.5 text-xs" aria-label="Export as PDF">
              <Download className={cn('h-3.5 w-3.5', exporting && 'animate-bounce')} aria-hidden="true" />
              {exporting ? 'Exporting...' : 'Export'}
            </Button>
          </div>
        )}
      </div>

      {/* Guided step 2: oppositions only */}
      {isGuided && guidedStep === 2 && (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {(['1', '2'] as const).map((id) => {
              const p = data.positions[id]
              return (
                <div key={id} className="rounded-md border border-primary/30 bg-primary/8 p-3">
                  <span className="font-mono text-[10px] text-foreground/60">{id}</span>
                  <h3 className="text-sm font-semibold text-foreground">{p.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-muted-foreground">Are these the main oppositions in your story? Edit in the next step or click Next.</p>
          <div className="flex gap-2">
            <Button size="sm" onClick={onGuidedNext} className="gap-1.5">
              Next: Confirm contradictions <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </>
      )}

      {/* Guided step 3: add contradictions */}
      {isGuided && guidedStep === 3 && (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {(['1', '2', '3', '4'] as const).map((id) => {
              const p = data.positions[id]
              return (
                <div key={id} className="rounded-md border border-border bg-muted/30 p-3">
                  <span className="font-mono text-[10px] text-foreground/60">{id}</span>
                  <h3 className="text-sm font-semibold text-foreground">{p.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-muted-foreground">Contradictions (3, 4) complete the corners. Next you’ll see the full map and who to look for.</p>
          <div className="flex gap-2">
            {onGuidedBack && (
              <Button variant="outline" size="sm" onClick={onGuidedBack} className="gap-1.5">
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </Button>
            )}
            <Button size="sm" onClick={onGuidedNext} className="gap-1.5">
              Next: See full map <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </>
      )}

      {/* Full diagram and who to look for (quick mode or guided step 4) */}
      {showFullPanel && (
        <>
          <SemioticSquareDiagram data={data} isAIGenerated={isAIGenerated} onDataChange={onDataChange} />

          <div className="rounded-md border border-border bg-card p-4" id="who-to-look-for">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Who to look for</h3>
            <p className="mb-3 text-xs text-muted-foreground">
              Source types to seek for each position. Use these to find voices beyond binary framing.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {POSITION_ORDER.map((id) => {
                const p = data.positions[id]
                const prompts = p.sourcePrompts?.length ? p.sourcePrompts : p.examples
                return (
                  <div key={id} className="flex flex-col gap-1.5">
                    <h4 className="text-xs font-semibold text-foreground">
                      <span className="font-mono text-[10px] text-muted-foreground mr-1.5">{id}</span>
                      {p.label}
                    </h4>
                    <ul className="flex flex-col gap-1">
                      {prompts.map((prompt, i) => (
                        <li key={i} className="flex gap-1.5 text-xs text-muted-foreground leading-relaxed">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" aria-hidden="true" />
                          {prompt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>

          {isGuided && guidedStep === 4 && onGuidedBack && (
            <Button variant="outline" size="sm" onClick={onGuidedBack} className="self-start gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to contradictions
            </Button>
          )}
        </>
      )}
    </section>
  )
}
