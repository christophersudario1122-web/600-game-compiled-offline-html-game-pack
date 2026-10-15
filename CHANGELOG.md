# Changelog

All notable changes to this project. Newest first. Dates are local build dates.

## [Unreleased] — 2026-10-14

### Changed — the install instructions now actually answer "where do I put it?"
- README's *Get the games* section was rewritten after the most common confusion, straight from
  the 5th-grader playthrough: **do you extract it, and where does everything go?** It now opens
  with the five downloads in a table (one small app zip + four game parts), states plainly that
  you **must** extract every zip, and that there is no "root" and nothing to install — you make
  **one folder** and extract all five into it.
- Added a **"What you should end up with"** layout tree so a user can compare their folder at a
  glance, plus **"The short version"** four-step list.
- Chromebook steps went from four lines to six, naming the actual ChromeOS Files actions
  (⋮ → New folder, right-click → Extract all…, choose the destination) and the merge prompt.
- New **Windows / macOS** steps with the specific trap spelled out — the Windows Extract wizard
  defaults to a subfolder named after the zip, which is exactly what creates the
  "one level too deep" problem.
- New sections: **Do I need a USB stick?** (no — copy the whole folder if you do) and
  **How much space does this take?** (~14 GB during setup, ~7.8 GB after).
- *If something looks wrong* grew from three bullets to six: the extra top-level folder, game
  parts extracted into separate folders, hub opens but shows no games, hidden dot-folders on all
  three OSes, and the "files already exist → Merge, never keep both" prompt.

### Changed — boot animation on the start screen is roughly twice as fast
- `PRESSHERETOSTART.html` paced the Arch-style boot log by a per-line delay measured in
  milliseconds, and the whole sequence came to about **11.7 s** on a real boot. A single
  `BOOT_SPEED` factor (now `0.4`, applied through a small `pace()` helper) multiplies every
  line's delay, so the identical log — every line, the ASCII logo, the login, the MOTD — now
  plays in about **6.6 s**. The wait before the exit animation was trimmed too
  (950 ms → 400 ms). Nothing was deleted; the sequence is just paced faster.
- Click / Esc / Space / Enter still skip the boot instantly.

### Added — issue templates and guidelines (so reports are actually actionable)
- `.github/ISSUE_TEMPLATE/` with three forms plus a chooser:
  **🐞 The hub or launcher is broken**, **🎮 A game won't play**, and
  **🧾 Removal or credit request**. Each asks for exactly the details needed to act
  (device + browser, steps, which game, how it was opened) and requires the reporter to
  confirm they searched first and read the README. Blank issues stay enabled so nobody is
  blocked, and the chooser links the README, Releases, `CREDITS.md` and the guidelines.
- `.github/CONTRIBUTING.md` — the short rules (be decent, one problem per issue, use a
  template, no paid/pirated-game requests, don't post personal info, the hub password is
  public) plus an honest **"what we can and can't fix"** table (third-party games missing
  their own assets: sometimes; network filters and a 6 GB download: no) and the removal
  policy (we remove first, ask questions later).
- Labels `game issue` and `removal request` created (`bug` already existed).
- README gained a **Reporting a problem** section pointing at both.
- `.github/` is excluded from `start-here-app.zip` (it is repo plumbing, not something a
  player should find inside the app folder).

### Fixed — service worker never registered from the hub pages
- `.hub/.library.html` and `.hub/.shared-features.js` registered `'../sw.js'` / `'./sw.js'`,
  but the file is **`.sw.js`** (dotted). The registration 404'd and was swallowed by
  `.catch(() => {})`, so the hub pages silently had no offline cache. Now points at
  `'../.sw.js'` / `'./.sw.js'`, matching `PRESSHERETOSTART.html`, which was already correct.

### Added — a real playthrough bug-check (headless Chrome over `file://`)
- `tooling/tests/release-bugcheck.mjs` — static: every one of the 627 registry entries
  resolves to a file with the **exact case and extension** the launch code builds (the
  ChromeOS/Linux case-sensitivity trap), the launcher's random-game list is checked against
  its own `.htm` exception list, and every registered service-worker path must exist.
- `tooling/tests/playthrough-bugcheck.mjs` — runtime: boots the launcher, the library, all
  13 hub pages and a dozen games in headless Chrome over `file://`, recording every missing
  file, uncaught exception and failed launch. Also drives the secret login (wrong password
  rejected; default `Chrsiischeeks` unlocks `tisrealyaint.html`) and captures screenshots.
- `tooling/tests/game-asset-sweep.mjs` — opens 62 games and lists any asset a game asks for
  that isn't in the pack (8/62; all pre-existing third-party capture gaps, cosmetic).
- `tooling/tests/release-layout-check.mjs` — proves the download merge is correct
  (`start-here-app.zip` unpacks at the root, the four parts unpack under `.games/`), that
  extraction produces real `.hub`/`.docs` directories (not `.hub\x` names), and that the app
  boots cleanly *before* the games are downloaded.

