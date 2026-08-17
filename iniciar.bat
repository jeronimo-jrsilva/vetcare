@echo off
title VetCare - Clinica Veterinaria
cd /d "%~dp0"
echo ==========================================
echo       🐶 VetCare - MVP Veterinaria
echo ==========================================
echo.

if exist ".\electron-win32-x64\electron.exe" (
    echo Iniciando via Electron Portatil...
    start "" ".\electron-win32-x64\electron.exe" .
) else (
    echo Iniciando via npm start...
    npm start
)
