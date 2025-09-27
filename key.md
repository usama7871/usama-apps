536756-081411-057497-618508-436249-025135-386133-430562


(Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Try the new cross-platform PowerShell https://aka.ms/pscore6

PS C:\Windows\system32> defrag C: /L

Invoking retrim on (C:)...


The operation completed successfully.

Post Defragmentation Report:

        Volume Information:
                Volume size                 = 140.16 GB
                Free space                  = 31.48 GB

        Retrim:
                Total space trimmed         = 34.95 GB
PS C:\Windows\system32>
PS C:\Windows\system32>
PS C:\Windows\system32>
PS C:\Windows\system32> Get-Volume | Select DriveLetter, @{Name="Size(GB)";Expression={[math]::Round($_.Size/1GB,2)}}, @{Name="Free(GB)";Expression={[math]::Round($_.SizeRemaining/1GB,2)}}

DriveLetter Size(GB) Free(GB)
----------- -------- --------
                0.53     0.08
                0.09     0.07
F                  0        0
C             140.17    31.49
D              97.66    57.03


PS C:\Windows\system32>
PS C:\Windows\system32> Remove-Item -Path "C:\Windows\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
>> Remove-Item -Path "$env:LOCALAPPDATA\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
PS C:\Windows\system32>
PS C:\Windows\system32> pip cache purge
>> npm cache clean --force
WARNING: No matching packages
Files removed: 0
npm warn using --force Recommended protections disabled.
PS C:\Windows\system32> cleanmgr /sagerun:1
PS C:\Windows\system32> Move-Item -Path "C:\Users\AST\Projects" -Destination "D:\Projects" -ErrorAction SilentlyContinue
PS C:\Windows\system32> $action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -Command `"Remove-Item -Path 'C:\Windows\Temp\*' -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item -Path '$env:LOCALAPPDATA\Temp\*' -Recurse -Force -ErrorAction SilentlyContinue; cleanmgr /sagerun:1`""
>> $trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Sunday -At "12:00AM"
>> Register-ScheduledTask -TaskName "WeeklyCleanup" -Action $action -Trigger $trigger -Description "Weekly disk cleanup" -User "System" -RunLevel Highest

TaskPath                                       TaskName                          State
--------                                       --------                          -----
\                                              WeeklyCleanup                     Ready


PS C:\Windows\system32> Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\DataCollection" -Name "AllowTelemetry" -Value 0 -Force
PS C:\Windows\system32> netsh advfirewall set allprofiles state on
>> netsh advfirewall set allprofiles firewallpolicy blockinbound,allowoutbound
Ok.

Ok.

PS C:\Windows\system32> netsh interface ip set dns name="Wi-Fi" source=static address=1.1.1.1

PS C:\Windows\system32> netsh interface show interface

Admin State    State          Type             Interface Name
-------------------------------------------------------------------------
Enabled        Connected      Dedicated        Ethernet 2
Enabled        Connected      Dedicated        Ethernet 3
Enabled        Disconnected   Dedicated        Ethernet
Enabled        Connected      Dedicated        Wi-Fi
Enabled        Disconnected   Dedicated        vEthernet (PrimarySwitch)
Enabled        Connected      Dedicated        vEthernet (Default Switch)

PS C:\Windows\system32> Enable-BitLocker -MountPoint "C:" -EncryptionMethod XtsAes128 -UsedSpaceOnly -RecoveryPasswordProtector
>> Enable-BitLocker -MountPoint "D:" -EncryptionMethod XtsAes128 -UsedSpaceOnly -RecoveryPasswordProtector
>> Get-BitLockerVolume | Select MountPoint, EncryptionMethod, ProtectionStatus, RecoveryPassword
WARNING: ACTIONS REQUIRED:

1. Save this numerical recovery password in a secure location away from your computer:

536756-081411-057497-618508-436249-025135-386133-430562

To prevent data loss, save this password immediately. This password helps ensure that you can unlock the encrypted
volume.
2. Restart the computer to run a hardware test.
    (Type: get-help Restart-Computer for command line instructions.)


   ComputerName: DESKTOP-FSV0DR0

VolumeType      Mount CapacityGB VolumeStatus           Encryption KeyProtector              AutoUnlock Protection
                Point                                   Percentage                           Enabled    Status
----------      ----- ---------- ------------           ---------- ------------              ---------- ----------
OperatingSystem C:        140.17 FullyDecrypted         0          {Tpm, RecoveryPassword}              Off
WARNING: ACTIONS REQUIRED:

1. Save this numerical recovery password in a secure location away from your computer:

187308-473484-056826-303534-308055-654027-449559-085371

To prevent data loss, save this password immediately. This password helps ensure that you can unlock the encrypted
volume.
Data            D:         97.66 EncryptionInProgress   30         {RecoveryPassword}        False      Off

MountPoint       : C:
EncryptionMethod : XtsAes128
ProtectionStatus : Off
RecoveryPassword :


MountPoint       : D:
EncryptionMethod : XtsAes128
ProtectionStatus : Off
RecoveryPassword :



PS C:\Windows\system32> ^C)
