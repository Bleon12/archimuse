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
echo Hap shfletuesin: http://localhost:1212
echo.
echo Per te ndalur: mbyll kete dritare ose shtyp Ctrl+C
echo.
node server.js
pause
