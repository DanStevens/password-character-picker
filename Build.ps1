$CallerVerbosePreference = $VerbosePreference
$VerbosePreference = "continue"
$CallerLocation = Get-Location

Write-Verbose "Setting location to $PSScriptRoot\src"
Set-Location "$PSScriptRoot\src"

#..\Assert-JQueryHashIsValid.ps1
..\Assert-JavascriptCodeIsValid.ps1

Write-Verbose "Using data/widget48.png as add-on icon"
Copy-Item data/widget48.png icon.png -Verbose

Write-Verbose "Converting ../package.yaml to package.json"
yaml2json -p -s package.yaml

Write-Verbose "Compiling XPI"
jpm -v xpi

Write-Verbose "Setting location back to $CallerLocation"
Set-Location $CallerLocation
$CallerVerbosePreference = $VerbosePreference