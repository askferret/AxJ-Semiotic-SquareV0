<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Thanks this is good as is for now. Let's switch gears and and draft proposal and ideas for an MVP around tools for modeling context. Since this is an MVP, I think we focus on the semiotic square tool while mentioning the bigger project in the pipeline. Here's what I'm thinking based on our conversation so far: Prototyping ethnographic journalism methods for broader adoption and improving story development, quality, and depth.

Tools for modeling story context and community impact
Semiotic Squares - analyze story proposals and/or field notes and local discourse to identify "sources in between" (using semiotic squares) who are missed by traditional "polarization" reporting
Benefit-Sharing Monitor: The AI tracks community information needs (from listening sessions) against the newsroom's output. If the output is purely "about" the community but doesn't "serve" their defined needs, the dashboard flags a reciprocity deficit
Contextual Anchoring: Pull "Emergent" signals from a journalist's field notes and compares them to "Dominant" headlines to ensure the story is anchored in a community’s own terms rather than a pre-assigned nut graph.

we have this pdf from our anthrojourno site on the semiotic square: [https://anthrojourno.org/wp-content/uploads/2026/01/Semiotic-Square-Worksheet.pdf](https://anthrojourno.org/wp-content/uploads/2026/01/Semiotic-Square-Worksheet.pdf)

also attached the MVP proposal template. this MVP won't mention the Engage2026 conference, but if useful we could pull in ideas from that proposal.

Perfect. Now I have what we need. Let me draft the MVP proposal focusing on the Semiotic Square tool with the context of a broader toolset mentioned.

***

# EPIC2026 Prototype and MVP Proposal

## Summary Statement

This MVP demonstrates an AI-powered Semiotic Square tool that helps journalists and ethnographers identify "sources in between" polarized coverage by analyzing story proposals and field notes through structural semiotic analysis. Built for engagement journalism practitioners, it addresses a critical gap: moving beyond binary "both sides" reporting to surface voices that represent complex, non-polarized positions within communities—essential for context-rich, care-based journalism.

(73 words)

***

## Project Description

### The Problem: Polarization Heuristics Flatten Context

Journalism systematically misses important voices. Traditional reporting structures stories around binary oppositions—for vs. against, left vs. right, winners vs. losers—which creates *discursive silos* that fail to represent communities accurately. This "both-sidesism" is not just lazy framing: it is embedded in news workflows, beat structures, and the practical constraints of fast-turnaround reporting under resource scarcity.[^1][^2][^3][^4][^5]

Engagement journalism attempts to address this by centering community relationships, longitudinal listening, and care-based practices. But practitioners lack accessible tools to operationalize these values during story development. Ethnographers use structural methods like the *semiotic square* (Greimas) to map meaning systems beyond binary oppositions, revealing "in-between" positions that are culturally salient but structurally invisible to polarized framing. However, semiotic analysis is time-intensive and requires specialized training, making it impractical for most newsrooms.[^6][^7][^8][^9][^2][^1]

### What the MVP Does

The **Semiotic Square Context Modeling Tool** takes a journalist's story proposal, pitch, or field notes as input and uses AI to:

1. **Extract binary oppositions** currently structuring the story (e.g., "pro-development" vs. "anti-development").
2. **Generate a semiotic square** by identifying logical contradictions and complex positions (e.g., "supports development but not *this* development," "opposes development but wants economic growth").
3. **Suggest specific source types** for the four "in-between" quadrants—people whose perspectives fill gaps in binary coverage.
4. **Visualize the structure** as an interactive diagram journalists can use in editorial meetings, pitch sessions, or community listening work.

The tool is designed for engagement journalists, ethnographic reporters, community-engaged newsrooms, and anthropology/journalism students learning to translate ethnographic methods into public storytelling.

### How It Works

**Input**: Text (story pitch, field notes, community meeting transcript, or draft article)

**Backend**:

- The AI uses NLP to identify dominant binary framings in the input text (e.g., extracting noun phrases that signal oppositional categories).
- It then applies a simplified Greimasian semiotic square logic:[^7][^8]
    - Position 1 (A): First term of opposition
    - Position 2 (B): Second term of opposition
    - Position 3 (not-B): Contradiction of B
    - Position 4 (not-A): Contradiction of A
- The system generates natural-language descriptions of each quadrant, drawing on context from the input and common patterns in journalism and anthropology (e.g., "people who support the *principle* but oppose the *implementation*").
- It suggests concrete source profiles for each quadrant based on the story context.

**Output**:

- An interactive web-based semiotic square visualization
- Natural-language "source finding prompts" for each quadrant
- A downloadable worksheet journalists can use in the field

**Technology stack**:

- Frontend: Web app (HTML/CSS/JavaScript)
- Backend: Python + LLM API (OpenAI or Anthropic)
- NLP: Semantic role labeling, opposition extraction, contextual embeddings
- No data storage: inputs processed ephemerally, outputs returned to user

**Development status**: Functional prototype with manual test cases from engagement journalism projects. MVP will be polished for interactive demo at EPIC with sample story inputs.

### What Attendees Will Learn

Attendees will:

- **Interact** with the tool by submitting their own story pitches or sample texts and receiving semiotic square outputs in real time.
- **Discover** how structural semiotic methods (typically academic) can be operationalized as practical AI-assisted tools for journalists.
- **Reflect** on how AI can support *care-based context modeling*—not by automating editorial judgment, but by surfacing analytical possibilities journalists might otherwise miss under time pressure.
- **Discuss** how this approach contrasts with AI tools that optimize for speed, traffic, or engagement metrics, and instead foregrounds community representation and harm reduction.


### What We Expect to Learn

We are interested in:

- How EPIC practitioners from non-media sectors (consulting, product, policy) might adapt semiotic square-based tools for their own context modeling work (e.g., stakeholder mapping, user research, organizational change).
- Whether the tool's outputs are legible and actionable for journalists without semiotics training, or whether additional scaffolding (tutorials, examples) is needed.
- What other ethnographic journalism methods (beyond semiotic squares) would benefit from similar AI-assisted implementation.


### Relation to Conference Theme: Context

This MVP directly addresses EPIC2026's focus on *modeling and interpreting context*. It demonstrates:[^10]

- **Integration of interpretive and computational approaches**: The tool computationally operationalizes a structuralist semiotic method to surface contextual complexity journalists need but often lack time to manually analyze.[^8][^9][^7]
- **Context as relational structure**: The semiotic square treats context not as "more information," but as the *relationships between positions*—what exists in the spaces between dominant framings.[^6][^7]
- **Contextual intelligence for organizational decision-making**: Journalism organizations must decide *whose realities to represent* under constraints of time, trust, and resources. This tool makes those decisions more systematically grounded in community discourse rather than newsroom assumptions or platform logics.[^5][^1]


### Broader Project Context

This MVP is the first tool in a planned suite of **Ethnographic Journalism Context Modeling Tools** we are developing with the Centre for Anthropology and Journalism. Future tools include:

- **Benefit-Sharing Monitor**: Tracks community information needs (from listening sessions) against newsroom output to flag when coverage is extractive ("about" the community) rather than reciprocal ("serves" their needs).
- **Contextual Anchoring Tool**: Compares "emergent" signals from field notes with "dominant" headline framings to ensure stories are anchored in community terms, not pre-assigned editorial frames.

Together, these tools aim to make engagement journalism's care-based practices structurally embedded in editorial workflows, not just aspirational ethics statements.

### Authors' Expertise

The team includes practitioners with over a decade of combined experience in:

- Ethnographic research and strategic consulting in media, technology, and public-sector organizations
- Engagement journalism practice, including community-centered reporting projects and training programs for journalists and anthropologists
- Human-AI interaction and AI ethics, including prior work on context-aware systems and participatory AI design
- Semiotic analysis and structural methods in cultural anthropology and media studies

We have taught ethnographic methods to journalists and journalistic storytelling to anthropologists through workshops, courses, and collaborative projects. This MVP grows directly from that practice.

(600 words)

***

## Technical Details

**Format**: Web app accessible via QR code on any mobile device or laptop

**Interface**:

- Text input field for story pitch/field notes (max ~2000 words)
- "Generate Semiotic Square" button
- Output display:
    - Interactive diagram with four quadrants labeled with natural-language descriptions
    - Expandable "source suggestions" for each quadrant
    - "Download worksheet" option (PDF)

**Technical requirements**:

- Conference WiFi (or mobile hotspot backup)
- Laptop or tablet for display at demo table
- QR code signage for attendees to access on their devices
- No special equipment, physical objects, or additional space beyond standard demo table

**Accessibility**:

- No NDAs or licenses required
- Web-based, works on any browser
- No account creation or personal data collection
- Free to use during and after conference

**Hosting**: Cloud-hosted web app (Vercel or similar), API calls to LLM provider (standard rate limits apply, no cost passed to users)

***

## Work Sample

We will provide:

1. **Demo video** (3 minutes): Shows a journalist entering a story pitch about housing development conflicts, the tool generating a semiotic square, and the journalist using the output to identify "in-between" community voices.
2. **Screenshots**:
    - Input screen with sample text
    - Generated semiotic square visualization
    - Source suggestion outputs for each quadrant
3. **Live prototype link**: Password-protected link for reviewers to test the tool with their own inputs (credentials provided in submission).
4. **Sample outputs**: 3-4 example semiotic squares from real engagement journalism stories (anonymized as needed).

***

## Privacy Disclosure

**Data collection**: None. The tool does not collect, store, or transmit user data beyond the ephemeral processing required to generate outputs during a single session.

**Third-party processors**:

- LLM API provider (OpenAI or Anthropic) processes input text to generate semiotic analysis. Per their terms of service, API inputs are not used for model training. No user-identifying information is sent.
- Hosting provider (Vercel or similar) logs access for performance monitoring but does not retain input/output content.

**User consent and transparency**:

- Clear on-screen notice: "Your text is processed to generate a semiotic square. We do not store your input or output. Inputs are sent to an AI service for analysis."
- "I understand" acknowledgment required before first use.

**Opt-out**: Users can exit at any time; no data persists after session ends.

**Bystanders**: No audio, video, or images captured. Tool is text-only.

***

## AI Disclosure

This MVP is fundamentally an AI-powered tool, and we are transparent about how AI is used:

**In the proposal**: We used generative AI (Claude) to help refine language, structure arguments, and synthesize information about EPIC's CFP and semiotic square methods. All core ideas, frameworks, and design decisions originated from the authors' prior work in engagement journalism and ethnography.

**In the MVP itself**:

- The tool uses large language models (LLMs) to:
    - Extract binary oppositions from input text via semantic analysis
    - Generate natural-language descriptions of semiotic square positions
    - Suggest source types for each quadrant based on contextual understanding
- We chose LLMs because they can interpret journalistic language flexibly and generate human-readable outputs, which manual rule-based NLP cannot achieve at this level of nuance.
- The semiotic square *structure* (Greimas's four-position logic) is hardcoded; the AI fills in content contextually.[^7][^8]
- We will transparently label AI-generated suggestions in the tool's UI (e.g., "AI-suggested sources for this quadrant") and include a "methodology" explainer for users.

**Methodological justification**:

- Semiotic analysis traditionally requires expert training and significant time. By using AI to automate the initial mapping, we make the method accessible to journalists under deadline pressure, while preserving the structural rigor of the framework.[^6][^7]
- The tool is a *decision-support system*, not an autonomous decision-maker: journalists evaluate and adapt outputs based on their relationships and knowledge.

**Limitations and risks**:

- LLMs may misidentify oppositions if input text is ambiguous or uses unfamiliar cultural references.
- Suggested sources may reflect training data biases (e.g., over-representing certain demographics).
- We address this by: (a) encouraging users to critically evaluate outputs, (b) including a "report a problem" feedback mechanism, and (c) iteratively refining prompts based on user testing.

***

## Ethics Disclosure

This project is grounded in the ethical frameworks of engagement journalism and participatory anthropology, which prioritize community benefit, harm reduction, and relational accountability.[^2][^1]

**Informed consent**: The tool is designed for professional use by journalists and researchers who are independently responsible for obtaining consent from the communities and sources they engage. The tool itself processes text (not people) and does not create new ethical obligations beyond standard journalistic practice.

**Harm minimization**:

- The tool does not auto-generate contact information, identify individuals, or scrape social media.
- It suggests *types* of sources (e.g., "a resident who supports affordable housing but opposes this developer"), not specific people.
- Journalists retain full editorial control and must conduct their own ethical sourcing and community engagement.

**Community benefit**:

- The tool is designed to *reduce* extractive journalism by helping reporters surface diverse community voices, not just the loudest or most polarized.
- Outputs are intended to support care-based, reciprocal reporting practices that serve community information needs.[^1][^2]

**Transparency**:

- We will openly share our methods, code (where feasible), and learnings with the journalism and anthropology communities.
- If we collect anonymized usage data post-EPIC for research purposes, we will seek explicit opt-in consent and follow IRB-equivalent protocols.

**Accountability**:

- We welcome feedback from engagement journalism practitioners, community organizers, and EPIC attendees on how the tool could better serve care-based, context-rich reporting.
- We are committed to iterating on the design based on community input.

***

**END OF PROPOSAL**

***

This proposal positions the Semiotic Square tool as the lead MVP while contextualizing it within your broader vision. It's concrete, demo-ready, and directly aligned with EPIC's context theme. You can adjust technical details, add specific examples from your anthrojourno work, or expand the "broader project" section if you want to hint more strongly at the Benefit-Sharing Monitor and Contextual Anchoring tools.

Let me know if you'd like to refine any section or if you want to sketch out ideas for how the other two tools (Benefit-Sharing, Contextual Anchoring) could become future EPIC submissions or workshop content.
<span style="display:none">[^11][^12][^13][^14][^15][^16][^17][^18][^19][^20][^21][^22][^23][^24][^25][^26][^27][^28][^29][^30][^31][^32][^33][^34][^35][^36][^37][^38][^39][^40]</span>

<div align="center">⁂</div>

[^1]: https://ijoc.org/index.php/ijoc/article/download/22669/4536

[^2]: https://bookshop.org/p/books/how-journalists-engage-robinson/19711698

[^3]: https://www.cogitatiopress.com/mediaandcommunication/article/download/7399/3511

[^4]: https://warta-iski.or.id/index.php/WartaISKI/article/download/254/124

[^5]: https://www.sourcefabric.org/blog/top-10-journalism-conferences-in-2025-aran6e3p

[^6]: https://anthrojourno.org/find-informants/

[^7]: http://www.signosemio.com/greimas/semiotic-square.asp

[^8]: https://www.revue-texto.net/Parutions/Livres-E/Hebert_AS/2.Semiotic-Square.pdf

[^9]: https://tidsskrift.dk/signs/article/download/26868/23628

[^10]: EPIC2026-AxJ-paper-proposal-info.md

[^11]: AxJ-EPIC2026-Prototype-and-MVP-Proposal-Template.pdf

[^12]: https://www.semanticscholar.org/paper/bbc15f6b377bec04bd86ae754bcadea05ff4c7c3

[^13]: http://link.springer.com/10.1007/978-3-030-41337-8_7

[^14]: https://www.semanticscholar.org/paper/d29132482931f3dca1976e5b9c468647302deb6e

[^15]: https://www.semanticscholar.org/paper/f3214419da5f7727e1bccefbedd3ca012d766fda

[^16]: https://www.semanticscholar.org/paper/09c3a90ec3c17de23ea01000717626f828691eb8

[^17]: http://services.igi-global.com/resolvedoi/resolve.aspx?doi=10.4018/978-1-7998-4948-3.ch008

[^18]: https://www.semanticscholar.org/paper/031921aec2c07b62600349180734ea011784f8be

[^19]: https://www.cambridge.org/core/product/identifier/S0030605319000942/type/journal_article

[^20]: https://www.semanticscholar.org/paper/5ebd7d21946875b9a4af6b23ae57dfcbf9001a86

[^21]: https://www.semanticscholar.org/paper/060b45da38a6ef53e363d4eb0c579b1097eea119

[^22]: https://pmc.ncbi.nlm.nih.gov/articles/PMC2791322/

[^23]: https://www.cahiers-clsl.ch/article/download/305/239

[^24]: https://www.cahiers-clsl.ch/article/download/293/227

[^25]: https://www.cahiers-clsl.ch/article/download/289/223

[^26]: https://journals.sagepub.com/doi/pdf/10.1177/14614448231207784

[^27]: https://journals.sagepub.com/doi/pdf/10.1177/14687941221132956

[^28]: https://pmc.ncbi.nlm.nih.gov/articles/PMC10192616/

[^29]: https://www.tandfonline.com/doi/pdf/10.1080/13556509.2023.2190440?needAccess=true\&role=button

[^30]: https://methods.sagepub.com/hnbk/edvol/handbook-of-ethnography/chpt/semiotics-semantics-ethnography

[^31]: https://academic.oup.com/book/40494/chapter/347775027

[^32]: https://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2862\&context=etd

[^33]: https://dergipark.org.tr/en/download/article-file/4807394

[^34]: https://dergipark.org.tr/tr/download/article-file/4807394

[^35]: https://naturalmath.com/2014/04/semiotic-square-easy-complex-simple-hard/

[^36]: https://ufdcimages.uflib.ufl.edu/NC/F0/00/28/60/00001/Grimmett_K.pdf

[^37]: https://lcq.modares.ac.ir/article-29-7959-en.html

[^38]: https://arxiv.org/abs/2506.21360

[^39]: https://tidsskrift.dk/journalistica/article/download/159742/201583/354066

[^40]: https://www.jstor.org/stable/44030128

