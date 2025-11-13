#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  console.log('Running build...');
  execSync('npm run build', { stdio: 'inherit' });

  const buildIndex = path.join(__dirname, '..', 'build', 'index.html');
  const targetIndex = path.join(__dirname, '..', 'index.html');
  console.log('Copying', buildIndex, '->', targetIndex);
  copyRecursive(buildIndex, targetIndex);

  const buildAssets = path.join(__dirname, '..', 'build', 'assets');
  const targetAssets = path.join(__dirname, '..', 'assets');
  console.log('Copying assets', buildAssets, '->', targetAssets);
  copyRecursive(buildAssets, targetAssets);

  console.log('Staging files...');
  execSync('git add index.html assets', { stdio: 'inherit' });

  try {
    execSync('git commit -m "Deploy production build to root"', { stdio: 'inherit' });
  } catch (e) {
    console.log('Nothing to commit or commit failed (maybe no changes). Continuing...');
  }

  console.log('Pushing to origin...');
  execSync('git push', { stdio: 'inherit' });

  console.log('Deployment complete.');
} catch (err) {
  console.error('Deploy failed:', err.message || err);
  process.exit(1);
}
