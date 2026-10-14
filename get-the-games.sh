#!/usr/bin/env bash
# Get The Games (macOS / Linux / ChromeOS "Linux (Crostini)" terminal)
#
# Downloads the 4 game-pack zips, checks each one automatically, then extracts
# them into this folder. No SHA-256 copy-pasting: the fingerprints are built in.
#
# Usage:   bash get-the-games.sh
#
# You do NOT need this script on a Chromebook. The simplest path is the Files app:
# download the 4 zips and use "Extract all" on each. See README.md.

set -euo pipefail
cd "$(dirname "$0")"

repo="christophersudario1122-web/600-game-compiled-offline-html-game-pack"
tag="v1.0.0"
base="https://github.com/${repo}/releases/download/${tag}"

names=(
  "games-corpus-part1of4.zip"
  "games-corpus-part2of4.zip"
  "games-corpus-part3of4.zip"
  "games-corpus-part4of4.zip"
)
shas=(
  "61bc697e4373a3e4f0930b7b3555b2861b0a6eb5fc974f5108932f01b5b5f4ae"
  "b54fddf387cde45ef0817838651421229e72189337ff787db3d0a87d0ff0158a"
  "78c0bbf809d55151ceaf12c81fa23ee2eec56cc1d66526837e56f084c69fab7e"
  "1d6eb8fbcbf88f74675b940f31116fbac58b61153d1814759f3795f4c2ceb538"
)

# ---- pick a hasher ----------------------------------------------------------
if command -v sha256sum >/dev/null 2>&1; then
  hash() { sha256sum "$1" | awk '{print $1}'; }
elif command -v shasum >/dev/null 2>&1; then
  hash() { shasum -a 256 "$1" | awk '{print $1}'; }
else
  echo "  Need 'sha256sum' or 'shasum' to verify downloads." >&2; exit 1
fi

# ---- pick an unzipper -------------------------------------------------------
if command -v unzip >/dev/null 2>&1; then
  unzip_into() { unzip -o -q "$1" -d .; }
elif command -v python3 >/dev/null 2>&1; then
  unzip_into() { python3 -m zipfile -e "$1" .; }
else
  echo "  Need 'unzip' or 'python3' to extract. On ChromeOS run:" >&2
  echo "     sudo apt-get install -y unzip" >&2
  exit 1
fi

echo
echo "  GET THE GAMES - part 1 of 2: download + automatic check"
echo "  --------------------------------------------------------"
echo

for i in "${!names[@]}"; do
  name="${names[$i]}"; want="${shas[$i]}"
  if [ -f "$name" ] && [ "$(hash "$name")" = "$want" ]; then
    echo "  [skip] $name already downloaded and verified"; continue
  fi
  echo "  Downloading $name ..."
  curl -L --fail --retry 3 -o "$name" "$base/$name"
  got="$(hash "$name")"
  if [ "$got" != "$want" ]; then
    echo "  CHECK FAILED for $name"; echo "    expected $want"; echo "    got      $got"
    rm -f "$name"; echo "  The download was corrupted. Please run this again."; exit 1
  fi
  echo "  [ok] verified"
done

echo
echo "  Part 2 of 2: extracting the games"
echo "  ---------------------------------"
echo

for name in "${names[@]}"; do
  echo "  Extracting $name ..."
  unzip_into "$name"
done

echo
if [ -d ".games/pack/offline" ]; then
  echo "  ALL DONE! The games are in '.games/pack/offline/'."
  echo "  Now open PRESSHERETOSTART.html to play."
elif [ -d ".games" ]; then
  echo "  Extraction finished, but '.games/pack/offline' was not found."
  echo "  Existing files were left untouched; delete '.games' and re-run to fully"
  echo "  switch to the current layout."
else
  echo "  Extraction finished, but the '.games' folder was not found."
  echo "  Make sure this script sits next to PRESSHERETOSTART.html."
fi
echo
echo "  Tip: you can delete the 4 downloaded .zip files to free up ~5.8 GB."
