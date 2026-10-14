@echo off
rem Double-click this file to download and install the games.
rem It will download 4 files (~5.8 GB), check them automatically, and extract them.
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0get-the-games.ps1"
endlocal
