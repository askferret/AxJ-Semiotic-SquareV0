# EPIC 2026 Prototype/MVP Demo Application

**Date:** 03/02/2026

---

## What the prototype does and what problem it addresses

Journalism often flattens context into binary oppositions—for vs. against, us vs. them—missing “sources in between” and reinforcing polarized framing. Engagement journalism and ethnography value context and diverse voices but lack practical tools for story development.

**Semiotic Square — Source Mapping** (“Find sources in between”) takes a story pitch or field notes (20–1200 characters) and produces an **8-slot source map**: two main oppositions (corners 1 and 2), their contradictions (corners 3 and 4), and four “in-between” positions (edges 1–2, 2–3, 3–4, 1–4). Each slot has a label, description, examples, and **source prompts** (who to look for). The method is adapted from Greimas for the Centre for Anthropology and Journalism (CAJ) worksheet—a journalist-oriented tool, not a strict semiotic square. Built for journalists, ethnographers, and educators.

---

## How it is built

Next.js 16 (App Router), React 19, Tailwind CSS 4, Radix UI / shadcn/ui. AI: Vercel AI SDK with **structured output** (Zod); user-selectable models—Anthropic Claude Sonnet 4.6 and Google Gemini Flash 3 (Vercel AI Gateway). Export: pdf-lib (worksheet PDF); analytics: Vercel Analytics.

Logic is Greimas-inspired: eight positions fixed; the LLM fills content from the input. No database; ephemeral processing; client-side state only. Flow: user text → `POST /api/generate-square` or `POST /api/demo-square` (sample) → validated 8-slot JSON → interactive diagram (editable slots, Copy All, Export PDF). Modes: **Quick analyze** (paste → generate → full map) and **Guided worksheet** (steps 2–4: confirm oppositions, contradictions, then full map and source prompts).

---

## What attendees will experience, interact with, and learn; what we expect to learn

Attendees access the app via QR code or URL on phone or laptop. They can experience a number demo projects around topics such as immigration and climate, or input text for any project they are working on. After clicking generate, they see a filled out 8-slot diagram, expand “Who to look for,” edit labels/descriptions, and use Copy All or Export PDF (if they provide an email). Partcipants can learn how a structural semiotic method becomes a practical AI-assisted tool, how to read opposition vs. contradiction and “sources in between,” and that the tool supports care-based context mapping without replacing editorial judgment. We also provide the option for users to share feedback, ask questions, critique, and collaborate.

We expect to learn whether outputs are legible and actionable for non-semiotics users; how practitioners from other sectors (product, policy, consulting) might adapt it (e.g. stakeholder mapping); and which other ethnographic-journalism methods would benefit from similar tooling.

---

## Technical details and format

**Format:** Web app (mobile and desktop). **Primary:** QR code for any device; **alternative:** one laptop or tablet on a table. No physical objects.

**Requirements:** Conference WiFi (or hotspot). One table; QR code signage; optional laptop for walk-through. No accounts, no stored data, no special hardware. Hosted (e.g. Vercel); LLM API key server-side; no user cost. Interaction: text input, Generate/Try Sample, interactive 8-slot diagram (editable), Copy All, Export PDF; light/dark theme; accessible markup.
