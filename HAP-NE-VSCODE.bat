@echo off
title Hap ArchiMuse ne VS Code
cd /d "%~dp0"

set "PROJECT=%cd%"
set "VSCODE=%LocalAppData%\Programs\Microsoft VS Code\Code.exe"

echo.
echo Duke hapur projektin:
echo %PROJECT%
echo.

if exist "%VSCODE%" (
  start "" "%VSCODE%" "%PROJECT%\archimuse.code-workspace"
) else (
  echo VS Code nuk u gjet. Provo Cursor ose instalo VS Code.
  start "" "%PROJECT%\archimuse.code-workspace"
)

exit /b 0
