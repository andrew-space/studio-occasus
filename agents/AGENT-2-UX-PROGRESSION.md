# Agent 2 - UX Progression for Service Model (2026-04-13)

## Overview

**Current UX problem:** Tools scattered on one page = "toolkit energy"
**Target UX:** Clear progression from free → paid value, with onboarding that educates about "clarity" concept first

---

## UX Principle: Value → Upgrade Path

### Free tier UX flow (Goal: Prove value in <2 minutes)

#### Step 1: Landing page (before sign-up)
- **Hero:** "Get your core message right before you spend on marketing"
- **Visual:** 30-second demo video (unclear copy → clear copy transformation)
- **Body:** Three value statements with icons
  1. 🎯 Clarity = faster sales cycles
  2. ⚡ AI-powered = instant feedback
  3. 🤝 Team-ready = bring your team
- **CTA:** "Try Free" → Sign up
- **Trust:**Social proof box (3-5 founder testimonials, if available)

#### Step 2: Sign up flow (Email or Google)
- Simple 2-field form (email + password, or Google)
- Onboarding question: "What are you building?" (dropdown: SaaS / Service / Product / Personal / Consulting)
- Set free tier cookie upon completion

#### Step 3: First-use onboarding (3 screens, <2 min)

**Screen 1: "What is Message Clarity?"**
- Video or animated explanation (20 sec)
- Narrative: "Unclear messaging costs you time and money. Clarity gives you competitive advantage."
- Visual: before/after comparison of messaging language
- CTA: "Let's find your clarity →"

**Screen 2: "Tell me about your offer"**
- 5-question diagnostic form:
  1. "What do you offer?" (text field)
  2. "Who is it for?" (text field)
  3. "Why is it different?" (text field)
  4. "What's your main pain point describing it?" (dropdown: "Too long", "Too vague", "Too generic", "Confused target audience")
  5. "Current positioning statement?" (optional text area)
- Save responses to Firestore (identifies users for follow-up)

**Screen 3: Welcome to your Clarity Dashboard**
- Show their diagnostic results as a "Clarity Report"
- Visual scorecard:
  ```
  Your Current Message Strength: 4/10
  
  ⚠️ Issues detected:
  • Too many clauses (suggests confusion)
  • Uses jargon: "ecosystem", "leverage", "solution"
  • Doesn't answer "why should I care"
  
  ➡️ Clear positioning potential: 9/10
  Estimated improvement: +5 points with the right message
  ```
- CTA: "Generate your clear message →" → launch Clarity Rewriter tool
- Secondary: "Skip to tools →" (for experienced users)

#### Step 4: First tool entry (Clarity Rewriter with guided walkthrough)

**Walkthrough (auto-play, can dismiss):**
1. "Paste your current message here ↓"
   - Auto-fill with their diagnostic response
2. "See how it changes ↓"
   - Show before/after in split-screen
   - Highlight changes in orange accent color
3. "Keep refining, or try another tool →"
   - Show counter: "Rewrites left today: 3"

**Tool interface (minimal, powerful):**
```
┌─────────────────────────────────────────────────────────┐
│ CLARITY REWRITER                                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Your message:  [Text area - input]                     │
│                                                         │
│ Clearer version:  [Text area - output]                 │
│                                                         │
│ Why it's clearer:  [Explanation]                       │
│ ├─ Removed jargon (ecosystem → platform)               │
│ ├─ Clarified benefit (faster → 40% faster)             │
│ ├─ Shorter (34 words → 18)                             │
│                                                         │
│ [Copy output] [Save message] [Export] [Try again]     │
│                                                         │
│                  Rewrites left: 3/3                    │
│              Ready for upgrade? [Upgrade now]          │
└─────────────────────────────────────────────────────────┘
```

#### Step 5: Message save action (Paywall moment #1)

When user clicks "Save message":
- **Free tier:** Can save up to 3 messages
- **Pro tier unlock:** "Unlimited saves + message history"
- Show success: "✓ Saved to your drafts"
- Show upgrade CTA: "Pro users get unlimited saves + team sharing"

#### Step 6: Export action (Paywall moment #2)

When user clicks "Export":
- **Free tier:** Text export only (.txt file)
- **Pro tier unlock:** PDF + Notion + Figma formats
- Show form: "Export format?"
  - Text (free)
  - PDF (upgrade required)
  - Notion (upgrade required)
  - Figma (upgrade required)

#### Step 7: Hit daily limit (Paywall moment #3)

After 3 rewrites in free tier:
```
┌─────────────────────────────────┐
│ You've used your 3 free         │
│ rewrites today.                 │
│                                 │
│ Come back tomorrow, or upgrade  │
│ Pro to keep going unlimited.    │
│                                 │
│ [Upgrade to Pro - $18/month]    │
│ [Not now, come back tomorrow]   │
└─────────────────────────────────┘
```

---

### Pro tier UX flow

#### Desktop: Sidebar tabs (instead of top nav)

Left sidebar shows:
- 🏠 Dashboard (overview of saved messages, usage)
- 🚀 Message Clarity Engine (Rewriter with history)
- 📋 Positioning Builder (Brand Message Generator)
- 📊 Campaign Brief Creator (new tool for pro)
- 🎨 Brand Voice Handbook (new tool for pro)
- 🔗 UTM Builder
- 📚 Blog
- ⚙️ Settings (team invites, billing)

#### Main content: Full-width tools with saved state

