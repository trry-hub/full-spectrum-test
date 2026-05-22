# Report Template

Use this structure for the final test report. Keep it concise but complete.

```markdown
# Full-Spectrum Test Report: <target>

Date: <date>
Environment: <env/build/branch/url/device>
Verdict: PASS | PASS WITH RISKS | FAIL | BLOCKED

## 1. Scope

- Target:
- In scope:
- Out of scope:
- Tools used:
- Assumptions:

## 2. Summary

| Metric | Count |
|---|---:|
| Total planned | |
| Executed | |
| Passed | |
| Failed | |
| Blocked | |
| Skipped / Not run | |

| Dimension | Planned | Passed | Failed | Blocked | Notes |
|---|---:|---:|---:|---:|---|
| FUNC | | | | | |
| PROD | | | | | |
| UI | | | | | |
| IX | | | | | |
| UX | | | | | |
| API | | | | | |
| PERF | | | | | |

## 3. Executed Cases

| ID | Priority | Dimension | Scenario | Result | Evidence | Notes |
|---|---|---|---|---|---|---|

## 4. Findings

### P0 - Release Blocking

- **<title>**
  - Impact:
  - Reproduction:
  - Expected:
  - Actual:
  - Evidence:
  - Suggested fix:

### P1 - Should Fix

- ...

### P2 - Improvement

- ...

## 5. Blocked / Not Executed

| ID | Reason | Needed to execute |
|---|---|---|

## 6. Retest Notes

| Fix / Area | Retest cases | Result | Evidence |
|---|---|---|---|

## 7. Release Recommendation

<ship / ship with risks / do not ship / blocked>

Next actions:
1. ...
2. ...
```

Result labels:

- `PASS`: expected behavior observed.
- `FAIL`: reproducible mismatch or quality issue.
- `BLOCKED`: cannot execute because dependency/access/environment is missing.
- `SKIPPED`: intentionally out of scope.
- `NOT RUN`: planned but not executed before reporting.
