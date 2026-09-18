@echo off
cd /d "%~dp0"
where python >nul 2>nul && (python serve.py & goto :end)
where py >nul 2>nul && (py serve.py & goto :end)
echo Python was not found. Install it from https://www.python.org/downloads/
echo (tick "Add python.exe to PATH" during install), then run this file again.
pause
:end
