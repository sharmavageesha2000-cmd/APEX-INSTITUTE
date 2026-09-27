@echo off
title Apex Tech Institute Website
echo ======================================================================
echo                  APEX TECH INSTITUTE WEB SERVER
echo ======================================================================
echo.
echo [1/3] Navigating to website directory...
cd /d "%~dp0"

echo [2/4] Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

echo [3/4] Starting ChromaDB Vector Database Service...
start /B python scripts/chroma_service.py >nul 2>&1

echo [4/4] Launching Next.js development server...
echo.
echo Opening browser at http://localhost:3000 ...
timeout /t 2 /nobreak >nul
start http://localhost:3000

echo.
echo Server running at http://localhost:3000
echo Admin Portal at http://localhost:3000/admin/login
echo ChromaDB Vector RAG running at http://127.0.0.1:8008
echo.
echo Press Ctrl + C in this terminal window anytime to stop the server.
echo ======================================================================
echo.
npm run dev
pause
