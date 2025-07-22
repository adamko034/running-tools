const fs = require('fs');
const path = require('path');

// Read version from package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = packageJson.version;

console.log(`Setting version to ${version}`);

// Update environment.ts
const envPath = path.join('src', 'environments', 'environment.ts');
const envContent = `export const environment = {
  production: false,
  version: '${version}'
};
`;

fs.writeFileSync(envPath, envContent);
console.log(`Updated ${envPath}`);

// Update environment.prod.ts
const envProdPath = path.join('src', 'environments', 'environment.prod.ts');
const envProdContent = `export const environment = {
  production: true,
  version: '${version}'
};
`;

fs.writeFileSync(envProdPath, envProdContent);
console.log(`Updated ${envProdPath}`);

console.log('Version sync completed successfully!');