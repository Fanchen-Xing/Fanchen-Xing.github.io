# Portfolio handoff contract

## Scope
- This is a portable content package for a portfolio website. Read README.md, index.html and media.js before editing.
- Adapt presentation to the destination website's framework and visual language. The current CSS is not mandatory. Preserve approved content and media while updating all paths and links when migrating.
- All new filenames and folder names must use English ASCII letters, digits and underscores (plus extensions). Chinese prose is allowed.
- No Unreal inspection or regeneration is required for website layout work. Do not access or modify scene assets as part of this task.

## Approved content
- Chinese title: 高原秋境. English name: Highlands in Gold, but do not add it to the page unless requested. No game narration.
- Section 1: both introduction paragraphs together, one showcase video with VideoCover.png, then CAM1–5 in order. Each scene image occupies one full-width row with no visible caption.
- Section 2: architecture, Main, forest/shrubs, clusters, grass, village. Main is independent of architecture. Riverbank is described in Main; roadside is described in Grass. Do not restore standalone riverbank/roadside chapters.
- Village explains AI technical ownership, user rules, implementation and feedback-driven iterations. Its paragraphs span the same width as its images.
- Section 3: AI assistance, performance, assets/references. Keep the qualitative performance paragraph followed by the approved quantitative prose, without a table. Gaea terrain; other scene assets from Fab. One empty reference image slot.
- Do not invent images, performance claims, asset credits, timeline or technical behavior. README.md records the data provenance and limitations.

## Diagram
- Preserve four peer systems: Main, Grass, Cluster (label 成簇系统), Village. Fence belongs inside Village.
- Use one node for each generation module (forest, shrubs, riverbank, grass, roadside), without expanding only selected modules into detailed processing chains.
- Show Cluster reuse by shrubs, Main tree/shrub Mask consumed by Grass, and Village road Mask linking Main/Grass. Distinguish internal processing from cross-system relationships. Do not invent reciprocal links.
- Riverbank and roadside are parallel branches within their respective owners; each owner shares a Landscape sampling source across its branches.
- assets/SystemArchitecture.png is the rendered diagram; tools/RenderSystemDiagram.py is its editable source. Keep a way to inspect the full image.

## Editing and verification
- Prefer concise headings, readable paragraphs and restrained presentation. Avoid decorative cards and slogans.
- index.html holds prose; media.js maps assets. If porting to components, keep a single source of content and update every reference.
- Preserve supplied image bytes when renaming. Responsive display should retain aspect ratios and complete images.
- Use the Vimeo player/public URL, never its management URL. Preserve the local cover and an external viewing fallback.
- Validate HTML or component structure, navigation, media paths and responsive layout. Do not claim successful remote playback unless actually verified.
