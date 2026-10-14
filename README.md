# 600-Game Compiled Offline HTML Game Pack

Six hundred-odd browser games, all in one folder. Drop it on a USB stick (or just a
normal folder), open `PRESSHERETOSTART.html`, and you're playing. No install, no
sign-in, no internet, no launcher.

It's built for **Chromebooks** first — that's the machine it's designed to run on. It
also runs fine on Windows, macOS and Linux, because it's just HTML. If you've ever been
handed a locked-down laptop that won't let you add a single program, this is for you.

## Get the games (about as easy as it gets)

The games are about 5.8 GB, which is far too much to keep inside a normal git repo, so
they live on the **Releases** page in four parts. Each part is a plain `.zip` that any
computer can open — no special tools, no terminal.

### On a Chromebook (no terminal needed)

1. On this repo page: **Code → Download ZIP**, then extract that zip. You now have the
   app folder (with `PRESSHERETOSTART.html` in it).
2. Go to **[Releases](../../releases)** and download all four `games-corpus-part*.zip`
   files into that same folder.
3. For each of the four zips: **right-click → Extract all**. Extract each one into the
   same folder, so all four sets of files merge into one `.games` folder.
4. Open `PRESSHERETOSTART.html`.

That's it. The zips are independent, so you can extract them in any order, one at a
time (handy if you're short on space — you can delete each zip after it's extracted).

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

## What's in here

- `PRESSHERETOSTART.html` — the thing you open.
- `.hub/` — the hub: library, search, filters, favourites, recently played, themes,
  keybinds, stats, notes, a soundboard, settings, and a couple of hidden pages.
- `.games/` — the games (not stored in the repo — see above).
- `.sw.js` and `.manifest.json` — make the hub installable and keep it working offline.
- `.tools/` and `.docs/` — helper scripts and design notes.
- `CREDITS.md` — who actually made all these games (not us).

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
