# 600-Game Compiled Offline HTML Game Pack

Six hundred-odd browser games, all in one folder. Drop it on a USB stick (or just a
normal folder), open `PRESSHERETOSTART.html`, and you're playing. No install, no
sign-in, no internet, no launcher.

It's built for **Chromebooks** first — that's the machine it's designed to run on. It
also runs fine on Windows, macOS and Linux, because it's just HTML. If you've ever been
handed a locked-down laptop that won't let you add a single program, this is for you.

## Get the games (about as easy as it gets)

There are **five** downloads, and they all end up in the **same folder**:

| File | Size | What it is |
|---|---|---|
| `start-here-app.zip` | ~195 KB | the app itself — the thing you actually open |
| `games-corpus-part1of4.zip` … `part4of4.zip` | ~5.8 GB total | the 627 games |

Everything is on the **[Releases](../../releases)** page. Each file is a plain `.zip`, so any
computer can open it — no installer, no special tools, no terminal.

> Prefer to build it from source? **Code → Download ZIP** on this page gives you the same
> files as `start-here-app.zip`. Either way, you still need the four game parts.

**Yes, you have to extract them.** Downloading a `.zip` and double-clicking it is not enough —
the files have to come *out* of the zip and sit on your drive as ordinary folders. There is
nothing to install and nothing to register: you just make **one folder**, and all five zips are
extracted into it, so everything ends up side by side.

### The short version

1. **Make one folder** somewhere with room — your Desktop, Documents, or a USB stick. Call it
   whatever you like (`Arcade` is a good name). This single folder *is* the whole game.
2. Download **`start-here-app.zip`** and **extract it into that folder.**
3. Download the four **`games-corpus-part*.zip`** files and **extract each one into that same
   folder.** They merge together on their own — there is nothing clever to do.
4. Open **`PRESSHERETOSTART.html`** (double-click it, or right-click → *Open with Chrome*).

Order doesn't matter. The four parts are independent, so you can do them one at a time — and
delete each zip the moment it has finished extracting, if space is tight.

### What you should end up with

Open your `Arcade` folder. It should look exactly like this — everything at the **top level,
side by side, in the one folder:**

```
Arcade/                       <- the folder you made. Everything lives in here.
  PRESSHERETOSTART.html       <- double-click this one
  .hub/                       <- the hub pages (hidden: starts with a dot)
  .games/                     <- all 627 games (hidden: starts with a dot)
    pack/offline/             <- the individual games live in here
  README.md  CREDITS.md  CHANGELOG.md
  get-the-games.sh
```

You never have to open `.hub` or `.games`, and you never have to move anything around inside
them. If `PRESSHERETOSTART.html`, `.hub` and `.games` are all sitting together like that, it
will work.

> `.hub` and `.games` begin with a dot, so your file manager hides them by default. That's
> normal — the app still finds them. To see them anyway, see *If something looks wrong* below.

### On a Chromebook, step by step

The ChromeOS **Files** app is all you need.

1. **Make the folder.** Files → **⋮** (top right) → **New folder** → name it `Arcade`. Desktop
   or Downloads is fine; a USB stick or SD card works too.
2. Go to the **[Releases](../../releases)** page and download **`start-here-app.zip`**. It
   lands in **Downloads**.
3. In Files, open **Downloads**, **right-click `start-here-app.zip` → Extract all…**, and in
   the little dialog **point it at your `Arcade` folder**, then confirm.
4. Back on the Releases page, download **all four** `games-corpus-part*.zip` files. Yes, all
   four — each is roughly 1.5 GB, so this takes a while on a slow connection.
5. For **each** of those four zips, do the same thing: **right-click → Extract all… → choose
   the same `Arcade` folder.** Because every zip already contains the correct inner layout,
   all four merge into the single `.games` folder. You may get a *"files already exist"* prompt
   — choose **Merge** (or "apply to all"), never "keep both".
6. Open **Files → Arcade → `PRESSHERETOSTART.html`** and double-click it. It opens in Chrome
   and the arcade boots up.

Once the five zips are extracted you can delete them — you never need them again unless you
want to set up the same games on another machine.

### Do I need a USB stick?

No — an ordinary folder on the computer is enough. A USB stick is only useful for *carrying*
the pack to a different computer. If you do that, **copy the whole `Arcade` folder** (drag the
folder itself, not the loose files out of it), so its contents travel with it.

### How much space does this take?

The five zips are about **5.8 GB** together, and they expand to roughly **7.8 GB** of games.
So during setup you may briefly need around **14 GB** free. Once everything is extracted, delete
the zips and you're back to about 7.8 GB.

### If something looks wrong

- **A new folder appeared when you extracted.** Some extractors wrap the contents in a folder
  named after the zip — so you end up with `start-here-app/PRESSHERETOSTART.html` instead of
  `PRESSHERETOSTART.html`, and `games-corpus-part1of4/.games/` instead of `.games/`. Everything
  is then one level too deep. Open that extra folder and **drag its contents up one level** so
  that `PRESSHERETOSTART.html`, `.hub` and `.games` sit side by side in the *same* folder,
  exactly like the tree above.
