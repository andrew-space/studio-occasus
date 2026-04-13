# Studio Occasus Agent Playbook

## Mission

Ship a web MVP for the App Showcase that is functional, creative, AI-assisted, and deployable to GitHub Pages.

## Product Direction

### Concept in one sentence

Occasus Lab is a research-backed editorial web app that helps founders and small brands turn messy marketing ideas into clear messaging, sharper positioning, and cleaner campaign structure.

### Target audience

- founders and solo operators
- freelancers and consultants
- small service brands and creative studios
- marketing generalists who need clarity more than automation complexity

### Jury demo flow

The fastest demo flow is: paste weak copy into the Clarity Rewriter, show the improved version, then open the Brand Message Generator and show how a few guided answers become a positioning statement and value proposition.

### Visual direction

- Use the Studio Occasus logo as anchor branding.
- Use the LinkedIn banner as the main moodboard reference.
- Reuse the orange circle as a recurring action or focus cue.
- Show progression from organic forms to structured layouts to reflect chaos -> clarity.

## Team

| Agent | Role |
|---|---|
| Agent 1 - Product Strategist | Define concept, audience, MVP scope, and success criteria |
| Agent 2 - Experience Designer | Shape information architecture, UI direction, and interaction model |
| Agent 3 - Frontend Builder | Implement HTML, CSS, JS, and data flow for the MVP |
| Agent 4 - Content and Demo Narrative | Craft copy, onboarding, labels, and showcase-ready framing |
| Agent 5 - Deploy and QA | Prepare GitHub Pages deploy, smoke test, and final submission checklist |
| Agent 6 - Review Expert | Critique UX, detect regressions, and propose high-impact fixes |
| Agent 7 - Blog + NotebookLM Lead | Operate editorial pipeline from research to publishable drafts |
| Agent 8 - Backend Architect | Design auth, data, and payment architecture with production constraints |
| Agent 9 - Security Guardian | Enforce security checks, API hygiene, and release-blocking safeguards |
| Agent 10 - Learning Enablement | Design onboarding, guided usage, and progressive learning flows |
| Agent 11 - Memory Orchestrator | Capture relevant progress and relay reusable knowledge across agents |
| Agent 12 - Team Manager | Guide delegation, sequencing, and reliability across the full agent team |

## Status Snapshot

| Area | Status |
|---|---|
| Round brief captured | ✅ |
| Folder scaffold | ✅ |
| Concept selected | ✅ |
| MVP scope locked | ✅ |
| App implementation | ✅ Advanced MVP live |
| Firebase Auth | ✅ Google Sign-In live |
| GitHub Pages deployment | ✅ Live and verified |
| EN/FR switch | ✅ Main shell + key tools |

## Operating Rules

- Keep the first version narrow. One strong workflow beats five weak features.
- Design for GitHub Pages constraints: static hosting, client-side logic, public assets only.
- Prefer stable browser-native features over fragile integrations.
- Every major change gets added to `agents/agent-log.md`.
- Agent 11 owns cross-session and cross-agent knowledge transfer quality.
- Agent 12 owns team composition, delegation order, and delivery discipline.
- Use `agents/team-collaboration-protocol.md` as the default operating framework.

## Build Priorities

1. Pick a concept with a clear user outcome.
2. Define one primary flow the judge can understand in under 30 seconds.
3. Build a visually strong, responsive interface.
4. Add enough polish to feel like a real MVP.
5. Deploy early, then iterate.

## Current MVP Shape

- Landing page with editorial product framing
- Clarity Rewriter powered by client-side simplification rules
- Brand Message Generator with guided structured output
- UTM Builder for campaign hygiene
- First blog article connected to the product logic
- GitHub Pages workflow prepared in `.github/workflows/deploy.yml`
- Firebase Google Auth connected to project `studio-occasus`
- Dynamic branded background using Occasus visual assets
- Guided tools workspace with prev/next navigation and mobile selector
- Persistent EN/FR language switch in the main app shell
- Dedicated learning-enablement agent for onboarding and product guidance
- Memory orchestration layer for preserving relevant team learning
- Team manager layer for multi-agent coordination and role clarity
- Current verified repo: `https://github.com/andrew-space/studio-occasus`
- Current verified live URL: `https://andrew-space.github.io/studio-occasus/`

## Handoff Quickstart (Next Session)

1. Open live app: https://andrew-space.github.io/studio-occasus/
2. Smoke-test Google Sign-In, language switch, and mobile tools selector.
3. Extend translations to blog/admin if bilingual launch quality matters.
4. Revisit Stripe/backend only after frontend polish is stable.
5. Run security checks before any billing release (`scripts/security-scan.ps1` and Security Guardian workflow).
6. Use Agent 10 to define a beginner learning path before expanding feature scope again.
7. Use Agent 12 to choose the smallest effective sub-team for each new objective.
8. Use Agent 11 to update shared learning after every meaningful session.

## Team Operating Assets

- `agents/team-collaboration-protocol.md` - default collaboration protocol for the 12-agent team
- `agents/mission-01-guided-onboarding.md` - first Agent 12-led mission focused on guided onboarding for core tools