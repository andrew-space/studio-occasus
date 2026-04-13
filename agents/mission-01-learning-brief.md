# Mission 01 - Learning Brief

## Produced By

- Agent 10 - Learning Enablement

## Date

- 2026-04-13

## Purpose

Define the shortest successful beginner path through the three core tools so Agent 2 and Agent 3 can turn it into an actual guided workspace.

## Core Insight

The product already offers useful tools, but the first-time user still has to infer the recommended order alone. The workspace should stop behaving like a neutral tool switcher and start behaving like a guided progression.

## Beginner Journey

### Step 1 - Rewrite the message

- Tool: Clarity Rewriter
- User mindset: "I have something messy but I do not know where to start."
- Input expectation: one dense paragraph, landing-page intro, bio, or offer description
- Expected result: a shorter, clearer version plus editing notes
- Learning value: user sees immediate improvement with minimal effort
- Next step: move into Brand Message to turn cleaned-up thinking into a sharper positioning statement

### Step 2 - Structure the message

- Tool: Brand Message Generator
- User mindset: "My idea is clearer now, but I still need a usable positioning statement."
- Input expectation: product name, audience, problem, outcome, difference, proof, tone
- Expected result: positioning line, value proposition, and messaging structure
- Learning value: user understands how clarity becomes strategic messaging
- Next step: move into UTM Builder to package the message into a campaign-ready link

### Step 3 - Package the campaign

- Tool: UTM Builder
- User mindset: "I now know what I want to say and need a clean campaign link."
- Input expectation: base URL plus source, medium, campaign, and optional content or term
- Expected result: clean tagged URL ready for distribution
- Learning value: user sees the path from messy thinking to usable campaign execution
- Next step: either publish, or explore adjacent tools like Readability and Email Subject

## Guidance Pattern To Implement

The active tool workspace should expose one compact guidance block with four fields.

### Field 1 - Start here

- tells the user why this tool is the current recommendation in the sequence

### Field 2 - What to paste or fill in

- gives one concrete input example, not a generic explanation

### Field 3 - What you get

- describes the output in practical terms

### Field 4 - Next best step

- points to the next recommended tool in the guided path

## Recommended Shared Copy Logic

### Clarity Rewriter

- Start here: Begin with the paragraph people currently do not understand fast enough.
- What to paste: Paste a homepage intro, pitch paragraph, or service description.
- What you get: A cleaner version with jargon removed and the key idea brought forward.
- Next best step: Use Brand Message to turn the cleaned-up idea into positioning.

### Brand Message Generator

- Start here: Use this after clarity work, when the idea is cleaner but still not structured.
- What to paste: Fill in the audience, problem, outcome, and what makes the offer different.
- What you get: A sharper positioning statement and messaging backbone.
- Next best step: Use UTM Builder to prepare a campaign link around that message.

### UTM Builder

- Start here: Use this when the message is ready and you want clean campaign tracking.
- What to paste: Add the destination URL and campaign labels you want to track.
- What you get: A clean tagged link ready for ads, email, or social.
- Next best step: Explore Readability or Email Subject if you want to refine the campaign assets around the link.

## UX Placement Recommendation

- Place the shared guidance block directly under the active tool header and above the usage bar.
- Keep it visible before the form so the user understands the task before reading fields.
- Keep it compact enough to avoid pushing the form too far down on laptop screens.

## Localization Recommendation

- Structure the guidance as reusable translation keys rather than hardcoded paragraphs.
- Keep each field short enough for EN and FR without layout breakage.
- Reuse the same four-field pattern for future tools so the learning system scales.

## Review Risks To Watch

- Too much guidance will create clutter and reduce the premium feel.
- Too little guidance will fail to change first-use behavior.
- The next-step cue should feel helpful, not like a forced funnel.

## Handoff To Agent 2

Design a guidance component for the active tool workspace that makes the sequence visible without competing with the tool itself.

## Handoff To Agent 3

Implement the component with reusable data so EN/FR text and next-step mapping can be updated without rewriting the UI structure.