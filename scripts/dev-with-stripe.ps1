param(
  [ValidateRange(1, 65535)]
  [int]$Port = 3000
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectRoot

$listenerPattern = '^\s*TCP\s+\S+:' + $Port + '\s+.*LISTENING\s+\d+\s*$'
if (netstat -ano | Select-String -Pattern $listenerPattern) {
  throw "Le port $Port est déjà utilisé. Arrête l'ancien serveur local avant de lancer npm run dev:stripe."
}

$stripeCommand = Get-Command stripe.exe -ErrorAction SilentlyContinue
if (-not $stripeCommand) {
  throw 'Stripe CLI est introuvable. Installe-le puis exécute stripe login une seule fois.'
}

$secretOutput = & $stripeCommand.Source listen --print-secret 2>&1
if ($LASTEXITCODE -ne 0) {
  throw "Stripe CLI n'est pas connecté. Exécute stripe login une seule fois, puis relance npm run dev:stripe."
}

$secretMatch = [regex]::Match(($secretOutput -join "`n"), 'whsec_[A-Za-z0-9]+')
if (-not $secretMatch.Success) {
  throw 'Stripe CLI n’a pas fourni de secret webhook local.'
}

# Cette variable de processus remplace proprement celle de .env.local pour
# le serveur Next lancé ci-dessous, sans écrire ni afficher le secret.
$env:STRIPE_WEBHOOK_SECRET = $secretMatch.Value
$env:PORT = [string]$Port

$temporaryDirectory = Join-Path ([IO.Path]::GetTempPath()) "permishub-stripe-$PID"
New-Item -ItemType Directory -Path $temporaryDirectory -Force | Out-Null
$stdoutPath = Join-Path $temporaryDirectory 'stripe-listen.stdout.log'
$stderrPath = Join-Path $temporaryDirectory 'stripe-listen.stderr.log'

$stripeListener = Start-Process `
  -FilePath $stripeCommand.Source `
  -ArgumentList @(
    'listen',
    '--forward-to', "http://localhost:$Port/api/webhooks/stripe",
    '--events', 'checkout.session.completed,checkout.session.async_payment_succeeded'
  ) `
  -RedirectStandardOutput $stdoutPath `
  -RedirectStandardError $stderrPath `
  -WindowStyle Hidden `
  -PassThru

try {
  Start-Sleep -Seconds 2
  if ($stripeListener.HasExited) {
    $details = @(
      Get-Content -LiteralPath $stdoutPath -ErrorAction SilentlyContinue
      Get-Content -LiteralPath $stderrPath -ErrorAction SilentlyContinue
    ) -join ' '
    $safeDetails = $details -replace 'whsec_[A-Za-z0-9]+', '[SECRET MASQUÉ]'
    throw "Le relais webhook Stripe n'a pas démarré. $safeDetails"
  }

  Write-Host "Stripe local prêt : Checkout test + webhook vers localhost:$Port."
  Write-Host 'Laisse ce terminal ouvert pendant tes tests. Ctrl+C arrête les deux services.'
  & npm.cmd run dev:next
  if ($LASTEXITCODE -ne 0) {
    throw "Le serveur Next.js s'est arrêté avec le code $LASTEXITCODE."
  }
} finally {
  if ($stripeListener -and -not $stripeListener.HasExited) {
    Stop-Process -Id $stripeListener.Id -Force -ErrorAction SilentlyContinue
  }
  Remove-Item -LiteralPath $temporaryDirectory -Recurse -Force -ErrorAction SilentlyContinue
}
