$CallerVerbosePreference = $VerbosePreference
$VerbosePreference = "continue"
$CallerLocation = Get-Location

Write-Verbose "Setting location to $PSScriptRoot\src"
Set-Location "$PSScriptRoot\src"

Write-Verbose "Checking syntax of Javascript using jslint"
$jslintEdition = "es5"
jslint --edition=$jslintEdition data/panel/page.js
jslint --edition=$jslintEdition lib/main.js

Write-Verbose "Setting location back to $CallerLocation"
Set-Location $CallerLocation
$CallerVerbosePreference = $VerbosePreference