# 600-Game Compiled Offline HTML Game Pack

Six hundred-odd browser games, all in one folder. Drop it on a USB stick (or just a
normal folder), open `PRESSHERETOSTART.html`, and you're playing. No install, no
sign-in, no internet, no launcher.

It's built for **Chromebooks** first — that's the machine it's designed to run on. It
also runs fine on Windows, macOS and Linux, because it's just HTML. If you've ever been
handed a locked-down laptop that won't let you add a single program, this is for you.

## Get the games (about as easy as it gets)

Everything is on the **[Releases](../../releases)** page. The games are about 5.8 GB,
which is far too much to keep inside a normal git repo, so they ship there in four parts.
Each part is a plain `.zip` that any computer can open — no special tools, no terminal.

### On a Chromebook (no terminal needed)

1. Open **[Releases](../../releases)** and download **`start-here-app.zip`** (195 KB).
   Extract it — you now have `PRESSHERETOSTART.html` with a `.hub` folder beside it.
2. On the same page, download all four `games-corpus-part*.zip` files.
3. For each of the four zips: **right-click → Extract all**, into the folder that holds
   `PRESSHERETOSTART.html`, so all four merge into one `.games` folder.
4. Open `PRESSHERETOSTART.html`.

That's it. The zips are independent, so you can extract them in any order, one at a
time (handy if you're short on space — you can delete each zip after it's extracted).

> Prefer the source bundle? **Code → Download ZIP** on this page has the same files as
> `start-here-app.zip`. Either way, you need the four game parts as well.

> Note: `.games` starts with a dot, so your Files app hides it by default. It's there,
> and the hub finds it automatically. You never need to open it yourself.

### On Windows / macOS

Same idea: double-click each downloaded zip to extract it into the app folder. (Or use
7-Zip / WinRAR if you prefer.)

### If you have a terminal (optional, all platforms)

Linux, ChromeOS's "Linux (Crostini)", macOS and Git Bash:

```
bash get-the-games.sh
```

It downloads all four parts, checks them automatically, and extracts them. No SHA-256
copy-pasting — if a download is corrupted, it says so and you just run it again.

## Where everything lives

The names are chosen so the two things called "library" don't get mixed up: the hub
**page** is `.hub/.library.html`, and the games **folder** is `.games/pack/offline/`.

```
PRESSHERETOSTART.html          the thing you open
.hub/                          the hub pages and scripts
  .library.html                the game grid (search, filters, favourites, ...)
  .settings.html .stats.html .notes.html .secrets.html ...   the other pages
.games/                        all the games (NOT in this repo - see Releases)
  pack/offline/                one .html file (or folder) per game
  pack/                        upstream helper files (viewers/inliners), unreferenced
.tools/gen-features.mjs        dev helper that regenerates the feature code
.docs/FEATURES-1000.md         feature reference
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

## Notes

Public repo. The four release zips add up to roughly 5.8 GB (about 7.8 GB once
extracted), so give the download a little time on a slow connection. See
[Releases](../../releases) for the archives and their checksums, and `CHANGELOG.md`
for what changed and when.