- **You extracted the game parts into separate folders.** All four must be extracted into the
  *same* folder, so they merge into one `.games`. If you made `part1/`, `part2/`, … delete them
  and re-extract into `Arcade` instead.
- **The hub opens but shows no games.** That means `.games` isn't where it should be — usually
  it's one level too deep (see above) or was extracted into `.hub` by mistake. `PRESSHERETOSTART.html`
  and `.games` have to be neighbours.
- **You can't see `.games` or `.hub`.** They start with a dot, so file managers hide them on
  purpose. In the ChromeOS Files app open the **⋮** menu and turn on **Show hidden files**; on
  Windows, File Explorer → **View → Show → Hidden items**; on macOS, press **⌘ + Shift + .**
  Don't rename them — the app looks for these exact names.
- **You got a "these files already exist" prompt while extracting.** That's expected — the four
  parts share the `.games` folder. Choose **Merge / Replace / apply to all**, never "keep both"
  (which would make `games-corpus-part2 (1).zip`-style copies and waste space).
- **One game shows a blank page or a missing-image icon.** A handful of the 627 games were
  captured without all of their own assets (a font, a loading logo, an ad banner). That's baked
  into those games, not something the pack can fix, and it doesn't affect the rest. Close the
  tab and pick another game.

### On Windows / macOS

Same idea — extract all five zips into the one folder you made.

**Windows**

1. Make the folder (e.g. `D:\Arcade`).
2. Download **`start-here-app.zip`**, right-click it → **Extract All…**, and in the wizard click
   **Browse…** to choose `D:\Arcade`. **Un-tick "Show extracted files when complete"** if you
   like. Windows creates a *subfolder* named after the zip by default — pointing the wizard at
   your own folder is what avoids the "everything is one level too deep" problem.
3. Download the four **`games-corpus-part*.zip`** files and extract each the same way, into the
   **same** `D:\Arcade` folder. When it asks about existing files, choose **Replace the files in
   the destination** (or "Do this for all").
4. Double-click **`PRESSHERETOSTART.html`** in `D:\Arcade`. If Windows asks what to open it with,
   pick **Chrome**.

**macOS**

1. Make the folder (e.g. `~/Arcade`).
2. Download the five zips into it, then **double-click each one** — Finder unzips it right there,
   beside the zip. (Since the zips have no wrapper folder, the contents land correctly.)
3. Double-click **`PRESSHERETOSTART.html`** — it opens in your default browser.

7-Zip, WinRAR, Keka or The Unarchiver all work fine too, if you prefer them.

### If you have a terminal (optional, all platforms)

Linux, ChromeOS's "Linux (Crostini)", macOS and Git Bash:

```
bash get-the-games.sh
```

It downloads all four parts, checks them automatically, and extracts them. No SHA-256
copy-pasting — if a download is corrupted, it says so and you just run it again.

## Where everything lives

This is that same folder from *Get the games*, just annotated. The names are chosen so the two
things called "library" don't get mixed up: the hub **page** is `.hub/.library.html`, and the
games **folder** is `.games/pack/offline/`.

```
PRESSHERETOSTART.html          the thing you open
.hub/                          the hub pages and scripts
  .library.html                the game grid (search, filters, favourites, ...)
  .settings.html .stats.html .notes.html .secrets.html ...   the other pages
.games/                        all the games (NOT in this repo - see Releases)
  pack/offline/                one .html file (or folder) per game
  pack/                        upstream helper files (viewers/inliners), unreferenced
.tools/gen-features.mjs        dev helper that regenerates the feature code
.docs/FEATURES-2000.md         feature reference
.sw.js .manifest.json          offline support + installability
CREDITS.md                     who actually made all these games (not us)
get-the-games.sh               optional terminal installer
```

## Will it run on my machine?

It's plain HTML, so it runs in any modern browser, and it's happiest on a Chromebook or
a locked-down laptop because nothing needs installing. In practice this can bypass most
block apps — as long as they don't block HTML files completely.

## Features

Search across all 627 games, filter by genre, favourite the good ones, see what you
played last, and set your own theme and controls. The hub remembers your choices, works
offline through a service worker, and quietly tracks around 2000 little features under
the hood (`window.Arcade`). The secret page is password-protected, and you can change
that password whenever you like in **Settings → Security** (there's a reset button too).

## Credits

Every game here belongs to whoever made it; we just collected them. The full list is in
`CREDITS.md`, including the main pack this started from. If something of yours is here
and you'd rather it wasn't, open an issue and it'll be taken down.

## Contributors

- The pack author — for assembling and maintaining the collection.
- **Big Pickle** — the OpenCode AI agent that packaged it up and put it on GitHub.

## Reporting a problem

Found a bug, or a game that won't play? Open an
**[issue](../../issues)** — there's a short template for each kind, and the
**[guidelines](../../blob/main/.github/CONTRIBUTING.md)** say what we can fix and what we
can't. If a game is yours and you'd rather it wasn't here, say so and it goes.

## Notes

Public repo. The four release zips add up to roughly 5.8 GB (about 7.8 GB once
extracted), so give the download a little time on a slow connection. See
[Releases](../../releases) for the archives and their checksums, and `CHANGELOG.md`
for what changed and when.