### Added — `start-here-app.zip` on the Releases page
- **The app itself is now a release download.** A new 195 KB asset,
  `start-here-app.zip`, bundles `PRESSHERETOSTART.html` + `.hub/` + `.docs/` + `.tools/`
  + `README.md` / `CREDITS.md` / `CHANGELOG.md` / `get-the-games.sh` (27 files), so a
  Chromebook user can get *everything* from the Releases page instead of using
  **Code → Download ZIP**. The release notes now lead with it as "Step 1".
- Packaged by a new tool, `tooling/tests/build-app-release.mjs`, reusing the same
  dependency-free ZIP writer as the corpus build (forward-slash, UTF-8 flag-bit-11
  names). **Gotcha:** PowerShell's `Compress-Archive` / .NET
  `ZipFile.CreateFromDirectory` write **backslash** entry names on Windows
  (`.hub\foo.js`), which break on ChromeOS/Linux — so that path is unusable here.
  Verified by re-extracting with .NET: real `.hub/` folder, 0 backslash names.
- `get-the-games.sh` inside the bundle still fetches and verifies the four game parts.

### Changed — de-duplicated folder names
- **Hub page renamed** `.hub/.library1.html` → `.hub/.library.html`. The old name
  collided with the games folder, which was *also* called `library1`. All 18 files that
  linked to it were updated; the launcher button now reads just "ENTER GAME DATABASE".
- **Games folder renamed and flattened**: `.games/.library1/offline/offline/` →
  `.games/pack/offline/`. No name means two different things any more, and the doubled
  `offline/offline` is gone. The three references to the path (`PRESSHERETOSTART.html`,
  `.hub/.boot-launch.html`, `.hub/.library.html`) were updated.
- **Unreferenced upstream helper files** (`compressed.html`, `epicviewer.htm`,
  `file-input.html`, `single-file.html`, `inline-tools/`, `methods/`, `README.md`) moved
  out of the games folder to `.games/pack/`. This also keeps their relative `./offline/`
  link to the games working, since both moved together.
- **Deleted stray backup** `.hub/.library1.html.bak`.
- **Release assets rebuilt** (the paths inside the zips changed) — re-download if you
  already have the old ones.
- **`README.md`** gained a "Where everything lives" folder map.

### Changed — Chromebook-first release format (important)
- **Release assets are now `.zip`, not `.tar.gz`.** The primary target is Chromebooks,
  and ChromeOS has **no native tar/tar.gz extraction** (the Files app can only
  "Extract all" a `.zip`). The four `games-corpus-part*` archives were rebuilt as four
  independent `.zip` files, so each one now extracts on its own, with no terminal and no
  extra software, on Chromebook / Windows / macOS / Linux alike.
  - Sizes: 1.385 / 1.401 / 1.469 / 1.528 GB (all under the 2 GiB per-asset limit).
  - Verified: all 14,315 files present, **0 CRC failures**, the two non-ASCII `n-gon`
    filenames preserved byte-for-byte (stored as UTF-8 with flag bit 11).
- **Removed `GET-THE-GAMES.bat` and `get-the-games.ps1`.** `.bat`/`.ps1` cannot run on a
  Chromebook, so they're gone. The primary install path is now the Files app
  ("Extract all" on each zip); the terminal path is the single `get-the-games.sh`.
- **`get-the-games.sh`** rewritten to download the four `.zip` parts, verify each
  against built-in SHA-256, and extract (uses `unzip`, falling back to `python3 -m
  zipfile`). Runs on ChromeOS Linux (Crostini), macOS and Linux.
- **`README.md`**: rewritten Chromebook-first — the Files-app steps lead, the terminal
  is optional. Added a note that `.games` is hidden in the Files app.
- **Tools updated**: `scripts/tests/build-games-release.mjs` now writes ZIP (dependency-
  free ZIP writer: CRC-32, UTF-8 names, explicit directory entries, no data descriptors);
  `scripts/tests/verify-games-release.mjs` parses ZIP and CRC-checks every entry.

### Added
- **`CHANGELOG.md`** (this file) to record changes in detail.

### Changed
- **Repository renamed** to `600-game-compiled-offline-html-game-pack`.
- **Repository is now public** (was private).
- **Repository description** rewritten in plain language; notes the block-app behavior.
- **Hub password is now changeable.** `login.html` reads the password from
  `localStorage["arcade_hub_password"]` (set from **Settings → Security**) and falls
  back to the built-in default only when nothing custom is saved.
- **Settings → Security**: clearer description, a new **RESET** button to restore the
  built-in default password, and an honest success message.

### Fixed
- Login error text typo: `INVALid KEY` → `INVALID KEY`.
- The settings password message claimed `login.html` "still uses the original"
  password — that is no longer true.

## [v1.0.0] — 2026-10-13

### Added
- Initial public source drop: hub app (`.hub/`), launcher (`PRESSHERETOSTART.html`),
  PWA files (`.sw.js`, `.manifest.json`), tools (`.tools/`), docs (`.docs/`), and
  `CREDITS.md`.
- Release **v1.0.0** with the game corpus as four archives (~5.8 GB total, 14,315
  files, 7.8 GB uncompressed) plus `.sha256` files and a `MANIFEST.json`. (Originally
  `.tar.gz`; replaced with `.zip` on 2026-10-14 — see Unreleased above.)
