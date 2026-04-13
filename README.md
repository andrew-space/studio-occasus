# Studio Occasus

## Brief

**App Showcase**
**Ship Your MVP**

Rank: Admiral

This round is a full MVP web app showcase. The app does not need to be perfect, but it must be functional, creative, AI-assisted, and deployed live on GitHub Pages.

## Judge Checklist

- App is deployed and accessible on GitHub Pages.
- App is functional, not a placeholder.
- Demonstrates AI-assisted development skills.
- Creative and relevant concept.

## Current Status

- Moved from `AI Challenge Arena/Round 5` to personal project in `studio occasus/` (2026-04-13).
- Working structure: docs, agents, and site assets.
- App concept: Research-backed clarity messaging service.
- Advanced MVP live in `site/`.
- Verified production repo: `https://github.com/andrew-space/studio-occasus`
- Verified live URL: `https://andrew-space.github.io/studio-occasus/`
- Firebase Google Sign-In connected to project `studio-occasus`.
- Dynamic branded background, guided tool workspace, and EN/FR switch published.

## Product Direction

### Concept in one sentence

Occasus Lab is a research-backed editorial web app that helps founders and small brands turn messy marketing ideas into clear messaging, sharper positioning, and cleaner campaign structure.

### Target audience

- founders launching a product or service
- freelancers and consultants refining their positioning
- small creative businesses that need clearer brand messaging without agency complexity
- marketing generalists who want simple, useful tools instead of bloated SaaS workflows

### Main functionality the jury should understand in 30 seconds

Paste unclear marketing copy into the Clarity Rewriter and instantly get a cleaner, simpler, more direct version, then move into a guided Brand Message Generator that turns raw answers into a usable positioning statement.

### Assets and visual inspirations from Studio Occasus Assets

- `Studio_occasus_logo.png` as primary brand mark
- `SO_bannière_linkedin.jpg` as reference for layout tone, beige background, bold black typography, orange accent circle, and playful structural forms
- `SO_formes_signification_processus.pdf` as reference for the process language from exploration to structure
- overall art direction: editorial, spacious, typography-first, with organic shapes evolving into clearer geometric forms

## Working Structure

- `agents/` for delegation notes, strategy, and operating history
- `site/` for the actual MVP to deploy
- `site/assets/` for CSS, JS, images, and reusable frontend assets
- `Studio Occasus Assets/` for source material already present in the round folder
- `backups/` for local rollback snapshots created before risky deploys

## Immediate Goal

Turn the product brief into a scoped MVP that can be built fast, looks intentional, and is safe to deploy on GitHub Pages.

## Next Step

Current implementation now covers:

1. landing page with strong editorial positioning,
2. functional Clarity Rewriter,
3. functional Brand Message Generator,
4. functional UTM Builder,
5. additional marketing tools with gamification,
6. live Firebase auth,
7. bilingual EN/FR shell,
8. GitHub Pages deployment live.

## Recommended Next Session

1. Extend EN/FR coverage to blog pages and admin panel.
2. Further polish result-card UX and tool guidance copy.
3. Resume Stripe/backend only when the frontend shell is considered stable.
4. Use the new learning-enablement agent to structure onboarding and first-use guidance across core tools.
5. Use the new team-manager and memory-orchestrator agents to keep future multi-agent work coherent across sessions.
6. Use `agents/mission-01-guided-onboarding.md` as the first managed mission for the new team structure.
7. Run a local backup before risky deploys with `scripts/project-backup.ps1` and keep `BACKUP-RESTORE.md` as the restore reference.