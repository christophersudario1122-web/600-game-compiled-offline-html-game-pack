# 🖱️ v1.1.2 — The background follows your mouse

A small, purely visual update for the Services Hub.

Move the pointer anywhere off the cards and buttons and the background starts tracking it:
a gentle stream of characters flows along the path the mouse travelled, drifts a little, and
fades away. Move onto a card or button and the stream stops, so the controls stay clean and
readable.

It is a second fixed `<canvas>` (`z-index: 0`, `pointer-events: none`) sitting behind the
cards, so it never blocks a click or reflows the page. It also honours
`prefers-reduced-motion` and works with touch input.

## 🧪 Verified

- 25 checks × 3 widths (1280 / 768 / 500 px): canvas present, fixed, non-interactive,
  behind `.page`; zero glyphs over a card; glyphs over the background; sparse trail; no JS
  errors; no overflow.
- 47/47 regression tests pass.
- Confirmed in a real Chrome DevTools Protocol capture with real mouse events.
- Service-worker cache bumped to `arcade-hub-v8`.

---

# 🎉 v1.1.1 — The online features actually launch now

This one started with a single SVG file.

`DRAG-INTO-BROWSER.svg` is a clever little stealth launcher: an SVG that hides a
base64-encoded HTML page, which fetches the real Mantle menu from GitHub and drops it
into an iframe. Pulling it apart was the easy part. The interesting bit was tracing what
each of the five buttons actually does — and then making our Services Hub do the same
thing, with no keys and no configuration.

## 🎯 What changed

### The five features are live

| Feature | What it is | How it launches |
|---|---|---|
| **Mineral** | Minecraft in your browser | Streams the ~129 MB Mantle bundle with a live MB counter |
| **Basalt** | Browser FPS shooter | Two live servers, pick one and play |
| **Vent** | A web recreation of Among Us | Two live relays, pick one and play |
| **Slate** | Chat with frontier AI models | Terms gate, then the live Slate endpoint |
| **Magma** | Unblock any website, on any network | The live Magma proxy |

Every card opens the service in a full-screen window and embeds it in an iframe — the
same mechanism the original Mantle page uses. Allow pop-ups for the hub the first time
and everything works.

### Offline still works

Mineral, Basalt and Vent keep their bundled builds (`1.8.html`, `doom.html`,
`amongus.html`). If you're on a plane, on a locked-down network, or the service is
having a bad day, the local button still starts a game.

## 🔍 What the reverse-engineering found

- The SVG wrapper loads `dobberr/mantle-menu` from GitHub, tries seven CDN mirrors,
  injects a `<base href>` pointing at jsDelivr, and writes the result into an iframe.
- Mantle's live routes come from `dobberr/cfg/main/r.txt` — a tiny `MANTLE_ROUTES` object
  whose values are base64-encoded URLs.
- Decoded, those routes are:
  - `mineral → https://dobberr.github.io/min/` (which 404s now; the real bundle lives in
    GitHub LFS at `media.githubusercontent.com/media/dobberr/min/...`)
  - `slate → https://slate-mantle.truegrid.cloud`
  - `magma → https://magma-mantle.truegrid.cloud`
- Basalt and Vent are hard-coded in Mantle's `index.html` with two mirrors each, which is
  exactly what our chooser now offers.

## 🧪 Checks

- **16 launch checks** in headless Chrome (with `window.open` stubbed) at 1280, 768 and
  500 px: five cards, both Basalt servers, both Vent relays, the Slate consent gate, the
  Magma endpoint, no horizontal overflow, zero JS errors.
- **All four live services loaded inside iframes** and confirmed to render.
- **47/47 regression checks** still pass (`node scripts/tests/afterfix-rendertest.mjs`).

## 📦 Downloads

| File | What it is |
|---|---|
| `start-here-app.zip` | **Updated app** — launcher, hub and the working Services Hub |
| `games-corpus-part1of4.zip` … `part4of4.zip` | The 627 games — unchanged from v1.0.0 |

Extract every zip into one folder, then open `PRESSHERETOSTART.html`.

Verify the app download with `start-here-app.zip.sha256`.

Happy gaming! 🎮
