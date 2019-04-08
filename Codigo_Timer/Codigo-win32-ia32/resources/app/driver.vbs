Set WshShell = CreateObject("Wscript.Shell")
Set WshShell1 = CreateObject("Wscript.Shell")
Set WshShell2 = CreateObject("WScript.Shell")

WshShell.Run chr(34) & "startTime.bat", 0
WshShell1.Run chr(34) & "Codigo.bat", 0
WshShell2.Run chr(34) & "preset_time.bat", 0 



Set WshShell = Nothing
Set WshShell1 = Nothing
Set WshShell2 = Nothing