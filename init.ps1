
$ChocoInstalled = $false
if (Get-Command choco.exe -ErrorAction SilentlyContinue) {
    $ChocoInstalled = $true
    Write-Output "Chocolatey installed"
    Write-Output ""
} else {
    Write-Output "Chocolatey installation not found"
    Write-Output 'You install it at "https://chocolatey.org/install"'
}

$PostgresInstalled = $false
if (Get-Command postgres.exe -ErrorAction SilentlyContinue){
    $PostgresInstalled = $true
    Write-Output "Postgres installed"
} else {
    Write-Output "Postgress installation not found"
    Write-Output 'you can install it by using "choco install postgresql"'
    Write-Output "try running this script again after it completes"
}


if (("true" -eq $PostgresInstalled) -and ("true" -eq $ChocoInstalled)) {

    $workingDir1 = ".\bakkari"
    $workingDir2 = ".\ts_info"

    # Start the first process
    Start-Process -FilePath "C:\Program Files\nodejs\node.exe" -ArgumentList "index.js" -WorkingDirectory $workingDir1 -NoNewWindow

    # Start the second process
    Start-Process -FilePath "pnpm" -ArgumentList "pnpm tauri dev" -WorkingDirectory $workingDir2 -NoNewWindow

} 


