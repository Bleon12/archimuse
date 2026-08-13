@echo off
title ArchiMuse - Fix MongoDB
cd /d "%~dp0"
echo.
echo ========================================
echo   ArchiMuse - MongoDB Desktop Fix
echo ========================================
echo.

echo [1/3] Starting MongoDB Windows service...
net start MongoDB >nul 2>&1
if %ERRORLEVEL%==0 (
  echo      Service started.
) else (
  echo      Service already running or needs Admin rights.
)

echo [2/3] Checking connection...
node check-mongo.js
if errorlevel 1 (
  echo.
  echo FAILED. Open PowerShell as Administrator and run:
  echo   net start MongoDB
  echo.
  pause
  exit /b 1
)

echo.
echo [3/3] Connection string for MongoDB Compass:
echo   mongodb://127.0.0.1:27017/archimuse
echo.
echo Admin login:
echo   admin@archimuse.app / admin123
echo.
pause
