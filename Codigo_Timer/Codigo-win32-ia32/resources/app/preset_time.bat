@echo off

rem Timer for elapsed time and log user out

for /f "delims=" %%a in (extract.txt) do (
set /a remainingTime = %%a
)
set /a timer = %remainingTime%
:start
timeout /t 1 /nobreak
set /a remainingTime = %remainingTime% - 1
@echo %remainingTime% > preset_time.txt
if %remainingTime% == 0 goto end
cls
goto start
:end
logoff