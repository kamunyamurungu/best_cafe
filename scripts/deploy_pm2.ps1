Param(
  [string]$Port = $env:PORT,
  [string]$Host = $env:HOST
)

Write-Host "Starting PM2 deployment..." -ForegroundColor Cyan

# Ensure we run from repo root
Push-Location (Split-Path -Parent $MyInvocation.MyCommand.Path)
Push-Location ..

# Optional: set env overrides
if ($Port) { $env:PORT = $Port }
if ($Host) { $env:HOST = $Host }

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
# Start using ecosystem (creates process if missing) and update env
pm2 start ecosystem.config.js --only cyber-backend --update-env
if ($LASTEXITCODE -ne 0) { Write-Error "pm2 start failed"; Exit 1 }

pm2 reload cyber-backend
if ($LASTEXITCODE -ne 0) { Write-Error "pm2 reload failed"; Exit 1 }

pm2 save

Write-Host "PM2 status:" -ForegroundColor Cyan
pm2 status

Write-Host "Recent logs for cyber-backend:" -ForegroundColor Cyan
pm2 logs cyber-backend --lines 50

Pop-Location
Pop-Location
Write-Host "Deployment complete." -ForegroundColor Green