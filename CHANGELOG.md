# Changelog

All notable changes to this project. Newest first. Dates are local build dates.

## [Unreleased] — 2026-10-14

### Added
- **`GET-THE-GAMES.bat`** (Windows) and **`get-the-games.sh`** (macOS/Linux):
  one-step installers that download the four game-pack archives, verify each one
  against built-in SHA-256 fingerprints, and extract them in place. Replaces the
  old "copy and paste the hashes yourself" routine.
- **`CHANGELOG.md`** (this file) to record changes in detail.
- **`get-the-games.ps1`**: the PowerShell worker behind `GET-THE-GAMES.bat`.

### Changed
- **Repository renamed** to `600-game-compiled-offline-html-game-pack`.
- **Repository is now public** (was private).
- **Repository description** rewritten in plain language and now notes that the pack
  can bypass most block apps as long as they don't block HTML files completely.
- **`README.md`** rewritten to be friendlier: a one-click install section, a plain
  "will it run" section, a contributors list, and the block-app note.
- **Hub password is now changeable.** `login.html` reads the password from
  `localStorage["arcade_hub_password"]` (set from **Settings → Security**) and falls
  back to the built-in default only when nothing custom is saved. Previously the
  settings page saved a new password but the login page ignored it.
- **Settings → Security**: clearer description, a new **RESET** button to restore the
  built-in default password, and an honest success message (the old one wrongly said
  the change would not take effect).

### Fixed
- Login error text typo: `INVALid KEY` → `INVALID KEY`.
- The settings password message claimed `login.html` "still uses the original"
  password — that is no longer true.

## [v1.0.0] — 2026-10-13

### Added
- Initial public source drop: hub app (`.hub/`), launcher (`PRESSHERETOSTART.html`),
  PWA files (`.sw.js`, `.manifest.json`), tools (`.tools/`), docs (`.docs/`), and
  `CREDITS.md`.
- Release **v1.0.0** with the game corpus split into four `.tar.gz` archives
  (~5.8 GB total, 14,315 files, 7.8 GB uncompressed) plus `.sha256` files and a
  `MANIFEST.json`.
