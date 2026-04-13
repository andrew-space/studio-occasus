# Agent 1 - Updated Strategic Brief (2026-04-13)

## Executive Summary

**Studio Occasus is pivoting from "free AI toolkit" to "clarity service with freemium model."**

This brief replaces the prior "MVP feature set" orientation with a business and service model that sustains growth, monetization, and user retention.

---

## Product Identity

### Name & Tagline
- **Product name:** Occasus Lab
- **Tagline:** "Get your core message right before you spend a dollar on marketing"
- **Elevator pitch (30 sec):** "Occasus Lab helps founders and consultants transform unclear messaging into crystalline positioning using a research-backed methodology, powered by AI. Free to try, $18/month for unlimited access and team collaboration."

### Service vs. Tools
- **What we sell:** Clarity methodology + tools that enforce it
- **What we DON'T sell:** generic AI tool access
- **Why distinct:** Methodology = retention, not just novelty

---

## Target Market

### Primary segments (in priority order)

#### 1. Founders pre-launch (30% TAM)
- **Pain:** "If my positioning is fuzzy, my go-to-market will be expensive and slow"
- **Need:** Clarity framework to validate before spending on marketing
- **Buying trigger:** Before raising capital, before launch, before major campaign
- **Willingness to pay:** High ($18-30/mth)

#### 2. Consultants & agencies (30% TAM)
- **Pain:** "I need a repeatable, client-friendly clarity process"
- **Need:** Tool they can share with clients to jumpstart positioning
- **Buying trigger:** When working with 3+ clients/month
- **Willingness to pay:** Very high ($50+/mth)

#### 3. Small creative teams (25% TAM)
- **Pain:** "Our messaging feels scattered across channels"
- **Need:** Team process to keep brand voice consistent
- **Buying trigger:** First hire or rebranding
- **Willingness to pay:** Medium ($12-24/mth)

#### 4. Marketing generalists (15% TAM)
- **Pain:** "ChatGPT gives me 10 options, I need a framework"
- **Need:** Guided, structured process (not raw AI)
- **Buying trigger:** When they hit ChatGPT fatigue
- **Willingness to pay:** Low-medium ($5-12/mth)

