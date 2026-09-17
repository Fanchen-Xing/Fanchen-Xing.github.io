$ErrorActionPreference='Stop'
$siteUrl='http://127.0.0.1:4174'
$running=$false
try { $check=Invoke-WebRequest -Uri "$siteUrl/__site_health" -UseBasicParsing -TimeoutSec 2; if($check.Content -eq 'fanchen-portfolio'){$running=$true}else{throw 'Port 4174 is occupied by another application.'} } catch { if($_.Exception.Message -like '*occupied*'){throw} }
if(-not $running){
 $nodeCommand=Get-Command node.exe -ErrorAction SilentlyContinue
 $nodePath=if($nodeCommand){$nodeCommand.Source}else{Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'}
 if(-not(Test-Path -LiteralPath $nodePath)){throw 'Node.js was not found. Install Node.js and try again.'}
 $serverPath=Join-Path $PSScriptRoot 'serve.mjs'
 Start-Process -FilePath $nodePath -ArgumentList ('"'+$serverPath+'"') -WorkingDirectory $PSScriptRoot -WindowStyle Hidden
 for($attempt=0;$attempt -lt 20;$attempt++){try{$check=Invoke-WebRequest -Uri "$siteUrl/__site_health" -UseBasicParsing -TimeoutSec 1;if($check.Content -eq 'fanchen-portfolio'){$running=$true;break}}catch{};Start-Sleep -Milliseconds 250}
 if(-not $running){throw 'The local site server could not start. Check port 4174.'}
}
Start-Process $siteUrl
