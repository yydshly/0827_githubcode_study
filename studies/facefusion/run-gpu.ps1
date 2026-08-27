param(
	[Parameter(ValueFromRemainingArguments = $true)]
	[string[]] $FaceFusionArguments
)

$python = Join-Path $PSScriptRoot ".venv\Scripts\python.exe"
$launcher = Join-Path $PSScriptRoot "launch_gpu.py"

& $python $launcher @FaceFusionArguments
exit $LASTEXITCODE
