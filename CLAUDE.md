# Semiotic Square — Source Mapping (CAJ Context Modeling Tool)

**Last updated:** 03/02/2026

## Overview

AI-enabled prototype for the **Centre for Anthropology and Journalism**. Transforms story pitches or field notes into an **8-slot source map** — mapping oppositions, contradictions, and “sources in between” so journalists can find voices beyond binary framing. Product name: **Semiotic Square — Source Mapping** (tagline: “Find sources in between”). Journalist-adapted method, not a strict Greimas square.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Radix UI primitives, shadcn/ui components
- **AI:** Vercel AI SDK (`ai` package) with structured output (Zod schemas)
- **Models:** Anthropic Claude Sonnet 4.6 (`@ai-sdk/anthropic`) and Google Gemini Flash 3 (`@ai-sdk/google`) — user-selectable
- **Export:** pdf-lib for worksheet-style PDF
- **Analytics:** @vercel/analytics

## Architecture

### App Structure

```
app/
├── layout.tsx
├── page.tsx            # Mode toggle (Quick / Guided), input, results, help
└── api/
    ├── generate-square/route.ts   # POST: returns 8-slot SourceMapData
    └── demo-square/route.ts       # GET/POST: precomputed 8-slot examples
```

### Key Components

| Component | Path | Purpose |
|-----------|------|---------|
| `NavBar` | `components/nav-bar.tsx` | Logo “Semiotic Square — Source Mapping”, Sample Mode, Help, theme toggle |
| `InputPanel` | `components/input-panel.tsx` | Textarea (1200 char), model selector, Generate, Try Sample |
| `ResultsPanel` | `components/results-panel.tsx` | Title, axis, 8-slot “Who to look for”, optional guided steps (2/3/4), Copy All, Export PDF |
| `SemioticSquareDiagram` | `components/semiotic-square-diagram.tsx` | 3×3 grid: corners 1,2,3,4 + edges 1-2, 2-3, 3-4, 1-4; collapsible “Understanding the structure” |

### Data Model (8-slot)

`SemioticSquareData` (= `SourceMapData`) from `app/api/generate-square/route.ts`:

```ts
{
  title: string
  axis: string
  positions: {
    '1': { label, description, examples[], sourcePrompts[] }   // opposition 1
    '2': { ... }   // opposition 2
    '3': { ... }   // contradiction to 1
    '4': { ... }   // contradiction to 2
    '1-2': { ... } // source between 1 and 2
    '2-3': { ... }
    '3-4': { ... }
    '1-4': { ... }
  }
  relationships: {
    contrariety, contradiction_A_notA, contradiction_B_notB, implication_A, implication_B
  }
}
```

- **Corners 1, 2:** Main oppositions (top). **3, 4:** Contradictions (bottom).
- **Edges 1-2, 2-3, 3-4, 1-4:** “Sources in between” (CAJ worksheet).

## Modes

- **Quick analyze:** Paste text → Generate → full 8-slot map and “Who to look for”.
- **Guided worksheet:** Step 2 = confirm oppositions (1, 2); Step 3 = confirm contradictions (3, 4); Step 4 = full map and source prompts. Toggle on page below header.

## API Routes

### `POST /api/generate-square`

- **Body:** `{ text: string, model?: 'anthropic' | 'google' }` (20–1200 chars)
- **Returns:** `SourceMapData` (8 positions + relationships)
- **Timeout:** `maxDuration = 30`

### `GET/POST /api/demo-square`

- Returns precomputed 8-slot example (Immigration or Climate Journalism).

## Key Behaviors

1. **Input:** Min 20 chars, max 1200; character counter.
2. **Sample mode:** Loads precomputed 8-slot data (no AI call).
3. **Editable slots:** All 8 positions editable in diagram (label, description).
4. **Export:** Copy All (text), Export PDF (worksheet-style: steps 1–5, 8 slots, who to look for).
5. **Guided mode:** Step indicator and Next/Back for oppositions → contradictions → full map.
6. **Theme:** Light/dark; accessibility (ARIA, semantic structure).

## Environment

- **`AI_GATEWAY_API_KEY`** — Vercel AI Gateway API key; routes requests to Anthropic (Claude) and Google (Gemini) models. Set in `.env.local` or Vercel env. See `.env.example`.
- No database; client-side state only.

## Conventions

- Imports at top of file (no inline imports)
- Exhaustive switch for TypeScript unions/enums
- Use `cn()` from `lib/utils`
- Types `SemioticSquareData`, `SourceMapData`, `PositionId` from `app/api/generate-square/route`
