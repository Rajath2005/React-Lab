# Auto-push Script for React Lab
# Watches for file changes and automatically commits/pushes to GitHub
# 
# Usage: .\auto-push.ps1

$WATCH_DIRS = @('exp1', 'exp2', 'exp3', 'exp4', 'exp5', 'exp6', 'exp7', 'exp8', 'showcase')
$IGNORE_PATTERNS = @('node_modules', '.git', '.next', 'dist', 'build', '.env.local', '.env', '.DS_Store', 'package-lock.json')
$COMMIT_DELAY_MS = 3000

$lastChangeTime = [DateTime]::MinValue
$changeDetected = $false
$fileSystemWatcher = $null

function ShouldIgnore($filePath) {
    foreach ($pattern in $IGNORE_PATTERNS) {
        if ($filePath -like "*$pattern*") {
            return $true
        }
    }
    return $false
}

function GetChangedFiles() {
    try {
        $output = & git status --short
        return @($output | Where-Object { $_.Length -gt 0 })
    } catch {
        return @()
    }
}

function Commit() {
    try {
        $changes = GetChangedFiles
        if ($changes.Count -eq 0) {
            Write-Host "✓ No changes to commit" -ForegroundColor Green
            $script:changeDetected = $false
            return
        }

        Write-Host "`n📝 Changes detected:" -ForegroundColor Yellow
        $changes | ForEach-Object { Write-Host "  $_" }

        # Stage all changes
        & git add -A
        Write-Host "✓ Staged changes" -ForegroundColor Green

        # Create commit message with timestamp
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $message = "Auto-commit: $timestamp"
        
        & git commit -m $message
        Write-Host "✓ Committed: `"$message`"" -ForegroundColor Green

        # Push to GitHub
        & git push
        Write-Host "✓ Pushed to GitHub`n" -ForegroundColor Green

        $script:changeDetected = $false
    } catch {
        Write-Host "❌ Error during commit/push: $_" -ForegroundColor Red
    }
}

function OnFileChanged() {
    if ($script:changeDetected -eq $false) {
        Write-Host "`n🔍 Change detected - will commit in 3 seconds..." -ForegroundColor Cyan
        $script:changeDetected = $true
    }
    
    $script:lastChangeTime = [DateTime]::Now
}

Write-Host "🚀 Auto-push enabled!`n" -ForegroundColor Green
Write-Host "Watching directories:" -ForegroundColor Cyan
$WATCH_DIRS | ForEach-Object { Write-Host "  👁️  $_" }

Write-Host "`n⏸️  Press Ctrl+C to stop watching`n" -ForegroundColor Yellow

# Set up watchers for each directory
$watchers = @()
foreach ($dir in $WATCH_DIRS) {
    $fullPath = Join-Path (Get-Location) $dir
    if (Test-Path $fullPath) {
        $watcher = New-Object System.IO.FileSystemWatcher
        $watcher.Path = $fullPath
        $watcher.IncludeSubdirectories = $true
        $watcher.EnableRaisingEvents = $true
        $watcher.NotifyFilter = [System.IO.NotifyFilters]::FileName -bor [System.IO.NotifyFilters]::LastWrite

        Register-ObjectEvent -InputObject $watcher -EventName "Changed" -Action {
            $file = $event.SourceEventArgs.FullPath
            if (-not (ShouldIgnore $file)) {
                OnFileChanged
            }
        } | Out-Null

        Register-ObjectEvent -InputObject $watcher -EventName "Created" -Action {
            $file = $event.SourceEventArgs.FullPath
            if (-not (ShouldIgnore $file)) {
                OnFileChanged
            }
        } | Out-Null

        $watchers += $watcher
    }
}

# Monitor for changes and auto-commit
while ($true) {
    if ($changeDetected -and ([DateTime]::Now - $lastChangeTime).TotalMilliseconds -ge $COMMIT_DELAY_MS) {
        Commit
    }
    Start-Sleep -Milliseconds 500
}
