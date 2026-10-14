# Guidelines and rules for issues

Short version: **be decent, use the right template, give us the details it asks for, and report
one problem per issue.** That's the whole thing. The rest of this page just explains why.

This repo is a **collection**. The games inside it were made by other people (see
[CREDITS.md](../CREDITS.md)); the hub around them — the launcher, the library page, the settings,
the installer — is the part that is ours to fix.

---

## Before you open an issue

1. **Read the README**, especially the *Get the games* steps and the *If something looks wrong*
   section. Nine out of ten "it's broken" reports are really "the folder layout is off" or
   "one game shipped without its own files".
2. **Search the issues** (open *and* closed). If someone already reported it, add a 👍 or a
   comment instead of opening a duplicate.
3. **Check your download.** Every release file has a matching `.sha256` file. Comparing them
   rules out a half-finished or corrupted download in about ten seconds.
4. **One problem per issue.** Two unrelated bugs in one report means one of them gets lost.

## Picking a template

| If… | Use |
|---|---|
| The start screen or a hub page misbehaves | **🐞 The hub or launcher is broken** |
| One game (or a few) will not play | **🎮 A game won't play** |
| A game is yours and you want it removed or credited | **🧾 Removal or credit request** |

"Blank" issue is always available if none of them fit — but the templates ask for exactly the
details that make a fix possible, so they are usually the faster path.

## The rules

- **Be decent.** No insults, no harassment, no spam, no advertising. Issues that break this get
  closed and locked.
- **Write in any language.** Simple is fine. Say what you saw, we will work it out together.
- **One problem per issue.** Keep the title about that one problem.
- **Give the details the template asks for.** "It doesn't work" with no device, browser or game
  name cannot be acted on.
- **Do not paste walls of text or huge log files.** A few relevant lines is enough. If a file is
  genuinely long, attach it instead.
- **No requests for paid or pirated games.** This pack only redistributes free, publicly
  available HTML games. Asking us to add a commercial title will be closed.
- **Never post personal or account information** (passwords, real names, addresses, school
  details). Issues are public and permanent.
- **The hub password is not a secret.** It is written in the README, and you can change it in
  **Settings → Security**. Please don't open an issue to ask for it.

## What we can fix — and what we can't

| Problem | Can we fix it? |
|---|---|
| The launcher, library, settings or other hub page | **Yes.** That is our code. |
| Downloads that are missing files or will not extract | **Yes** — tell us which file and what your `.sha256` said. |
| The folder layout / "which file goes where" | **Yes.** It is documented, and we will improve it. |
| One game showing a blank page or a missing picture or font | **Sometimes.** Those games are third-party and a few were saved without all of their own files. Often we cannot repair them, but we may be able to swap in a working copy — so still tell us the name. |
| A game that is just… not very good | **No.** We did not make it. |
| A network or content filter blocking the whole thing | **No.** If your school or workplace blocks HTML files (or the browser itself) we cannot get around that, and we will not try to. |
| A 6 GB download being slow | **No.** It is 6 GB. `get-the-games.sh` can fetch the parts one at a time if space or time is tight. |

## Removal and credit requests

If a game is yours and you want it taken down, or credited differently, open the
**🧾 Removal or credit request** template. You do **not** have to prove ownership or explain
yourself first — we remove first and ask questions later. The whole point of `CREDITS.md` is to
be honest about whose work this is.

## What to expect

This is a small project run in spare time. There is no service-level promise: some reports get
fixed the same day, some take a while, and a few will be closed as "cannot reproduce" or
"out of scope". You will get a straight answer either way. Being friendly makes it much more
likely that we dig in.
