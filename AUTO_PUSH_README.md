# Auto-Push Configuration

Automatically commit and push changes to GitHub as you make them.

## Quick Start

### Using Node.js (Recommended)
```bash
npm run auto-push
# or
node auto-push.js
```

### Using PowerShell (Windows)
```powershell
.\auto-push.ps1
```

## How It Works

The auto-push script:
1. ✅ Watches all experiment folders (exp1-exp8) and showcase folder
2. ✅ Detects file changes in real-time
3. ✅ Waits 3 seconds after the last change (to batch multiple edits)
4. ✅ Automatically stages all changes
5. ✅ Creates a commit with timestamp
6. ✅ Pushes to GitHub

## Features

- **Real-time Monitoring**: Detects changes instantly
- **Smart Batching**: Waits 3 seconds after last change to avoid excessive commits
- **Automatic Push**: Changes are pushed to GitHub immediately after commit
- **Ignore List**: Ignores `node_modules`, `.git`, `build`, etc. to avoid unnecessary commits
- **Graceful Shutdown**: Press `Ctrl+C` to stop

## Stop Auto-Push

Press `Ctrl+C` in the terminal running the script.

## Requirements

- Git installed and configured
- GitHub credentials configured (SSH key or personal access token)
- Node.js v12+ (for JavaScript version)

## Commit Message Format

Each auto-commit uses a timestamp:
```
Auto-commit: 2026-04-23 17:30:45
```

## Notes

- The script runs in the background and can be left running during development
- Each file change is batched within a 3-second window
- Only modified files are staged and committed
- Empty commits are skipped
