#!/usr/bin/env node

/**
 * Auto-commit and push script for React Lab
 * Watches for file changes and automatically commits/pushes to GitHub
 * 
 * Usage: node auto-push.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const WATCH_DIRS = ['exp1', 'exp2', 'exp3', 'exp4', 'exp5', 'exp6', 'exp7', 'exp8', 'showcase'];
const IGNORE_PATTERNS = ['node_modules', '.git', '.next', 'dist', 'build', '.env', '.DS_Store'];
const COMMIT_DELAY = 3000; // Wait 3 seconds after last change before committing

let changeTimeout;
let changeDetected = false;

function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function getChangedFiles() {
  try {
    const output = execSync('git status --short', { encoding: 'utf-8' });
    return output.trim().split('\n').filter(line => line.length > 0);
  } catch (error) {
    return [];
  }
}

function commit() {
  try {
    const changes = getChangedFiles();
    if (changes.length === 0) {
      console.log('✓ No changes to commit');
      changeDetected = false;
      return;
    }

    console.log('\n📝 Changes detected:');
    changes.forEach(change => console.log('  ' + change));

    // Stage all changes
    execSync('git add -A', { encoding: 'utf-8' });
    console.log('✓ Staged changes');

    // Create commit message with timestamp
    const timestamp = new Date().toLocaleString();
    const message = `Auto-commit: ${timestamp}`;
    
    execSync(`git commit -m "${message}"`, { encoding: 'utf-8' });
    console.log(`✓ Committed: "${message}"`);

    // Push to GitHub
    execSync('git push', { encoding: 'utf-8' });
    console.log('✓ Pushed to GitHub\n');

    changeDetected = false;
  } catch (error) {
    console.error('❌ Error during commit/push:', error.message);
  }
}

function watchDirectory(dir) {
  const fullPath = path.join(process.cwd(), dir);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    return;
  }

  fs.watch(fullPath, { recursive: true }, (eventType, filename) => {
    if (filename && !shouldIgnore(filename)) {
      if (!changeDetected) {
        console.log(`\n🔍 Change detected in ${dir}/${filename}`);
        changeDetected = true;
      }

      // Clear previous timeout and set new one
      if (changeTimeout) {
        clearTimeout(changeTimeout);
      }
      
      changeTimeout = setTimeout(() => {
        commit();
      }, COMMIT_DELAY);
    }
  });

  console.log(`👁️  Watching: ${dir}`);
}

console.log('🚀 Auto-push enabled!\n');
console.log('Watching directories:');
WATCH_DIRS.forEach(dir => watchDirectory(dir));

console.log('\n⏸️  Press Ctrl+C to stop watching\n');

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Auto-push stopped');
  process.exit(0);
});
