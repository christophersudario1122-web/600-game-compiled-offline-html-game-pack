# Forbidden USB Stick Games

A fully offline HTML game hub — 600+ browser games collected into one folder you can
run from a USB stick, a Chromebook, a school laptop, or any machine with a browser.
No install, no account, and no internet connection required once it is on the stick.

**Start here:** open `PRESSHERETOSTART.html`.

## Quick start

The playable games are far too large for a normal git repo (7.8 GB across 14,315
files), so they ship as four split archives on the **Releases** page. To build a
playable copy:

1. Download all four `games-corpus-part1of4.tar.gz` … `part4of4.tar.gz` files into
   the repo root — the folder that contains `PRESSHERETOSTART.html`.
2. Extract each one **in that same folder**:

   ```
   tar -xzf games-corpus-part1of4.tar.gz
   tar -xzf games-corpus-part2of4.tar.gz
   tar -xzf games-corpus-part3of4.tar.gz
   tar -xzf games-corpus-part4of4.tar.gz
   ```

3. A `.games/` folder now sits beside `PRESSHERETOSTART.html`. Open the hub and play.

Windows 10+, macOS and Linux all include `tar` out of the box. Each part has a
matching `.sha256` file if you want to verify the download first.

## Portable use

Copy the whole folder — `PRESSHERETOSTART.html`, `.hub/` and `.games/` — onto a USB
stick. Every path is relative, so it runs from any drive letter and needs no server:
just open the HTML file in a browser. Chromebooks, locked-down school laptops, and
old machines work fine too, because nothing is installed and nothing calls home.

## What is in the box

- **`PRESSHERETOSTART.html`** — the launcher and entry point.
- **`.hub/`** — the hub application: game library, search and filters, favourites,
  recently played, themes, keybinds, stats, notes, a soundboard, settings, and a few
  hidden easter-egg pages.
- **`.games/`** — the games themselves (not stored in the repo — see Releases).
- **`.sw.js`** and **`.manifest.json`** — a service worker and web-app manifest, so
  the hub can be installed and keeps working offline.
- **`.tools/`** — helper scripts, including the feature-registry generator.
- **`.docs/`** — design notes, including the 2000-feature master list.
- **`CREDITS.md`** — attribution for the third-party game packs.

## Features

The library is searchable across all 627 indexed titles, with genre filters,
favourites, recently-played history, and several sort modes. It runs offline via a
service worker, remembers your settings locally, and includes an animation layer,
customisable keybinds, a stats screen, and assorted mini-apps. The feature registry
(`window.Arcade`) tracks roughly 2000 individual features. A password gate guards the
hub; it is documented in `.hub/.settings.html`.

## Known quirks

Two `n-gon` image files have non-ASCII names (`Ψ(t) collapse.webp` and
`spin–statistics theorem.webp`). The built-in **Windows** `tar` mis-decodes UTF-8
filenames when extracting, so those two images may come out garbled on Windows.
macOS/Linux `tar`, 7-Zip and WinRAR extract them correctly. Only those two images are
affected.

## Credits and ownership

None of the games are original work — they were gathered from public sources and
remain the property of their respective authors. Full attribution is in
**`CREDITS.md`**, including the primary third-party pack this hub is built on. If you
own a title here and want it removed, open an issue.

## Notes

This repository is private. The release archives are ~5.8 GB total and require a
signed-in GitHub account to download.
