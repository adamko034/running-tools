const { execSync } = require('child_process');
const fs = require('fs');

// Read current version
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = packageJson.version;

console.log(`Build successful! Pushing version ${version} to repository...`);

try {
  // Check if we have any commits to push
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  
  // Check if the version commit exists
  const logOutput = execSync('git log --oneline -1', { encoding: 'utf8' });
  
  if (logOutput.includes(`Bump version to ${version}`)) {
    // Push the version commit
    execSync('git push', { stdio: 'inherit' });
    console.log(`✅ Successfully pushed version ${version} to repository`);
    
    // Optionally create and push a tag
    try {
      execSync(`git tag v${version}`, { stdio: 'inherit' });
      execSync('git push --tags', { stdio: 'inherit' });
      console.log(`✅ Created and pushed tag v${version}`);
    } catch (tagError) {
      console.log(`ℹ️  Tag v${version} might already exist or couldn't be created`);
    }
  } else {
    console.log('ℹ️  No version commit found to push');
  }
} catch (error) {
  console.log('⚠️  Could not push to repository. This might be normal if:');
  console.log('   - No remote repository is configured');
  console.log('   - No authentication is set up');
  console.log('   - Repository is up to date');
  console.log('   - Working in a detached HEAD state');
  console.log('\n💡 You can manually push with: git push');
}

console.log('🎉 Production build completed successfully!');