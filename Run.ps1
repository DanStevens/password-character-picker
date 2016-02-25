$CallerVerbosePreference = $VerbosePreference
$VerbosePreference = "continue"
$CallerLocation = Get-Location

Write-Verbose "Setting location to $PSScriptRoot\src"
Set-Location "$PSScriptRoot\src"

#..\Assert-JavascriptCodeIsValid.ps1

jpm run

Write-Verbose "Setting location back to $CallerLocation"
Set-Location $CallerLocation
$CallerVerbosePreference = $VerbosePreference