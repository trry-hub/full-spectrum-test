---
name: full-spectrum-test
description: >-
  全维度质量保障工作流。Use when the user asks to test, QA, audit, validate,
  regression-test, evaluate release readiness, or generate a quality report for
  Web apps, APIs, mobile apps, desktop apps, VS Code extensions/webviews, or
  hybrid products. Guides scope analysis, coverage planning, adaptive execution
  with available tools, evidence capture, severity grading, retesting, and a
  structured multidimensional report across functionality, product rationale,
  UI/visual, interaction, usability/accessibility, API/data,
  stability/performance.
---

# Full-Spectrum Test

Use this skill to run a real QA pass, not just write a checklist.

## Operating Rules

1. Identify the real target and environment first: URL, app/window, API base URL, repo branch, credentials state, test data, and available automation tools.
2. Do not stop at a plan unless the user explicitly asks for planning only. Execute every feasible P0/P1 case and mark anything not executed as `BLOCKED`, `SKIPPED`, or `NOT RUN` with a concrete reason.
3. Prefer the highest-fidelity surface available: real browser/app/API/session before static code inspection; development host before packaged artifact only when testing unreleased code; packaged/installed artifact when validating release behavior.
4. Preserve safety. Do not perform destructive production actions, payments, data deletion, mass messaging, or credential changes without explicit approval.
5. Capture evidence for every failure and for representative P0/P1 passes. Evidence can be screenshot path, DOM snapshot, request/response excerpt, console/log line, command output, or reproduction steps.
6. Release QA must include at least one real user end-to-end closed loop, executed on the highest-fidelity available surface. If this cannot be executed, record it as `P0 BLOCKED` or `P1 BLOCKED` and state exactly what is missing: account, permission, test data, backend interface, environment, or third-party dependency.
7. After fixes, run a focused retest: original failing case, one adjacent regression case, and one negative/edge case when feasible.

## Phase 0: Scope And Risk

Before planning, write a short scope block:

```text
Target:
Environment:
User goal / product intent:
User journey / API surface:
In scope:
Out of scope:
Available tools:
Assumptions:
Risk notes:
```

If information is missing but discoverable, inspect it. If it is not discoverable, proceed with a stated assumption unless that would be risky.

## Phase 1: Coverage Plan

Create a test matrix with stable IDs:

```text
ID | Dimension | Priority | Scenario | Preconditions | Steps | Expected Result | Evidence Needed
```

Use these dimensions:

- `FUNC`: functionality, happy paths, edge cases, error paths, permissions.
- `PROD`: product rationale, information architecture, feature necessity, defaults, control hierarchy, user mental model.
- `UI`: visual style, layout, text fit, responsive behavior, theming, icon clarity.
- `IX`: interaction, feedback, keyboard/mouse/touch behavior, loading/stop/cancel states.
- `UX`: ease of use, empty/error states, copy clarity, accessibility basics.
- `API`: request/response shape, auth, status codes, data consistency, network failure.
- `PERF`: loading speed, responsiveness, resource/process cleanup, recovery.

Minimum coverage guidance:

- Broad product or release QA: usually plan 25-60 cases. Do not use fewer than 20 unless the target is genuinely narrow. Include product-rationale checks for primary screens and core flows.
- Release QA: include one `P0` or `P1` real user closed-loop case that starts from the user's entry point and reaches the intended business outcome. Mark it blocked with the missing prerequisite if it cannot be run.
- Single feature QA: usually plan 8-18 cases, including happy path, error path, empty/loading state, one product-rationale case, and one regression-adjacent path.
- Bug regression: test the original repro, the fixed path, at least one adjacent workflow, and one failure/cancel/edge path.
- API-only scope: include success, auth, missing/invalid params, boundary values, idempotency or data consistency, and timeout/error behavior.

Prioritize:

- `P0`: release-blocking, data loss, security/privacy, broken core path, unbounded process/resource leak.
- `P1`: important regression, confusing UX, unreasonable default/control placement, broken secondary path, missing feedback, recoverable data/API issue.
- `P2`: polish, wording, minor layout, non-blocking enhancement.

## Phase 2: Adaptive Execution

Execute by target type and load only the relevant reference:

- Web app, webview, or browser UI: read `references/web.md`.
- API service or backend contract: read `references/api.md`.
- Mobile app, desktop app, or IDE extension UI: read `references/mobile-desktop.md`.
- When writing the final report: read `references/report-template.md`.

Execution requirements:

1. Run P0/P1 cases first.
2. Record actual result immediately after each case.
3. Keep logs concise but reproducible. Do not paste full copyrighted pages or huge responses; summarize and attach small excerpts.
4. For visual/UI issues, include viewport/window size and theme when relevant.
5. For process/performance issues, compare before/after process lists, network calls, timings, or resource indicators when available.
6. If automation is blocked, switch to the best available method and mark the limitation explicitly.

## Phase 3: Report

The final answer or artifact must include:

- Overall verdict: `PASS`, `PASS WITH RISKS`, `FAIL`, or `BLOCKED`.
- Scope and environment.
- Counts by status and dimension.
- Executed case table.
- Issue list grouped by P0/P1/P2, with reproduction and evidence.
- Unexecuted/blocked cases.
- Retest notes when fixes were applied.
- Release recommendation and next actions.

Use `references/report-template.md` for the exact report structure.

## Quality Bar

A good run should let another engineer reproduce the important results without asking:

- What was tested.
- What was not tested.
- What failed and why it matters.
- Whether the product choices support the user's real task.
- Which evidence supports the finding.
- What should be fixed first.
- What should be retested after the fix.
