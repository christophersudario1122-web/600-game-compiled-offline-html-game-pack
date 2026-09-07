@echo off
REM Arcade Hub Launcher
REM Launches Chrome with file:// access enabled so Pyodide Web Worker can importScripts

set PROJECT_DIR=%~dp0
set INDEX_FILE="%PROJECT_DIR%PRESSHERETOSTART.html"

REM Try Chrome first
where chrome >nul 2>nul
if %errorlevel% == 0 (
    start "" chrome --allow-file-access-from-files --disable-web-security --user-data-dir="%TEMP%\arcade_chrome_data" --new-window %INDEX_FILE%
    goto :eof
)

REM Try Chrome in default install location
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files --disable-web-security --user-data-dir="%TEMP%\arcade_chrome_data" --new-window %INDEX_FILE%
    goto :eof
)

REM Try Edge
where msedge >nul 2>nul
if %errorlevel% == 0 (
    start "" msedge --allow-file-access-from-files --disable-web-security --user-data-dir="%TEMP%\arcade_edge_data" --new-window %INDEX_FILE%
    goto :eof
)

if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --allow-file-access-from-files --disable-web-security --user-data-dir="%TEMP%\arcade_edge_data" --new-window %INDEX_FILE%
    goto :eof
)

echo No supported browser found. Please install Chrome or Edge.
pause
