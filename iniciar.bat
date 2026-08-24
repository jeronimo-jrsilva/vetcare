@echo off
title VetCare - Clinica Veterinaria
cd /d "%~dp0"
echo ==========================================
echo       VetCare - MVP Veterinaria
echo ==========================================
echo.

if exist "..\electron-win32-x64\electron.exe" (
    echo Iniciando via Electron Portatil - Raiz do Pendrive...
    start "" "..\electron-win32-x64\electron.exe" .
    goto fim
)

if exist ".\electron-win32-x64\electron.exe" (
    echo Iniciando via Electron Portatil - Local...
    start "" ".\electron-win32-x64\electron.exe" .
    goto fim
)

echo Iniciando via npm start...
call npm start

:fim
