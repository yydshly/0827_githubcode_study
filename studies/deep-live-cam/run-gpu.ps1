$ErrorActionPreference = "Stop"

$studyRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$pythonExe = Join-Path $studyRoot ".venv\Scripts\python.exe"
$launcher = Join-Path $studyRoot "launch_gpu.py"

if (-not (Test-Path -LiteralPath $pythonExe)) {
    throw "Deep-Live-Cam virtual environment is missing: $pythonExe"
}

& $pythonExe $launcher @args
exit $LASTEXITCODE
