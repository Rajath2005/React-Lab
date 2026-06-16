const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const REPO_ROOT = path.join(__dirname, '..');
const TEMPLATES_DIR = path.join(REPO_ROOT, 'templates');
const REGISTRY_FILE = path.join(TEMPLATES_DIR, 'registry.json');
const GITHUB_REPO = 'Rajath2005/React-Lab'; // User provided this

const IGNORED_FOLDERS = ['node_modules', 'dist', 'build', '.git', '.github', '.vscode'];

// Ensure templates directory exists
if (!fs.existsSync(TEMPLATES_DIR)) {
  fs.mkdirSync(TEMPLATES_DIR, { recursive: true });
}

// Read the experiments from showcase data if available, or just scan directories
let experimentsMeta = [];
try {
  const showcaseConfigPath = path.join(REPO_ROOT, 'showcase', 'src', 'data', 'experiments.json');
  if (fs.existsSync(showcaseConfigPath)) {
    experimentsMeta = JSON.parse(fs.readFileSync(showcaseConfigPath, 'utf8'));
  }
} catch (error) {
  console.log('Could not read experiments.json, will use default fallback.', error.message);
}

// Function to recursively add files to zip, ignoring specific directories
function addFolderToZip(zip, folderPath, zipBasePath) {
  const items = fs.readdirSync(folderPath);

  for (const item of items) {
    // Skip ignored folders
    if (IGNORED_FOLDERS.includes(item)) {
      continue;
    }

    const fullPath = path.join(folderPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      addFolderToZip(zip, fullPath, path.join(zipBasePath, item));
    } else {
      zip.addLocalFile(fullPath, zipBasePath);
    }
  }
}

async function exportLabs() {
  console.log('🚀 Starting React Lab Template Export...');
  const registry = {};

  // Scan root directory for exp folders
  const items = fs.readdirSync(REPO_ROOT);
  const labFolders = items.filter(item => {
    return item.startsWith('exp') && fs.statSync(path.join(REPO_ROOT, item)).isDirectory();
  });

  if (labFolders.length === 0) {
    console.log('No lab folders found.');
    return;
  }

  for (const labFolder of labFolders) {
    const labPath = path.join(REPO_ROOT, labFolder);
    const packageJsonPath = path.join(labPath, 'package.json');

    // Basic validation: ensure it's a React project with package.json
    if (!fs.existsSync(packageJsonPath)) {
      console.log(`⚠️  Skipping ${labFolder}: No package.json found.`);
      continue;
    }

    console.log(`📦 Exporting ${labFolder}...`);

    // Create a new zip
    const zip = new AdmZip();
    addFolderToZip(zip, labPath, '');

    // Write zip to templates folder
    const zipFilename = `${labFolder}.zip`;
    const zipFilePath = path.join(TEMPLATES_DIR, zipFilename);
    zip.writeZip(zipFilePath);

    // Try to find metadata from experiments.json
    const meta = experimentsMeta.find(e => e.id === labFolder) || {};
    
    // In GitHub Actions, we upload the files as Release assets.
    // The download URL format for a release asset:
    // https://github.com/Rajath2005/React-Lab/releases/latest/download/exp1.zip
    const downloadUrl = `https://github.com/${GITHUB_REPO}/releases/latest/download/${zipFilename}`;

    // Add to registry
    registry[labFolder] = {
      name: meta.title || `Experiment ${labFolder.replace('exp', '')}`,
      description: meta.description || `React Lab Template for ${labFolder}`,
      version: '1.0.0',
      downloadUrl: downloadUrl
    };

    console.log(`✅ Created ${zipFilename}`);
  }

  // Write registry.json
  fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2));
  console.log(`\n✅ Export complete! Generated ${Object.keys(registry).length} templates.`);
  console.log(`📄 Registry saved to ${REGISTRY_FILE}`);
}

exportLabs().catch(console.error);
