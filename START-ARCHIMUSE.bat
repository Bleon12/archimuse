@echo off
title ArchiMuse Server
cd /d "%~dp0"
echo.
echo ========================================
echo   ArchiMuse - Duke nisur serverin...
echo ========================================
echo.
echo Folder: %cd%
echo.

echo Checking MongoDB service...
net start MongoDB >nul 2>&1
node check-mongo.js
if errorlevel 1 (
  echo.
  echo MongoDB nuk u lidh. Hap FIX-MONGO.bat ose nise sherbimin MongoDB.
  echo.
  pause
  exit /b 1
)

echo.
echo Hap shfletuesin: http://localhost:1212
echo Per te ndalur: mbyll kete dritare ose shtyp Ctrl+C
echo.
node server.js
pause
