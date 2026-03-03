---
name: EPIC 2026 Demo Document
overview: Plan for a single, under-600-word document that answers the EPIC 2026 prototype/MVP application questions, grounded in the current Semiotic Square — Source Mapping app (not the older outline).
todos: []
isProject: false
---

# EPIC 2026 Demo Application Document — Plan

## Goal

One short document (under 600 words) that covers: (1) what the prototype does and what problem it addresses, (2) how it is built, (3) what attendees will experience/learn and what you expect to learn, and (4) technical details including format and requirements. The draft must reflect the **current repo**, not the older [perplexity SS outline.md](perplexity%20SS%20outline.md) (e.g. 8-slot source map, Next.js 16, two modes, 1200-char input, user-selectable AI models).

---

## Document structure and content

### 1. What the prototype does and what problem it addresses (~120–150 words)

- **Problem:** Journalism often flattens context into binary oppositions (for/against, us/them), missing “sources in between” and reinforcing polarization. Engagement journalism and ethnography value context and diverse voices but lack practical tools for story development.
- **What the MVP does:** **Semiotic Square — Source Mapping** (“Find sources in between”) takes a story pitch or field notes (20–1200 characters) and produces an **8-slot source map**: two main oppositions (corners 1–2), their contradictions (corners 3–4), and four “in-between” positions (edges 1–2, 2–3, 3–4, 1–4). Each slot has a label, description, examples, and **source prompts** (“who to look for”). Method is journalist-adapted from Greimas (CAJ worksheet), not a strict semiotic square.
- **Audience:** Journalists, ethnographers, educators; built with the Centre for Anthropology and Journalism (CAJ).

### 2. How it is built (~120–150 words)

- **Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, Radix UI / shadcn/ui. AI: Vercel AI SDK with **structured output** (Zod schemas); models user-selectable: Anthropic Claude Sonnet 4.6 and Google Gemini Flash 3 (via Vercel AI Gateway). Export: pdf-lib (worksheet-style PDF). Analytics: Vercel Analytics.
- **Concepts/methods:** Greimas-inspired opposition/contradiction logic; 8 positions fixed (1, 2, 3, 4, 1-2, 2-3, 3-4, 1-4); LLM fills content from natural language. No database; ephemeral processing; client-side state only.
- **Data pipeline:** User text → `POST /api/generate-square` (or precomputed `POST /api/demo-square`) → LLM returns validated 8-slot JSON → UI renders [SemioticSquareDiagram](components/semiotic-square-diagram.tsx) and [ResultsPanel](components/results-panel.tsx) (editable slots, Copy All, Export PDF).
- **Modes:** **Quick analyze** (paste → Generate → full map) and **Guided worksheet** (step 2: confirm oppositions; step 3: contradictions; step 4: full map and source prompts).

### 3. Attendee experience and learning (~100–120 words)

- **Experience:** Attendees use the web app (QR code or shared URL) on phone or laptop: paste or edit a short pitch, optionally pick AI model, click Generate (or Try Sample for instant Immigration/Climate demo). They see the 8-slot diagram, expand “Who to look for,” edit labels/descriptions, use Copy All or Export PDF.
- **Learn:** How a structural semiotic method is turned into a practical AI-assisted tool; how to read opposition vs. contradiction and “sources in between”; that the tool supports care-based context mapping without replacing editorial judgment.
- **What you expect to learn:** Whether outputs are legible and actionable for non-semiotics users; how practitioners from other sectors (e.g. product, policy) might adapt it; which other ethnographic-journalism methods would benefit from similar tooling.

### 4. Technical details and format (~80–100 words)

- **Format:** Web app (mobile and desktop). **Primary:** QR code for any device; **alternative:** single laptop/tablet at a table. No physical objects.
- **Requirements:** Conference WiFi (or hotspot). One table; QR code signage; optional one laptop for walk-through. No accounts, no stored data, no special hardware. Hosted (e.g. Vercel); LLM API key server-side; no user-facing cost.
- **Interaction:** Text input, Generate / Try Sample, interactive 8-slot diagram, editable fields, Copy All, Export PDF; light/dark theme; accessible markup.

---

## Placement and naming

- **Location:** Project root or a `docs/` folder (e.g. `docs/EPIC-2026-demo-application.md` or `EPIC-2026-demo-application.md` next to [perplexity SS outline.md](perplexity%20SS%20outline.md)).
- **Date:** If you apply the “date in filename” rule, fetch current date via MCP time tool and use something like `EPIC-2026-demo-application-03-02-2026.md` (or the date when the doc is finalized).

---

## Tone and length

- **Tone:** Professional, concise; match EPIC CFP language (context, prototyping, engagement).
- **Length:** Aim for **~520–580 words** total so the submission stays clearly under 600.

---

## Optional follow-up

After you approve this plan, the next step can be: **generate the actual document text** (ready to paste into the application or save as the chosen file). I will not create or edit any files until plan mode is exited and you confirm.
