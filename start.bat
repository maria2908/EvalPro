@echo off
echo ================================
echo   Starting EvalPro Server...
echo ================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org
    pause
    exit
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Start the server
echo Starting server on http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
start http://localhost:3000
node app.js