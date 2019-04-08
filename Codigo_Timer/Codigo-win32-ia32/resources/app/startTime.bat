@echo off
for /f "tokens=1,2,3 delims=:" %%a in (startTime.txt) do (
set /a chr = %%a
set /a cmin = %%b
set /a csec = %%c
)
set /a startSec = %chr% * 3600 + %cmin% * 60 + %csec%

if %startSec% == 0 @echo %time:~0,8% > startTime.txt
if not %startSec% == 0 forfiles /M preset_time.txt /C "cmd /c echo @ftime > lastUpdate.txt"

rem Incase of power failure find the last update

for /f "tokens=1,2,3 delims=:" %%a in (lastUpdate.txt) do (
set /a hr = %%a
set /a min = %%b
set /a sec = %%c
)
set /a finalSec = %hr%*3600 + %min%*60 + %sec%


rem Find the initial start time of the PC

for /f "tokens=1,2,3 delims=:" %%a in (startTime.txt) do (
set /a chr = %%a
set /a cmin = %%b
set /a csec = %%c
)
set /a startSec = %chr% * 3600 + %cmin% * 60 + %csec%

for /f "delims=" %%a in (extract.txt) do (
set /a temp = %%a
)

set /a remaingTime = %temp% - %finalSec% + %startSec% 

if not %finalSec% == 0 echo %remaingTime% > extract.txt
if not %finalSec% == 0 echo %time:~0,8% > startTime.txt