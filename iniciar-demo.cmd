@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  if exist "%~dp0.tools\node\node.exe" (
    set "PATH=%~dp0.tools\node;%PATH%"
  ) else (
    echo No se encontro Node.js.
    echo Instala Node.js 18 o superior y vuelve a intentarlo.
    pause
    exit /b 1
  )
)

if not exist "node_modules" (
  echo Instalando dependencias...
  call npm.cmd install
  if errorlevel 1 (
    echo No se pudieron instalar las dependencias.
    pause
    exit /b 1
  )
)

echo Iniciando Manos...
call npm.cmd run dev -- --host 127.0.0.1 --open
if errorlevel 1 pause

endlocal
