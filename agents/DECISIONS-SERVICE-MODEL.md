# Studio Occasus - Service Model Decisions (2026-04-13)

## TL;DR - Strategic Pivot

**OLD:** Collection of free AI tools
**NEW:** Freemium clarity service for founders/consultants who need sharp messaging

---

## Core Decisions

### 1. POSITIONING
- **Service:** "Get your core message right before you spend on marketing"
- **Why:** Clarity Methodology + tools beat tools-only
- **Target:** Founders, consultants, small creative teams (not agencies or hobbyists)

### 2. MONETIZATION
| Tier | Price | Limits | Features |
|------|-------|--------|----------|
| **Free** | $0 | 3 rewrites/day<br/>1 brand msg/week<br/>limited exports | All tools<br/>message save<br/>basic export |
| **Pro** | $18/mth | Unlimited | All free features<br/>+ versioning<br/>+ team collab (5 users)<br/>+ priority email |
| **Team** | $99/mth | Unlimited | All pro features<br/>+ brand vault<br/>+ admin controls<br/>+ SSO (future) |

### 3. MUST-HAVE TECH
- [x] **User accounts** (Firebase Auth: email + Google)
- [x] **Payment processing** (Stripe subscriptions)
- [x] **Firestore** (save messages, projects, settings)
- [ ] **Admin dashboard** (user stats, revenue, churn)
- [ ] **Email sequence** (onboarding, reactivation)

### 4. UX TRANSFORMATION
**Free user flow:**
1. Landing page → "What's your core message?"
2. 5-question diagnostic → "Message Clarity Report"
3. Show gap: "Your clarity: 4/10 → Potential: 9/10"
4. One free rewrite → Save & Share
5. Auto-show pro upgrade CTA

**Pro user flow:**
1. Same entry point
2. Unlimited rewrites + save history
3. Brand Voice Handbook tool
4. Campaign Brief Generator tool
5. Team invitations

### 5. COPY & MARKETING
- Replace "Tool" language with "Process" language
- Clarity Rewriter → Message Clarity Engine
- Brand Message Generator → Positioning Builder
- UTM Builder → Campaign Architecture Toolkit
- Emphasize: "Repeatable methodology, powered by AI"

---

## BLOCKERS (Deal-breakers if not resolved)

| Blocker | Owner | Status | Timeline |
|---------|-------|--------|----------|
| Firebase web config empty on deployed site | Agent 8 | ⏳ TODO | 1-2 days |
| Current site regression testing | Agent 5 | ⏳ TODO | 1 day |
| Backend security review (auth + stripe) | Agent 9 | ⏳ TODO | 2 days |
| Auth layer implementation | Agent 3 + 8 | ⏳ TODO | 2-3 days |
| Stripe sandbox testing | Agent 8 | ⏳ TODO | 1 day |

---

## SUCCESS MILESTONES

### Week 1: Foundation
- [ ] Firebase config filled + Google Sign-In working on live URL
- [ ] Current tools validated (no regressions)
- [ ] Strategic brief updated (Agent 1)

### Week 2: Auth layer
- [ ] User account creation working
- [ ] Message save/load working
- [ ] Free tier limits enforced

### Week 3: Payment
- [ ] Stripe integration live in staging
- [ ] Tier upgrade UI working
- [ ] Pricing A/B tested

### Week 4: Launch
- [ ] "Early Access Beta - Pro free for 30 days" campaign
- [ ] First 100 free users target
- [ ] Analytics tracking live

---

## KEY METRICS TO WATCH

**For product growth:**
- Free tier sign-up rate (target: 50+/week)
- Free → Pro conversion (target: 2-5%)
- Time to first tool use (target: <2 min)
- Churn rate (target: <5%/month)
- LTV/CAC ratio (target: >3x)

**For product quality:**
- Message save rate = engagement signal
- Tool usage concentration (which drives conversion?)
- Support response time

---

## TEAM ASSIGNMENTS (Who owns what)

| Task | Owner | Co-owner | When |
|------|-------|----------|------|
| Strategic brief (service positioning) | Agent 1 | Agent 12 | This week |
| Unblock Firebase config | Agent 8 | Agent 3 | URGENT |
| Validate current live state | Agent 5 | Agent 3 | ASAP |
| UX progression design | Agent 2 | Agent 10 | This week |
| Backend auth implementation | Agent 8 | Agent 9 | Week 2 |
| Frontend auth UI | Agent 3 | Agent 2 | Week 2 |
| Stripe integration | Agent 8 | Agent 3 | Week 3 |
| Copy rewrite (service narrative) | Agent 4 | Agent 1 | This week |
| Security review (auth + stripe) | Agent 9 | Agent 8 | Before deploy |
| Onboarding content | Agent 10 | Agent 4 | Week 2 |
| QA + staging deploy | Agent 5 | Agent 6 | Week 3 |
| Go/no-go review | Agent 6 | Agent 5 | Before launch |

---

## ANTI-PATTERNS (What NOT to do)

❌ Skip Firebase fix thinking "we'll do it later"
❌ Launch with no user authentication
❌ Deploy Stripe without security review
❌ Add "pro features" that free users actually need
❌ Implement premium tier before onboarding is strong
❌ Change pricing midway through early access

---

## COMMUNICATION CADENCE

- **Daily standup:** 5 min async check-in in `agent-log.md`
- **Blocker escalation:** Tag Agent 12 if stuck on decision
- **Weekly sync:** Friday review of progress vs plan
- **Deploy gate:** Never ship without Agent 6 + Agent 5 sign-off

---

## REFERENCE DOCS

- Full reunion notes: `reunion-strategique-2026-04-13.md`
- Team collaboration protocol: `team-collaboration-protocol.md`
- Product brief: `README.md`
- Agent roster: All `agent-*-.md` files in this folder

---

**Status:** ✅ Decisions locked in. Ready for execution.
**Next action:** Agent 8 unblocks Firebase config.
**Escalation path:** If stuck, call Agent 12 (team-manager).
**Backup reminder:** `scripts/project-backup.ps1` before any risky change.

