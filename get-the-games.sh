#!/usr/bin/env bash
# Get The Games (macOS / Linux)
# Downloads the 4 game-pack archives, checks each one automatically, then extracts them.
# No SHA-256 copy-pasting needed: the expected fingerprints are built in below.
#
# Usage:  bash get-the-games.sh
#         (or make it executable once:  chmod +x get-the-games.sh  then  ./get-the-games.sh )

set -euo pipefail
cd "$(dirname "$0")"

repo="christophersudario1122-web/600-game-compiled-offline-html-game-pack"
tag="v1.0.0"
base="https://github.com/${repo}/releases/download/${tag}"

names=(
  "games-corpus-part1of4.tar.gz"
  "games-corpus-part2of4.tar.gz"
  "games-corpus-part3of4.tar.gz"
  "games-corpus-part4of4.tar.gz"
)
shas=(
  "6620ee8365a866878b7bbfe6600ebf216456d0dd3bc104d45c332c74f5cf5369"
  "670d3653e89604312790d58c67cbd1f450a6b2bde70d028b84ae7e9df051a7f1"
  "6840b5a8fb59064c020260a858dce25b6633535f9038bb602d3fd8211733e3ab"
  "0f56faebb40ba917476d242eba19862dff4d477268dfdf488f5b5aa97bc9cdba"
)

# pick a hasher
if command -v sha256sum >/dev/null 2>&1; then
  hash() { sha256sum "$1" | awk '{print $1}'; }
elif command -v shasum >/dev/null 2>&1; then
  hash() { shasum -a 256 "$1" | awk '{print $1}'; }
else
  echo "  Need 'sha256sum' or 'shasum' to verify downloads." >&2; exit 1
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
  tar -xzf "$name"
done

echo
if [ -d ".games" ]; then
  echo "  ALL DONE! The games are in the '.games' folder."
  echo "  Now open PRESSHERETOSTART.html to play."
else
  echo "  Extraction finished, but the '.games' folder was not found."
  echo "  Make sure this script sits next to PRESSHERETOSTART.html."
fi
echo
echo "  Tip: you can delete the 4 downloaded .tar.gz files to free up ~5.8 GB."
