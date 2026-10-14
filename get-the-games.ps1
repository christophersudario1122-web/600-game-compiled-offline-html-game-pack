# Get The Games (Windows) - double-click GET-THE-GAMES.bat instead of this file.
# Downloads the 4 game-pack archives, checks each one automatically, then extracts them.
# No SHA-256 copy-pasting needed: the expected fingerprints are built in below.

$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

$repo = 'christophersudario1122-web/600-game-compiled-offline-html-game-pack'
$tag  = 'v1.0.0'
$base = "https://github.com/$repo/releases/download/$tag"

$parts = @(
  @{ name = 'games-corpus-part1of4.tar.gz'; sha = '6620ee8365a866878b7bbfe6600ebf216456d0dd3bc104d45c332c74f5cf5369' },
  @{ name = 'games-corpus-part2of4.tar.gz'; sha = '670d3653e89604312790d58c67cbd1f450a6b2bde70d028b84ae7e9df051a7f1' },
  @{ name = 'games-corpus-part3of4.tar.gz'; sha = '6840b5a8fb59064c020260a858dce25b6633535f9038bb602d3fd8211733e3ab' },
  @{ name = 'games-corpus-part4of4.tar.gz'; sha = '0f56faebb40ba917476d242eba19862dff4d477268dfdf488f5b5aa97bc9cdba' }
)

Write-Host ''
Write-Host '  GET THE GAMES - part 1 of 2: download + automatic check' -ForegroundColor Cyan
Write-Host '  --------------------------------------------------------'
Write-Host ''

foreach ($p in $parts) {
  $dest = Join-Path $PSScriptRoot $p.name
  if ((Test-Path $dest) -and ((Get-FileHash -LiteralPath $dest -Algorithm SHA256).Hash.ToLower() -eq $p.sha)) {
    Write-Host ("  [skip] " + $p.name + " already downloaded and verified") -ForegroundColor DarkGray
    continue
  }
  Write-Host ("  Downloading " + $p.name + " ...")
  curl.exe -L --fail --retry 3 -o "$dest" "$base/$($p.name)"
  if ($LASTEXITCODE -ne 0) {
    Write-Host ("  Download failed for " + $p.name) -ForegroundColor Red
    Read-Host '  Press Enter to close'; exit 1
  }
  $got = (Get-FileHash -LiteralPath $dest -Algorithm SHA256).Hash.ToLower()
  if ($got -ne $p.sha) {
    Write-Host ("  CHECK FAILED for " + $p.name) -ForegroundColor Red
    Write-Host ("    expected " + $p.sha)
    Write-Host ("    got      " + $got)
    Remove-Item -LiteralPath $dest -Force
    Write-Host '  The download was corrupted. Please run this again.' -ForegroundColor Yellow
    Read-Host '  Press Enter to close'; exit 1
  }
  Write-Host '  [ok] verified' -ForegroundColor Green
}

Write-Host ''
Write-Host '  Part 2 of 2: extracting the games' -ForegroundColor Cyan
Write-Host '  ---------------------------------'
Write-Host ''

foreach ($p in $parts) {
  Write-Host ("  Extracting " + $p.name + " ...")
  tar -xzf (Join-Path $PSScriptRoot $p.name) -C $PSScriptRoot
  if ($LASTEXITCODE -ne 0) {
    Write-Host ("  Extraction failed for " + $p.name) -ForegroundColor Red
    Read-Host '  Press Enter to close'; exit 1
  }
}

Write-Host ''
if (Test-Path (Join-Path $PSScriptRoot '.games')) {
  Write-Host '  ALL DONE! The games are in the ".games" folder.' -ForegroundColor Green
  Write-Host '  Now open PRESSHERETOSTART.html to play.' -ForegroundColor Green
} else {
  Write-Host '  Extraction finished, but the ".games" folder was not found.' -ForegroundColor Yellow
  Write-Host '  Make sure this script sits next to PRESSHERETOSTART.html.' -ForegroundColor Yellow
}
Write-Host ''
Write-Host '  Tip: you can delete the 4 downloaded .tar.gz files to free up ~5.8 GB.' -ForegroundColor DarkGray
Read-Host '  Press Enter to close'
