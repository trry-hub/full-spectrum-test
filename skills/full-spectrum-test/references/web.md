# Web, Webview, And Browser UI Checklist

Use this reference for Web apps, browser-based products, VS Code webviews, embedded panels, and local preview pages.

## Setup

- Confirm the target URL or running app path, branch/build, theme, viewport, locale, account state, and data set.
- Prefer the real running app. For VS Code extensions, distinguish installed extension, Extension Development Host, packaged VSIX, and static webview preview.
- Check console errors/warnings and relevant network requests before declaring a UI issue fixed.

## Functional Coverage

- Entry and navigation: deep link, refresh, back/forward, tab/window switch, default route.
- Core journey: normal path, cancel/stop, retry, validation failure, empty data, long data, permission denied.
- State persistence: reload, reopen, switch provider/context/account, clear history, reset settings.
- File/data flows: upload/download, copy, commit/save, generated output, external links.

## Product Rationale Coverage

- User goal fit: each visible control should support the user's current task or a clearly adjacent task.
- Control necessity: remove, hide, or demote controls that are rarely needed, duplicated, unavailable, or only expose implementation detail.
- Defaults: safe/common choices should be implicit when possible; advanced options should not require repeated user decisions.
- Information architecture: primary action, input, context, status, and advanced settings should have a clear hierarchy.
- Placement: controls should appear near the thing they affect and outside areas where they visually compete with typing/reading.
- Naming and mental model: labels should describe user concepts, not internal provider/process jargon.
- Progressive disclosure: advanced configuration belongs behind a menu/settings affordance unless it is part of the main task.
- Decision cost: flag screens where the user must understand too many modes before they can complete the main action.

## UI And Layout Coverage

- Viewports: narrow sidebar/mobile-like width, normal desktop, wide desktop. Add more only when the product is responsive.
- Themes: light/dark/high contrast when supported.
- Text fit: long labels, long paths, long usernames, long error messages, multilingual text.
- Layers: dropdowns, popovers, command palettes, modals, tooltips, sticky footers, input overlays.
- Visual clarity: icons are recognizable, loading indicators are smooth, destructive actions are visually distinct.

## Interaction And Usability

- Keyboard: Tab order, Enter/Escape behavior, focus return after modal/menu close.
- Pointer: click targets, hover-only behavior, drag/drop when supported, disabled state behavior.
- Feedback: save/success/failure feedback, loading state ownership, stop/cancel state cleanup.
- Error recovery: useful message, retry route, no infinite loading, no duplicate stale spinners.

## API And Runtime Signals

- Capture key request payloads and responses when behavior depends on backend data.
- Note console errors and unhandled promise rejections.
- For streaming/agent UIs, verify ownership of running state: one action should not mark unrelated sessions/providers as loading.
- For process-backed UIs, check that stop/dispose/reload does not leave orphan CLI processes.

## Evidence

Use compact evidence:

- Screenshot path plus viewport/theme.
- DOM snapshot excerpt for layout/accessibility.
- Network method/path/status and small payload excerpt.
- Console/log excerpt.
- Repro steps with expected vs actual result.
