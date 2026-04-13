# Agent 5 - Deploy and QA

## Status: Live deployment verified

## Deploy target

- repo: ai-challenge-round5-studio-occasus
- owner: andrew-space
- expected live URL: https://andrew-space.github.io/ai-challenge-round5-studio-occasus/
- strategy: GitHub Pages workflow deployment from site/

## Workflow

- file: .github/workflows/deploy.yml
- actions/configure-pages uses enablement: true
- artifact path: site

## Release log

- initial MVP commit: e4bad36
- docs publish-state commit: 8cf1403
- Firebase live config + auth commit: 4b359e4
- UX/lang refresh commit: f0fa3cd

## QA checklist (Studio Occasus)

### Functional
- [ ] Landing page loads
- [ ] Clarity Rewriter rewrites input text
- [ ] Brand Message Generator returns 3 outputs
- [ ] UTM Builder returns valid URL
- [ ] Copy result button works
- [ ] Blog article page opens
- [ ] Google Sign-In works on live Pages URL
- [ ] EN/FR switch updates main shell correctly
- [ ] Guided tool navigation works on desktop and mobile

### Visual
- [ ] Typography matches editorial direction
- [ ] Beige/black/orange palette is consistent
- [ ] Logo and banner render correctly
- [ ] Mobile layout keeps all core actions accessible
- [ ] Dynamic background remains subtle and does not hurt readability
- [ ] Tool workspace removes horizontal-scroll friction

### Technical
- [ ] No missing asset errors
- [ ] No console errors on first load
- [ ] GitHub Actions run ends in completed/success
- [ ] Live Pages URL is accessible

## Next deploy step

After any new release, perform one full smoke test on the live URL and capture screenshot evidence for submission.

## Handoff - 2026-04-10 (Latest)

- Live Firebase auth is working again on the currently verified Pages deployment.
- Current verified production target is `studio-occasus`.
- Next-session deployment/QA sequence:
1. Confirm latest `Deploy GitHub Pages` run is green on `origin/main`.
2. Validate live URL load, Google Sign-In, and avatar state.
3. Validate EN/FR switch, guided tool navigation, and mobile selector behavior.
4. Only after that, resume Stripe/backend work if requested.
