## Description

<!-- What does this PR change? Which phase/module does it address? -->

## Checklist

- [ ] Conforms to Semantic CSS Tokens (no hardcoded colors/utilities).
- [ ] Atomic File I/O preserved (no direct Tauri filesystem calls in views).
- [ ] `tauri-specta` bindings updated (`pnpm tauri dev` ran with zero type discrepancies).
- [ ] `cargo clippy` and `cargo fmt` pass locally.
- [ ] If novel data schema changed: verified SQLite index rebuild from Markdown.
