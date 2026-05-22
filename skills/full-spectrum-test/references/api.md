# API And Data Checklist

Use this reference for HTTP APIs, backend contracts, and frontend behavior that depends on request/response data.

## Discovery

- Identify base URL, environment, auth method, required headers, schema/docs, rate limits, and safe test data.
- Do not mutate production data unless explicitly approved. Prefer read-only checks or disposable records.
- Record the exact endpoint, method, parameters, and relevant request body.

## Core Cases

- Success path: status code, schema, required fields, data semantics.
- Auth: missing token, invalid token, expired token, insufficient role.
- Validation: missing required fields, wrong types, invalid enum, boundary values, oversized payload.
- Query behavior: pagination, sorting, filtering, search, empty results, special characters.
- Data consistency: create/read/update/delete flow, idempotency, duplicate submit, stale data.
- Error behavior: 4xx clarity, 5xx handling, timeout/retry, network failure.

## Contract Checks

- Response status matches contract.
- Error body is structured and actionable.
- No secrets or internal stack traces leak in response.
- Date/time, currency, IDs, booleans, nullability, and arrays follow expected shape.
- Frontend handles `null`, empty arrays, partial data, and slow responses.

## Evidence

For each finding include:

```text
Request: METHOD /path?query
Auth/role:
Payload excerpt:
Status:
Response excerpt:
Expected:
Actual:
Impact:
```

Keep payload excerpts small and redact tokens, cookies, personal data, and secrets.