### NOT targeting
- Marketing agencies (want white-label, custom pricing)
- Enterprise (want enterprise features, SSO, security)
- Hobbyists (can't pay, too much support burden)

---

## Jobs to Be Done (in priority order)

### #1 - Validate my core message before I invest
**User:** Founder with rough idea, no clarity yet
**Problem:** "If my positioning is vague, my ads will waste money"
**Solution flow:** 
1. Write out current positioning (messy)
2. Get diagnostic: "Here's why it's unclear"
3. See rewritten version: "Here's how it could be clearer"
4. Save & share with co-founder / advisor
5. Export to Notion for pitch deck

**Monetization:** Free tier (limited rewrites), Pro tier (unlimited + feedback)

### #2 - Build a repeatable positioning process
**User:** Consultant or team leader
**Problem:** "Every positioning conversation feels different, no methodology"
**Solution flow:**
1. Guide client through question set
2. Generate positioning draft based on answers
3. Show multiple variants and reasoning
4. Build brand voice handbook (tone, values, exclusions)
5. Export as one-pager + messaging brief

**Monetization:** Pro tier requirement (team features), scale to Team tier ($99/mth)

### #3 - Keep my brand message consistent across channels
**User:** Small team lead
**Problem:** "Website says one thing, LinkedIn says another, we're incoherent"
**Solution flow:**
1. Define core message once
2. Check any new copy against it
3. Suggest consistency improvements
4. Team can all access latest version
5. Messaging history for audits

**Monetization:** Pro tier (team collab + versioning)

### #4 - Explain my offer in 60 seconds
**User:** Consultant, course creator, product person
**Problem:** "I have 1 minute to hook someone, my pitch is too long"
**Solution flow:**
1. Paste current pitch
2. Get tightened version
3. Get variations (formal, casual, benefit-led)
4. Share / export

**Monetization:** Free tier (1-2 rewrites), Pro tier (unlimited)

---

## Revenue Model

### Tier structure

#### Free Tier ($0)
- **Features:**
  - 3 Clarity Rewrites per day
  - 1 Brand Message Generator use per week
  - UTM Builder (unlimited)
  - Basic message save (up to 3)
  - Export to TXT (no PDF)
  
- **Limits:** Enforced by token counting or usage tracking via Firestore
- **Goal:** Prove value in 2 minutes. Get user to "aha!" moment.
- **Conversion path:** Hit daily limit → "Upgrade to continue" CTA

#### Pro Tier ($18-24/month)
- **Features:**
  - Unlimited Clarity Rewrites
  - Unlimited Brand Message Generator
  - All tools unlimited
  - Messaging history & versioning
  - Team invitations (up to 5)
  - Export to PDF + Notion + Figma
  - Priority email support
  - Early access to new tools
  
- **Goal:** For "getting serious about messaging" users. Price point supports small team.
- **Conversion metric:** Free tier user hits 3+ rewrites in 1 week → high conversion likelihood

#### Team Tier ($99/month) - Future
- **Features:**
  - All Pro features
  - Brand vault (central repository)
  - Messaging strategy document generator
  - Multiple projects & organization
  - Admin controls & activity log
  - Dedicated Slack support (future)
  - Custom brand guidelines PDF
  
- **Goal:** For agencies and larger teams (3+ people working on brand)

---

## Business Model Assumptions

### CAC & LTV
- **Target CAC:** $15-20 (acquisition paid search + organic)
- **Target LTV:** $300+ (assumes 18 months at $18/month + Pro → Team upsell 15%)
- **Target LTV/CAC:** 15:1 (healthy for SaaS)

### Retention & Churn
- **Target monthly churn:** <5% (user solves messaging problem, might pause)
- **Reactivation path:** Email sequence to lapsed users with new case study or tool update
- **Expansion revenue:** Free → Pro (80%), Pro → Team (15%)

### Growth vectors (Year 1)
1. **Organic:** Positioning content on blog, Twitter, case studies (30% of signups)
2. **Paid:** Google Ads + Twitter ads targeting "brand positioning" keywords (50%)
3. **Partnerships:** Affiliate deals with startup communities, Y Combinator, ProductHunt (20%)

---

## Messaging Framework

### Brand positioning statement (for internal alignment)

**For** founders and consultants who are tired of generic AI tools
**Occasus Lab** is a clarity service that combines research-backed methodology with AI assistance
**Unlike** ChatGPT or standalone writing tools, we provide a repeatable framework that turns messy ideas into crystalline positioning
**Because** unclear messaging wastes marketing spend and damages credibility
**Occasus Lab** delivers faster positioning decisions and more coherent brand voice with team collaboration features

### Key value propositions
1. **Methodology, not just AI:** "Every suggestion comes with reasoning, not randomness"
2. **Measurable clarity:** "Before/after clarity score lets you quantify improvement"
3. **Repeatable process:** "Document your positioning once, apply it everywhere"
4. **Team-ready:** "Collaborate with cofounders, advisors, or clients in real time"
5. **Fast, not bloated:** "60 seconds to your first clarity idea, not weeks of consulting"

---

## Success Metrics

### Leading indicators (watch weekly)
- Free tier sign-up rate (target: 50+/week)
- Sign-up to first tool use rate (target: 70%+ within 24h)
- Average rewrites per free user per week (target: 3+)

### Lagging indicators (report monthly)
- Free → Pro conversion rate (target: 2-5% by month 2)
- Pro tier churn rate (target: <5%/month)
- Average revenue per user (target: $3-5 including freemium)
- LTV/CAC ratio (target: 10:1 by month 6)

### Engagement metrics (track daily)
- Daily active users (free + pro)
- Tool usage concentration (% of revenue from Clarity Rewriter vs others)
- Message saves per user (high save = high likelihood to upgrade)
- Team invitations sent (indicator of expansion revenue)

### Market metrics (quarterly)
- Brand awareness (Twitter impressions, blog traffic)
- Partnership inbound (people asking for white-label, API)
- Competitor watch (is ChatGPT adding our features?)

---

## Competitive Differentiation

### vs. ChatGPT / Claude / Gemini
- ❌ We don't beat raw capability
- ✅ We offer a **repeatable framework** (not just prompting)
- ✅ We **enforce clarity discipline** (limits don't let you cheat)
- ✅ We have **team collaboration** out of the box

### vs. Clearbit / RocketReach / Notion
- ❌ We don't replace database/CRM features
- ✅ We're **focused on one job: clarity** (not 20 things)
- ✅ We're **fast and simple** (not enterprise bloat)

### vs. Copywriting SaaS (Jasper, Copy.ai)
- ❌ We don't generate 10 blog posts at once
- ✅ We're **messaging-focused**, not generic copywriting
- ✅ We have a **methodology**, not just random variations

---

## Go-to-market (Launch sequence)

### Week 1: Unblock Firebase + Auth
- Goal: Get users signing in on live URL
- Owner: Agent 8
- Blocker: Nothing ships without this

### Week 2: Free tier with auth
- Goal: 100 free users signed up
- Owner: Agents 1, 2, 3, 8, 10
- Launch: Small beta announcement (email + one tweet)

### Week 3: Pro tier billing + landing page refresh
- Goal: "Early Access - Pro $0 for 30 days" offer
- Owner: Agents 1, 3, 4, 8
- Launch: ProductHunt submission prep

### Week 4: Soft launch + metric tracking
- Goal: First paying customers, measure conversion funnel
- Owner: All agents
- Launch: ProductHunt, Twitter, HN

### Month 2: Expand based on learnings
- Goal: Refine messaging, pricing, or features based on user feedback
- Owner: Agent 1 leads, team executes

---

## Open questions for Agent 1 to resolve

1. **Pricing elasticity:** Is $18/month right, or should we start at $10 and upsell?
2. **Free tier limits:** Should brand message be gated or fully free?
3. **Team tier scope:** Is $99/month realistic for SMBs, or too high?
4. **International:** Should we charge in EUR / GBP for non-US users?
5. **Freemium vs free trial:** Are we comfortable with free users + churn, or prefer 14-day trial?
6. **API / white-label:** Should we build this into roadmap for consultant upsell?

---

## Next steps

**Agent 1 owns this brief. Review, refine, and resolve open questions with Agent 12. Once locked:**
1. Agent 2 uses this to design UX for tier messaging
2. Agent 4 uses this to rewrite all copy
3. Agent 8 uses this to plan database schema for quotas
4. Agent 10 uses this to design onboarding narratives

**Handoff deadline:** End of business 2026-04-13 (today) or earliest next session.

---

**Document owner:** Agent 1 (Product Strategist)
**Orchestrated by:** Agent 12 (Team Manager)
**Next review:** After Firebase unblock confirmed
