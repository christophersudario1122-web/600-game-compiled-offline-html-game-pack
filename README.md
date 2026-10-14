# 600-Game Compiled Offline HTML Game Pack

Six hundred-odd browser games, all stuffed into one folder. Drop it on a USB stick (or
just a normal folder), open `PRESSHERETOSTART.html`, and you're playing. No install, no
sign-in, no internet, no launcher. It just runs — even on the locked-down school
laptops and Chromebooks that won't let you add a single program.

## Get the games (about as easy as it gets)

The games are about 5.8 GB, which is far too much to keep inside a normal repo, so they
live on the **Releases** page in four parts.

- **Windows:** double-click **`GET-THE-GAMES.bat`**. That's it. It downloads all four
  parts, checks them so you know nothing arrived corrupted, and unpacks them for you.
  When it says ALL DONE, open `PRESSHERETOSTART.html` and play.
- **macOS / Linux:** run **`bash get-the-games.sh`** in this folder. Same deal.

You never have to copy and paste those long SHA-256 hashes around — the checking happens
on its own. If a download comes through damaged, the script tells you, and you just run
it again.

### Doing it by hand (if you really want to)

Download all four `games-corpus-part*of4.tar.gz` files into this folder, then run:

```
tar -xzf games-corpus-part1of4.tar.gz
tar -xzf games-corpus-part2of4.tar.gz
tar -xzf games-corpus-part3of4.tar.gz
tar -xzf games-corpus-part4of4.tar.gz
```

A `.games` folder appears next to `PRESSHERETOSTART.html`. Done.

## What's in here

- `PRESSHERETOSTART.html` — the thing you open.
- `.hub/` — the hub itself: library, search, filters, favourites, recently played,
  themes, keybinds, stats, notes, a soundboard, settings, and a couple of hidden pages.
- `.games/` — the games (not stored in the repo — see above).
- `.sw.js` and `.manifest.json` — make the hub installable and keep it working offline.
- `.tools/` and `.docs/` — helper scripts and design notes.
- `CREDITS.md` — who actually made all these games (not us).

## Will it run on my machine?

It's plain HTML, so it runs in basically any modern browser, and it's happiest on a
Chromebook or a locked-down laptop because nothing needs installing. In practice this
can bypass most block apps — as long as they don't block HTML files completely.

## Features

Search across all 627 games, filter by genre, favourite the good ones, see what you
played last, and set your own theme and controls. The hub remembers your choices, works
offline through a service worker, and quietly tracks around 2000 little features under
the hood (`window.Arcade`). The secret page is password-protected, and you can change
that password whenever you like in **Settings → Security** (there's a reset button too).

## The odd bit

Two `n-gon` images have characters in their names that Windows' built-in `tar` gets
confused by, so they can come out with scrambled names on Windows. Nothing breaks — it's
two images in one game. macOS/Linux `tar`, 7-Zip and WinRAR get them right.

## Credits

Every game here belongs to whoever made it; we just collected them. The full list is in
`CREDITS.md`, including the main pack this started from. If something of yours is here
and you'd rather it wasn't, open an issue and it'll be taken down.

## Contributors

- The pack author — for assembling and maintaining the collection.
- **Big Pickle** — the OpenCode AI agent that packaged it up and put it on GitHub.

## Notes

Public repo. The release files add up to roughly 5.8 GB, so give the download a little
time on a slow connection. See [Releases](../../releases) for the archives and their
checksums, and `CHANGELOG.md` for what changed and when.
