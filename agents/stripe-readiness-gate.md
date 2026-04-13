# Studio Occasus - Stripe Readiness Gate

## Purpose

Single source of truth to decide if Stripe implementation is ready for active rollout.

## Gate status

Overall status: Conditional Go

Reason: Architecture and integration paths are implemented, but live environment checks must be validated end-to-end before declaring full Go.

## What is already in place

### Backend

- Authenticated checkout session endpoint exists in functions index.
- Origin allow-list and return path sanitization exist.
- Price mapping for monthly and yearly exists via environment variables.
- Signed Stripe webhook endpoint exists.
- Webhook idempotency storage exists in stripe_events collection.
- Pro entitlement update exists on checkout completion.

### Frontend

- Upgrade flow calls backend checkout endpoint.
- Plan selection path exists.
- Return path handling is present.

### Security baseline

- Stripe keys are expected from environment variables only.
- Invalid origin and invalid plan paths are rejected.

## Blocking checks before full Go

All must pass.

1. Environment variables present in deployed functions runtime:
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- STRIPE_PRICE_MONTHLY
- STRIPE_PRICE_YEARLY
- ALLOWED_ORIGINS

2. Stripe dashboard setup validated:
- Webhook endpoint points to production functions URL.
- Event checkout.session.completed subscribed.
- Signing secret matches deployed runtime.

3. End-to-end functional checks:
- Monthly checkout creates Stripe session and redirects.
- Yearly checkout creates Stripe session and redirects.
- Successful payment sets user isPro true.
- Canceled checkout returns with clear UX state.

4. Guardrail checks:
- Invalid origin is rejected.
- Missing auth token is rejected.
- Missing price mapping fails safely.

5. Operational checks:
- No high-severity errors in function logs for checkout or webhook.
- Admin panel shows consistent Pro status after successful checkout.

## Minimal validation script for return session

Run this order and capture pass or fail:

1. Sign in with admin-capable test account.
2. Trigger monthly checkout from pricing modal.
3. Complete test payment in Stripe test mode.
4. Confirm redirect success state.
5. Confirm users document has isPro true and subscription metadata.
6. Repeat for yearly plan.
7. Trigger canceled flow and confirm no Pro grant.

## Go decision rule

- Full Go: all blocking checks pass.
- Conditional Go: architecture is ready but one or more blocking checks unvalidated.
- No-Go: any security-critical or entitlement-critical check fails.

## Current recommendation

Recommendation for next session: Execute the minimal validation script and finalize decision.
