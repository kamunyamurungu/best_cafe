Param(
  [string]$Port = $env:PORT,
  [string]$ServerHost = $env:HOST
)

Write-Host "Starting PM2 deployment..." -ForegroundColor Cyan

# Ensure we run from repo root
Push-Location (Split-Path -Parent $MyInvocation.MyCommand.Path)
Push-Location ..

# Optional: set env overrides
if ($Port) { $env:PORT = $Port }
if ($ServerHost) { $env:HOST = $ServerHost }

Write-Host "Installing dependencies (npm ci)..." -ForegroundColor Yellow
if (Test-Path package-lock.json) {
  npm ci
} else {
  npm install
}
if ($LASTEXITCODE -ne 0) { Write-Error "npm install failed"; Exit 1 }

Write-Host "Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate --schema prisma/schema.prisma
if ($LASTEXITCODE -ne 0) { Write-Error "Prisma generate failed"; Exit 1 }

Write-Host "Applying Prisma migrations..." -ForegroundColor Yellow
npx prisma migrate deploy --schema prisma/schema.prisma
if ($LASTEXITCODE -ne 0) { Write-Error "Prisma migrate deploy failed"; Exit 1 }

Write-Host "Building NestJS app..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build failed"; Exit 1 }

if (-not (Test-Path "dist/src/main.js")) {
  Write-Error "dist/src/main.js not found after build"
  Exit 1
}

Write-Host "Starting/reloading PM2 process 'cyber-backend'..." -ForegroundColor Yellow
try {
  # Ensure PM2 is available
  if (-not (Get-Command pm2 -ErrorAction SilentlyContinue)) {
    throw "PM2 is not installed or not on PATH"
  }

  # Start using ecosystem (creates process if missing) and update env
  pm2 start ecosystem.config.js --only cyber-backend --update-env
  if ($LASTEXITCODE -ne 0) { throw "pm2 start failed" }

  pm2 reload cyber-backend
  if ($LASTEXITCODE -ne 0) { throw "pm2 reload failed" }

  pm2 save

  Write-Host "PM2 status:" -ForegroundColor Cyan
  pm2 status

  Write-Host "Recent logs for cyber-backend (streaming)..." -ForegroundColor Cyan
  pm2 logs cyber-backend --lines 50
}
catch {
  Write-Warning "PM2 unavailable or failed - starting app directly with Node as fallback."
  if ($null -ne $_) { Write-Host ("PM2 error: {0}" -f ($_.Exception.Message)) -ForegroundColor Yellow }
  $logDir = Join-Path (Get-Location) "logs"
  if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
  $stdout = Join-Path $logDir "cyber-backend.node.out.log"
  $stderr = Join-Path $logDir "cyber-backend.node.err.log"
  $args = "dist/src/main.js"
  $proc = Start-Process -FilePath "node" -ArgumentList $args -PassThru -RedirectStandardOutput $stdout -RedirectStandardError $stderr -WindowStyle Hidden
  if ($null -eq $proc) { Write-Error "Failed to start Node fallback process"; Exit 1 }
  Write-Host ("Node fallback started (PID {0})." -f $proc.Id) -ForegroundColor Green
  Write-Host ("Stdout: {0}" -f $stdout) -ForegroundColor Green
  Write-Host ("Stderr: {0}" -f $stderr) -ForegroundColor Green
}

Pop-Location
Pop-Location
Write-Host "Deployment complete." -ForegroundColor Green