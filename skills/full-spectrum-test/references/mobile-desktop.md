# Mobile, Desktop, And IDE Extension Checklist

Use this reference for native apps, desktop apps, IDE extensions, Electron apps, and products tested through local machine UI automation.

## Environment

- Record OS, app version/build, device/simulator, screen size, theme, locale, account state, and install/update path.
- Prefer the real app surface when the user's report comes from the real app. Use previews only for fast layout checks.
- If using an IDE extension, distinguish source checkout, Extension Development Host, installed extension, and packaged artifact.

## Functional And Lifecycle Checks

- Launch, reload, close, reopen, sign in/out if relevant.
- Core action, cancel/stop, retry, undo/reset, delete/clear with confirmation.
- App switching, window resize, split panes, second monitor, focus loss/return.
- Update/install flow, permission prompts, missing dependency, unavailable provider/service.
- Offline/poor network behavior when relevant.

## Product Rationale Checks

- Primary workflow: the first visible controls should map to the user's main job, not internal implementation choices.
- Surface area: hide or collapse advanced provider/model/permission/context controls when the default can be inferred safely.
- Hierarchy: status, configuration, and secondary tools should not compete with the input or primary action.
- Local mental model: labels should match how users think about the product surface, such as "workspace", "current file", or "attachment", not backend-only concepts.
- State ownership: running/loading indicators should point to the exact task/provider/session that owns the work.
- Decision timing: ask users to choose options only when the choice changes the outcome and cannot be reasonably defaulted.

## Interaction And UX

- Keyboard shortcuts, Escape behavior, Tab/focus order, default button.
- Menus, popovers, command palette, toolbar actions, status indicators.
- Loading state should belong to the action that triggered it; one action must not make unrelated rows/providers look busy.
- Save/config actions need visible feedback for success, failure, and invalid input.
- Text and controls must not overlap at narrow window widths.

## Stability And Process Cleanup

- Check before/after process lists for CLI-backed or server-backed features.
- Stop/cancel should close active sessions and any child/background process it started.
- Reload/deactivate/dispose should not leave owned helpers running.
- Long-running operations should have timeout, progress, and recovery paths.

## Evidence

- Screenshot or screen recording note for visual/interaction issues.
- Process list excerpt for leaks.
- App logs or extension host logs for crashes/errors.
- Reproduction steps from a clean app state.