**Pro feature: Message versioning**
```
Messages (saved: 8)
├─ Clear positioning (v3, active)
│  └─ Clarity score: 8/10
│  └─ Created: Apr 13, 2026
│  └─ Last edited: Apr 13, 2026
│  └─ [View versions...] (shows v1 → v2 → v3)
├─ Campaign brief variant (v1)
└─ Social media version (v1)

[+ New blank message] [+ Duplicate active]
```

**Pro feature: Team collaboration**
```
Team Members (5/5)
├─ You (owner)
├─ co-founder@startup.com (editor)
├─ advisor@email.com (viewer)

[Invite team member] [Manage permissions]
```

**Pro feature: Export options**
```
Export active message:
- PDF (includes clarity analysis)
- Markdown (for docs)
- Notion (embeds formatting)
- Figma (text component ready)
[Choose format...]
```

#### Mobile: Tabs remain, but drawer-based nav

- Keep same tab structure, but slide drawer from left
- Single-column layout for tools
- Full-height tool input/output

---

## Design Tokens (updated for service model)

### Color palette (unchanged for consistency)
- Deep black: #121212
- Soft beige: #f5eddc
- Off-white: #fafaf8
- Accent orange: #fdb54f

### New semantic colors
- Success/unlock: #4ade80 (for upgrade CTA)
- Limited/warning: #f87171 (for quota warnings)
- Premium badge: #fdb54f + highlight

### Typography (unchanged)
- Display: Cormorant Garamond (headings, hero)
- Interface: Space Grotesk (buttons, labels, body)

### Spacing & responsive (unchanged)
- Desktop: Side-by-side 2-column
- Tablet: 1.5-column or stack
- Mobile: Full-width stack

---

## Paywall Strategy (4 CTA moments)

| Moment | Trigger | Free user sees | Pro user sees | Copy |
|--------|---------|---------|----------|------|
| **#1 - Save message** | Click "Save" | "Free tier: 3 saved messages" | "Save ∓ add to brand vault" | "It's free to start, $18/month for team collab" |
| **#2 - Export format** | Click "Export" | "Text only" | "PDF, Notion, Figma" | "PDF exports reserved for Pro" |
| **#3 - Daily limit** | After 3 rewrites | "3/3 used. Come back tomorrow" | "Unlimited rewrites today" | "Go unlimited for $18/month" |
| **#4 - Brand Voice tool** | Try Brand Voice Handbook | "Available to Pro users" | "Start building" | "Pro feature: Brand Voice Handbook" |

**Design principle:** Never nag. Always show value next to limit.

---

## Onboarding Copy (5-question diagnostic)

**Question 1: "What do you offer?"**
Placeholder: "E.g., project management software for remote teams"
Help text: "Be specific. What's the product/service name?"

**Question 2: "Who is it for?"**
Placeholder: "E.g., remote founders who want to track projects asynchronously"
Help text: "Who's your ideal customer? What's their role?"

**Question 3: "Why is it different?"**
Placeholder: "E.g., We focus on transparency, not complexity"
Help text: "What's your unfair advantage? Speed? Focus? Price?"

**Question 4: "What's your main pain point?"**
Dropdown options:
- "My offer is too complicated to explain"
- "I sound too generic, like every competitor"
- "I don't know my real competitive advantage"
- "My positioning works but it's too long"
- "I'm not sure this will actually sell"

**Question 5: "Current positioning statement (optional)"**
Placeholder: "Paste your current tagline, tagline, or positioning statement here"
Help text: "Leave blank if you don't have one yet. We'll generate from your answers above."

---

## Success Metrics (UX/Conversion focused)

**Leading indicators (track daily):**
- Sign-up to first tool use rate (target: 70% within 24h)
- Onboarding completion rate (target: 80%)
- Average rewrites per free user per session (target: 2-3)
- Message save rate (target: 30%+)
- Upgrade CTA click-through rate (target: 5-10%)

**Lagging indicators (track weekly):**
- Free → Pro conversion rate (target: 2-5% by week 2)
- Time to conversion (target: <7 days from signup)
- Churn after free trial runs out (target: <50% daily churn after day 1)

**Engagement signals (track weekly):**
- Tool usage concentration: % of revenue from Clarity Rewriter vs others
- Return rate: % of free users who come back >1 day
- Share/export rate: % of users who export messages

---

## UX Anti-patterns to avoid

❌ Split messaging between free/pro with confusing UI
❌ Force upgrade every 3 clicks (nag fatigue)
❌ Pro tool UI is slower/more cluttered than free (devalue premium)
❌ Onboarding is longer than 2 minutes (high abandon)
❌ Paywall blocks core experience before proving free value
❌ Design is different on desktop vs mobile (breaks brand)

---

## Deliverables for Agent 2 this session

1. **Figma mockups:** UX flow for free tier landing → signup → first tool
2. **Onboarding script:** 3-screen copy + diagnostic form questions
3. **Paywall copy:** 4 CTA moments with messaging variants
4. **Mobile breakpoints:** Responsive design at 375px / 768px / 1920px widths
5. **Interaction spec:** Auto-play behaviors, error states, loading states for tools
6. **Accessibility audit:** WCAG 2.1 AA compliance checklist

**Handoff to:** Agent 3 (Frontend Builder) when design locked

**Timeline:** 2-3 days design, then 1 week frontend implementation

---

**Document owner:** Agent 2 (Experience Designer)
**Orchestrated by:** Agent 12 (Team Manager)
**Next review:** When Figma mockups are ready (end of day 2026-04-14)
