import { generateText, Output, createGateway } from 'ai'
import { z } from 'zod'

export const maxDuration = 30

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
})

const MODELS = {
  anthropic: gateway('anthropic/claude-sonnet-4.6'),
  google: gateway('google/gemini-3-flash'),
} as const

export type AIModelId = keyof typeof MODELS

const slotSchema = z.object({
  label: z.string(),
  description: z.string(),
  examples: z.array(z.string()).default([]),
  sourcePrompts: z.array(z.string()).default([]),
})

const positionIds = ['1', '2', '3', '4', '1-2', '2-3', '3-4', '1-4'] as const
export type PositionId = (typeof positionIds)[number]

const sourceMapSchema = z.object({
  title: z.string(),
  axis: z.string(),
  positions: z.object({
    '1': slotSchema,
    '2': slotSchema,
    '3': slotSchema,
    '4': slotSchema,
    '1-2': slotSchema,
    '2-3': slotSchema,
    '3-4': slotSchema,
    '1-4': slotSchema,
  }),
  relationships: z.object({
    contrariety: z.string(),
    contradiction_A_notA: z.string(),
    contradiction_B_notB: z.string(),
    implication_A: z.string(),
    implication_B: z.string(),
  }),
})

export type SourceMapData = z.infer<typeof sourceMapSchema>

/** App data: 8-slot source map. Exported as SemioticSquareData for compatibility. */
export type SemioticSquareData = SourceMapData

export async function POST(req: Request) {
  try {
    const { text, model: modelId } = await req.json()

    if (!text || typeof text !== 'string') {
      return Response.json({ error: 'Invalid input text' }, { status: 400 })
    }

    if (text.length > 1200) {
      return Response.json({ error: 'Text exceeds 1200 character limit' }, { status: 400 })
    }

    const modelKey: AIModelId =
      modelId === 'google' ? 'google' : 'anthropic'
    const model = MODELS[modelKey]

    const { experimental_output } = await generateText({
      model,
      output: Output.object({ schema: sourceMapSchema }),
      system: `You are an expert in source mapping for journalism. Analyze the input and produce an 8-slot source map.

STRUCTURE (matches the CAJ worksheet):
- Corners 1 and 2: The main opposition (e.g. "Belonging" vs "Exclusion"). These are the two poles structuring the story.
- Corner 3: Contradiction of 1 (not simply 2). E.g. "Alienation" contradicts "Belonging."
- Corner 4: Contradiction of 2 (not simply 1). E.g. "Tolerance" contradicts "Exclusion."
- Edge "1-2": Sources between position 1 and 2 — voices who bridge or sit between the two poles.
- Edge "2-3": Sources between position 2 and 3.
- Edge "3-4": Sources between position 3 and 4.
- Edge "1-4": Sources between position 1 and 4.

For each of the 8 positions (1, 2, 3, 4, 1-2, 2-3, 3-4, 1-4) provide:
- label: Short phrase (1-5 words) for that position
- description: 1-3 sentences explaining the position
- examples: 1-3 illustrative examples (optional, can be empty array)
- sourcePrompts: 2-4 concrete source types a journalist should seek (e.g. "A resident who supports development but opposes this specific project"). Actionable: who to look for.

Also provide:
- title: Concise title for the map
- axis: The central axis (e.g. "Membership / Legal Status")
- relationships: contrariety (1 vs 2), contradiction_A_notA (1 vs 3), contradiction_B_notB (2 vs 4), implication_A, implication_B (one sentence each)

Be precise and practical. Source prompts should help journalists find "voices in between" polarized coverage.`,
      messages: [
        {
          role: 'user',
          content: `Analyze this text and generate an 8-slot source map:\n\n${text}`,
        },
      ],
    })

    return Response.json(experimental_output)
  } catch (error) {
    console.error('[generate-square] Error:', error)
    return Response.json(
      { error: 'Failed to generate semiotic square. Please try again.' },
      { status: 500 }
    )
  }
}
