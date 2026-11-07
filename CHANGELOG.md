# 📜 Changelog

All notable changes to this project, newest first. Dates are local build dates.

---

## 🎮 v1.1.0 — November 6, 2026

### ✨ New: A proper Services Hub with five Mantle features

We've completely reimagined the Services Hub! Instead of the old Google-CDN / NLP / font "integrations" list (which was honestly just placeholders), the hub now presents the five features from the original Mantle line-up:

- **Mineral** — Play Minecraft in your browser (bundled offline build)
- **Basalt** — Browser-based FPS shooter (bundled offline build)
- **Vent** — A web recreation of Among Us (bundled offline build)
- **Slate** — Chat with frontier AI models (online only)
- **Magma** — Unblock any website, on any network (online only)

Each feature now has its own card with a description, and Mineral/Basalt/Vent launch the bundled offline builds directly from the hub. Slate and Magma are marked "online only" with clear notices - no dead links, no confusion.

The library now has a **🎮 ONLINE FEATURES** tile (with the 🎮 icon) that opens the Services Hub, and the top bar has a **⚙ SERVICES** button. The tile only shows on the unfiltered "All Games" view - it disappears when you search or filter, so it doesn't get in the way.

### 🎨 Visual improvements

- **Boot spinner fix** — The spinner could print "undefined" once the clock passed a certain point. This is now fixed with proper math.
- **Settings layout** — Added the missing layout CSS so every control renders properly.
- **Neon sliders** — All the range sliders now have that beautiful neon glow.
- **Soundboard master volume** — The master volume slider now matches the hub styling.
- **Library scrollbars** — Themed to match the rest of the UI.

### 🧪 Testing

We added a comprehensive regression test (`scripts/tests/afterfix-rendertest.mjs`) with 47 checks covering:
- Static syntax validation of every script
- Bug pattern scanning across all hub pages
- Per-page element checks
- Corpus sanity checks

All 47 tests pass. The Services Hub was also verified in headless Chrome - 5 cards, zero JS errors, and no horizontal overflow at any screen size.

---

## 🚀 v1.0.0 — October 13, 2026

### ✨ Initial release

The first official release of the 600-game compiled offline HTML game pack!

- **627 playable titles** across 150 game directories
- **~7.8 GB** of pure browser-based fun
- **14,315 files** all packed together
- **Chromebook-ready** — designed for Chromebooks first, but works on Windows, macOS, and Linux
- **USB-ready** — just plug in and play, no installation needed

### What's included

- `PRESSHERETOSTART.html` — the main launch page
- `.hub/` folder — contains the hub interface with all the navigation and features
- `.games/` folder — contains all 627 games
- `.docs/` folder — documentation and feature lists
- `.tools/` folder — development tools

### Downloads

| File | Size | What it is |
|------|------|------------|
| `start-here-app.zip` | ~195 KB | The launcher + hub |
| `games-corpus-part1of4.zip` | ~1.385 GB | Games, part 1 of 4 |
| `games-corpus-part2of4.zip` | ~1.401 GB | Games, part 2 of 4 |
| `games-corpus-part3of4.zip` | ~1.469 GB | Games, part 3 of 4 |
| `games-corpus-part4of4.zip` | ~1.528 GB | Games, part 4 of 4 |

Each file has a matching `.sha256` file for verification.

---

## 📝 Notes

- **Game corpus is large** — the four game parts total ~5.8 GB compressed, expanding to ~7.8 GB. Make sure you have enough space.
- **Games are in `.games/pack/offline/`** — this is where the games live. The hub is in `.hub/`.
- **Service worker cache** — the service worker precaches the hub assets so they work offline. It's bumped with each major change.
- **Feature registry** — there are 2000 features in the registry (20 families × 100). The generator is in `.tools/gen-features.mjs`.

---

*Changelog maintained with love by the community. Want to add an entry? Open a pull request!*