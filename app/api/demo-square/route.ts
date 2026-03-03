import type { SemioticSquareData } from '../generate-square/route'

const slot = (
  label: string,
  description: string,
  examples: string[],
  sourcePrompts: string[]
) => ({ label, description, examples, sourcePrompts })

const DEMO_EXAMPLES: { label: string; pitch: string; square: SemioticSquareData }[] = [
  {
    label: 'Immigration Story',
    pitch:
      'A story about undocumented immigrants who arrived as children, now adults with deep roots in their communities, facing deportation to countries they barely remember.',
    square: {
      title: 'Belonging vs. Exclusion',
      axis: 'Membership / Legal Status',
      positions: {
        '1': slot(
          'Belonging',
          'Full cultural and civic membership in a society — having roots, relationships, and recognized identity in a place.',
          [
            'A DACA recipient who graduated from a US university and works as a nurse',
            'Community members with decades of neighborhood ties',
          ],
          [
            'A DACA recipient or long-term resident with strong community ties',
            'An educator or employer who can speak to integration and belonging',
            'A faith or community leader who works with immigrant families',
          ]
        ),
        '2': slot(
          'Exclusion',
          'Legal or civic expulsion from a society — being denied status, rights, or residency despite possible deep ties.',
          [
            'Deportation orders against long-term residents',
            'Denial of work permits and access to public services',
          ],
          [
            'Someone who has faced or is facing deportation proceedings',
            'An immigration attorney or advocate working on removal cases',
            'A family member of someone deported or in detention',
          ]
        ),
        '3': slot(
          'Alienation',
          'The absence of belonging — not being fully accepted or integrated, neither recognized as member nor formally expelled.',
          [
            'A legal resident who feels culturally invisible',
            'Second-generation immigrants caught between two worlds',
          ],
          [
            'A second-generation immigrant who feels caught between two identities',
            'An asylum seeker in prolonged limbo (e.g. waiting for hearing)',
            'A legal resident who describes feeling invisible or not fully accepted',
          ]
        ),
        '4': slot(
          'Tolerance',
          'The absence of active exclusion — being permitted to remain without full acceptance or legal security.',
          [
            'Undocumented residents in "sanctuary" jurisdictions not targeted for deportation',
            'Informal accommodation of workers outside legal frameworks',
          ],
          [
            'A local official or employer in a sanctuary city explaining practice',
            'Someone who employs or houses undocumented neighbors without formal status',
            'A community organizer who works across legal-status lines',
          ]
        ),
        '1-2': slot(
          'Between Belonging and Exclusion',
          'Voices who experience or articulate both membership and marginalization — e.g. conditional belonging, or exclusion that does not erase identity.',
          [],
          [
            'A DACA recipient who feels American but lives with legal precarity',
            'A mixed-status family member who navigates both worlds',
          ]
        ),
        '2-3': slot(
          'Between Exclusion and Alienation',
          'Those who have been excluded but resist alienation, or who are alienated in ways that border on formal exclusion.',
          [],
          [
            'Someone recently deported who still identifies with their former community',
            'An advocate who works with excluded populations and describes their agency',
          ]
        ),
        '3-4': slot(
          'Between Alienation and Tolerance',
          'Voices in limbo — neither fully integrated nor actively excluded; tolerated but not secure.',
          [],
          [
            'An asylum seeker who has temporary status and describes daily uncertainty',
            'A community that informally accommodates people without formal status',
          ]
        ),
        '1-4': slot(
          'Between Belonging and Tolerance',
          'Those who have belonging but advocate for or practice tolerance toward those without full status.',
          [],
          [
            'A citizen or permanent resident who actively supports undocumented neighbors',
            'A faith community that provides sanctuary or support regardless of status',
          ]
        ),
      },
      relationships: {
        contrariety:
          'Belonging and Exclusion are semantic contraries: they occupy opposite ends of the legal-civic membership axis.',
        contradiction_A_notA:
          'Belonging is contradicted by Alienation: one who belongs is not alienated; to be alienated is to lack belonging.',
        contradiction_B_notB:
          'Exclusion is contradicted by Tolerance: active exclusion is the opposite of tolerant non-enforcement.',
        implication_A:
          'Belonging implies the absence of Exclusion (Tolerance): genuine members are not actively expelled.',
        implication_B:
          'Exclusion implies the absence of Belonging (Alienation): those formally excluded lose their claim to membership.',
      },
    },
  },
  {
    label: 'AI Adoption in Organizations',
    pitch:
      'An enterprise technology team deploying generative AI for customer service across departments. Some leaders see efficiency gains and competitive advantage; employees worry about job displacement and the loss of judgment-based work; middle management struggles to measure impact while maintaining quality; some teams embrace AI as augmentation while others resist it entirely.',
    square: {
      title: 'AI Adoption vs. Human Judgment',
      axis: 'Automation / Expertise Preservation',
      positions: {
        '1': slot(
          'AI Adoption',
          'Enthusiastic embrace of AI tools to automate workflows, accelerate decisions, and increase efficiency — prioritizing scale and speed.',
          [
            'Executives emphasizing competitive advantage and cost savings',
            'Early adopter teams leveraging AI to reduce manual processes',
          ],
          [
            'A c-suite or product leader championing AI implementation',
            'An engineer or data scientist building AI systems in-house',
            'An early adopter team showing success metrics from AI integration',
          ]
        ),
        '2': slot(
          'Human Judgment',
          'Commitment to domain expertise, relational knowledge, and context-specific decision-making — skeptical of automation for complex or values-based work.',
          [
            'Customer service veterans who notice AI misses contextual nuance',
            'Researchers questioning AI reliability and bias in high-stakes decisions',
          ],
          [
            'A long-tenured employee who articulates what AI cannot replace',
            'A researcher or ethicist studying AI limitations and failures',
            'A domain expert (e.g. healthcare, legal, education) pointing out corner cases AI misses',
          ]
        ),
        '3': slot(
          'Displacement',
          'Loss of skilled work without transition or new framework — employees losing roles, responsibilities, and sense of professional identity.',
          [
            'Customer service representatives whose jobs are eliminated without reskilling',
            'Knowledge workers finding their expertise devalued',
          ],
          [
            'A former knowledge worker displaced by automation',
            'A union representative documenting job losses from AI',
            'An employee describing loss of craft or mastery in their field',
          ]
        ),
        '4': slot(
          'Augmentation',
          'Strategic integration of AI as a tool that enhances human expertise rather than replacing it — new skills required, existing judgment preserved.',
          [
            'Teams using AI to handle routine work while experts focus on exceptions',
            'Organizations reskilling workers to work alongside AI systems',
          ],
          [
            'A team lead explaining how AI augments rather than replaces their work',
            'An employee who was reskilled to work with AI tooling',
            'A manager designing workflows where humans and AI collaborate',
          ]
        ),
        '1-2': slot(
          'Between AI Adoption and Human Judgment',
          'Voices navigating tension between efficiency pressures and quality concerns — recognizing both value and risk.',
          [],
          [
            'A manager trying to implement AI while preserving team expertise',
            'A technologist acknowledging AI limitations and human judgment needs',
          ]
        ),
        '2-3': slot(
          'Between Human Judgment and Displacement',
          'Workers and experts resisting automation while facing inevitable change — articulating what should not be lost.',
          [],
          [
            'An employee advocating for their role while acknowledging some tasks could automate',
            'A professional expressing fear of displacement but openness to adaptation',
          ]
        ),
        '3-4': slot(
          'Between Displacement and Augmentation',
          'Those who have experienced disruption and found new ways to contribute — remaking roles rather than replacing them.',
          [],
          [
            'A former role-holder now training others to work with AI tools',
            'An employee who reinvented their job description around AI collaboration',
          ]
        ),
        '1-4': slot(
          'Between AI Adoption and Augmentation',
          'Leaders and technologists who implement AI strategically with human flourishing in mind — thinking beyond pure automation.',
          [],
          [
            'A product leader designing AI features that augment rather than replace',
            'An executive building reskilling programs alongside AI deployment',
          ]
        ),
      },
      relationships: {
        contrariety:
          'AI Adoption and Human Judgment represent opposite stances on technology in work: one prioritizes automation, the other preserves expertise.',
        contradiction_A_notA:
          'AI Adoption is contradicted by Displacement: widespread automation without transition support leads to displacement.',
        contradiction_B_notB:
          'Human Judgment is contradicted by Augmentation: organizations that preserve judgment do so by augmenting human work, not resisting AI.',
        implication_A:
          'AI Adoption without care for augmentation implies Displacement: pure automation without reskilling displaces workers.',
        implication_B:
          'Human Judgment without engagement with technology implies vulnerability: expertise that ignores AI may become irrelevant.',
      },
    },
  },
  {
    label: 'Climate Journalism',
    pitch:
      'A field report on coastal fishing communities whose traditional livelihoods are collapsing due to warming seas and shifting fish populations, even as tech-driven aquaculture companies move in.',
    square: {
      title: 'Tradition vs. Disruption',
      axis: 'Economic Continuity / Environmental Adaptation',
      positions: {
        '1': slot(
          'Tradition',
          'Inherited practices and identities rooted in long-standing relationships with natural ecosystems and place.',
          [
            'Multi-generational fishing families using ancestral methods',
            'Cultural festivals tied to seasonal fish migration',
          ],
          [
            'A multi-generational fishing family still using traditional methods',
            'A cultural or festival organizer tied to seasonal cycles',
            'An elder or knowledge-keeper who learned through apprenticeship',
          ]
        ),
        '2': slot(
          'Disruption',
          'Forces that fracture existing economic and cultural systems — technological, ecological, or market-driven change.',
          [
            'Ocean warming eliminating target species from historical grounds',
            'Venture-backed aquaculture undercutting wild-catch prices',
          ],
          [
            'A scientist or official documenting species shift or warming impacts',
            'A representative of aquaculture or tech-driven fishing',
            'A resident who left or is leaving due to collapse of local fishery',
          ]
        ),
        '3': slot(
          'Displacement',
          'Loss of tradition without replacement — communities stripped of identity and livelihood with no new framework.',
          [
            'Former fishermen retrained for unrelated service jobs',
            'Abandoned fishing infrastructure and ghost harbors',
          ],
          [
            'A former fisherman who retrained for work outside fishing',
            'Someone maintaining abandoned infrastructure or ghost harbors',
            'A resident who describes loss of identity with the industry',
          ]
        ),
        '4': slot(
          'Adaptation',
          'Change that responds to new conditions without pure rupture — hybrid approaches that persist through transformation.',
          [
            'Fishermen retooling to guide eco-tourism',
            'Communities adopting sustainable aquaculture while preserving practices',
          ],
          [
            'A fisherman who has added eco-tourism or new methods alongside traditional practice',
            'A community leader in sustainable aquaculture who values local knowledge',
            'A cooperative member using tech and tradition together',
          ]
        ),
        '1-2': slot(
          'Between Tradition and Disruption',
          'Those who hold tradition but are directly facing or negotiating disruption — e.g. traditional fishers responding to change.',
          [],
          [
            'A traditional fisher who is starting to see species shift or market pressure',
            'A community leader who frames disruption in terms of tradition at risk',
          ]
        ),
        '2-3': slot(
          'Between Disruption and Displacement',
          'Voices who have been disrupted and are in the process of displacement, or who document that transition.',
          [],
          [
            'A fisher who has lost access to historical grounds and is weighing options',
            'A researcher or journalist tracking community displacement',
          ]
        ),
        '3-4': slot(
          'Between Displacement and Adaptation',
          'Those who have been displaced but are finding or advocating for adaptive paths.',
          [],
          [
            'A displaced fisher retraining in a hybrid role (e.g. guide, sustainable aquaculture)',
            'A community organization bridging displacement and new livelihoods',
          ]
        ),
        '1-4': slot(
          'Between Tradition and Adaptation',
          'Traditional practitioners who are adapting incrementally without abandoning identity.',
          [],
          [
            'A traditional fisher who has adopted some new tech or practices',
            'An elder who supports youth in combining tradition with new approaches',
          ]
        ),
      },
      relationships: {
        contrariety:
          'Tradition and Disruption are semantic contraries on the axis of continuity vs. change in livelihood systems.',
        contradiction_A_notA:
          'Tradition is contradicted by Displacement: to be displaced is to have lost tradition; tradition persists where displacement has not occurred.',
        contradiction_B_notB:
          'Disruption is contradicted by Adaptation: successful adaptation means disruption has been metabolized rather than simply experienced.',
        implication_A:
          'Tradition implies Adaptation (not-Disruption): traditional communities that survive do so by adapting incrementally.',
        implication_B:
          'Disruption implies Displacement (not-Tradition): unmediated disruption eliminates traditional structures.',
      },
    },
  },
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const index = parseInt(searchParams.get('index') ?? '0', 10)
  const example = DEMO_EXAMPLES[index % DEMO_EXAMPLES.length]
  return Response.json(example)
}

export async function POST() {
  const example = DEMO_EXAMPLES[Math.floor(Math.random() * DEMO_EXAMPLES.length)]
  return Response.json(example)
}
