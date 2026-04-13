# Mission 01 - Guided Onboarding For Core Tools

## Status

In progress. Opened on 2026-04-13 and now initialized with the first Agent 10 learning brief.

## Mission Owner

- Lead: Agent 12 - Team Manager

## Why This Mission Exists

The current Studio Occasus app already has a strong visual shell and a functional tool workspace. What it still lacks is a clearer first-use path. New users can access tools, but the interface does not yet teach them the shortest successful path through the product.

This mission creates that path.

## Objective

Make the three core tools easier to understand and easier to use for a first-time visitor without diluting the brand tone or adding heavy product clutter.

## Target Scope

- Clarity Rewriter
- Brand Message Generator
- UTM Builder
- Shared tool workspace header and navigation

## Out Of Scope

- Stripe or billing changes
- Firebase architecture changes
- Blog/admin translation expansion
- New tools
- New backend dependencies

## Success Criteria

1. A first-time user can identify where to start in under 10 seconds.
2. Each core tool explains what to paste or fill in, what happens next, and why it is useful.
3. The active workspace feels guided rather than generic.
4. The guidance remains concise, editorial, and easy to localize in EN/FR.

## Assigned Team

- Agent 12 - Team Manager: mission framing, sequencing, definition of done
- Agent 10 - Learning Enablement: beginner journey, helper copy, learning checkpoints
- Agent 2 - Experience Designer: placement of guidance inside the workspace
- Agent 3 - Frontend Builder: implementation in `site/index.html`, `site/assets/app.js`, and `site/assets/styles.css`
- Agent 6 - Review Expert: friction check after implementation
- Agent 11 - Memory Orchestrator: durable handoff and lesson capture

## Execution Order

1. Agent 10 defines the minimum learning path across the three core tools.
2. Agent 2 places the guidance inside the existing tool workspace without adding clutter.
3. Agent 3 implements the approved guidance layer.
4. Agent 6 checks whether the changes reduce confusion and preserve tone.
5. Agent 11 stores the durable lessons and next recommended step.

## Required Deliverables

1. Beginner-path definition for the three core tools.
2. One shared guidance component or pattern inside the tool workspace.
3. Concise helper copy for each core tool.
4. Review notes on friction removed and any residual UX risk.

## Proposed UI Direction

- Add a compact guided-start block in the active tool stage.
- Show one recommended starting path: rewrite -> position -> package.
- Add per-tool helper prompts that answer:
  - what to input
  - what result to expect
  - what tool to use next

## Definition Of Done

- guidance is visible in the shared workspace
- the three core tools have explicit first-use support
- language stays aligned with the Occasus editorial tone
- no editor errors in changed files
- next-step handoff recorded

## Immediate Next Action

Start with Agent 10 logic: define the beginner journey and the helper-copy structure before changing the UI.

## Progress Update

- Agent 10 deliverable is now captured in `agents/mission-01-learning-brief.md`.
- Next execution step belongs to Agent 2: turn the learning brief into a compact guidance pattern inside the active tool workspace.