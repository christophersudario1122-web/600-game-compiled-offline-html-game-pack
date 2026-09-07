@echo off
REM Arcade Hub Launcher (WIDE - for older systems / max compatibility)
REM Launches Chrome with extra compatibility flags

set PROJECT_DIR=%~dp0
set INDEX_FILE="%PROJECT_DIR%PRESSHERETOSTART.html"

if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files --disable-web-security --allow-running-insecure-content --disable-features=IsolateOrigins,site-per-process --user-data-dir="%TEMP%\arcade_chrome_wide" --window-size=1920,1080 --new-window %INDEX_FILE%
    goto :eof
)

if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --allow-file-access-from-files --disable-web-security --allow-running-insecure-content --user-data-dir="%TEMP%\arcade_edge_wide" --window-size=1920,1080 --new-window %INDEX_FILE%
    goto :eof
)

echo No supported browser found. Please install Chrome or Edge.
pause
