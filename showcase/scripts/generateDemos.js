#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const EXPERIMENTS_DIR = path.join(__dirname, '../..');
const DEMOS_DIR = path.join(__dirname, '../public/demos');
const SOURCES_DIR = path.join(__dirname, '../public/sources');
const DATA_DIR = path.join(__dirname, '../src/data');

// Ensure directories exist
if (!fs.existsSync(DEMOS_DIR)) {
  fs.mkdirSync(DEMOS_DIR, { recursive: true });
}
if (!fs.existsSync(SOURCES_DIR)) {
  fs.mkdirSync(SOURCES_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Read a file and return its content
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    return null;
  }
}

/**
 * Clean code by removing import/export statements for browser Babel
 */
function cleanCodeForBrowser(code) {
  if (!code) return '';
  
  return code
    // Remove import statements (including React, components, CSS)
    .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
    .replace(/import\s+['"].*?['"];?/g, '')
    // Remove export default identifier; (e.g., export default App;)
    .replace(/export\s+default\s+\w+;?/g, '')
    // Remove export default function/const/etc
    .replace(/export\s+default\s+/g, '')
    // Remove export statements, keep only the content
    .replace(/export\s+(function|const|let|var|class)\s+/g, '$1 ')
    // Remove any remaining export statements
    .replace(/export\s+{.*?};?/g, '')
    // Clean up multiple blank lines
    .replace(/\n\n\n+/g, '\n\n');
}

/**
 * Discover all experiment folders (exp1, exp2, exp3, etc.)
 */
function discoverExperiments() {
  const experiments = [];
  const contents = fs.readdirSync(EXPERIMENTS_DIR);
  
  // Find all exp{N} folders
  const expFolders = contents
    .filter(name => /^exp\d+$/.test(name) && fs.statSync(path.join(EXPERIMENTS_DIR, name)).isDirectory())
    .sort((a, b) => {
      const numA = parseInt(a.replace('exp', ''));
      const numB = parseInt(b.replace('exp', ''));
      return numA - numB;
    });
  
  // Process each experiment folder
  expFolders.forEach(folder => {
    const expNum = parseInt(folder.replace('exp', ''));
    const expPath = path.join(EXPERIMENTS_DIR, folder);
    const srcPath = path.join(expPath, 'src');
    const metadataPath = path.join(expPath, 'metadata.json');
    
    // Check if src folder exists
    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠️  Skipping ${folder}: no src folder found`);
      return;
    }
    
    // Try to read metadata.json, otherwise create default
    let metadata = {
      id: folder,
      number: expNum,
      title: `Experiment ${expNum}`,
      description: 'React lab experiment',
      concepts: []
    };
    
    if (fs.existsSync(metadataPath)) {
      try {
        const customMeta = JSON.parse(readFile(metadataPath));
        metadata = { ...metadata, ...customMeta };
      } catch (err) {
        console.warn(`⚠️  Could not parse metadata.json in ${folder}`);
      }
    }
    
    // Get sourceFiles from src folder
    const sourceFiles = [];
    const files = fs.readdirSync(srcPath);
    
    files.forEach(file => {
      if ((file.endsWith('.js') || file.endsWith('.css')) && 
          !file.includes('test') && 
          !file.includes('setupTests') && 
          !file.includes('reportWebVitals') &&
          !file.includes('index.')) {
        sourceFiles.push({
          filename: file,
          path: `${folder}/${file}`,
          type: file.endsWith('.css') ? 'style' : 'component'
        });
      }
    });
    
    // Sort files: App.js first, then others
    sourceFiles.sort((a, b) => {
      if (a.filename === 'App.js') return -1;
      if (b.filename === 'App.js') return 1;
      return a.filename.localeCompare(b.filename);
    });
    
    metadata.sourceFiles = sourceFiles;
    experiments.push(metadata);
  });
  
  return experiments;
}

/**
 * Generate experiments.json dynamically
 */
function generateExperimentsJSON(experiments) {
  const outputPath = path.join(DATA_DIR, 'experiments.json');
  fs.writeFileSync(outputPath, JSON.stringify(experiments, null, 2), 'utf-8');
  console.log(`✓ Generated experiments.json with ${experiments.length} experiments`);
}

/**
 * Copy source files to public folder for code viewer
 */
function copySourcesToPublic(expFolder) {
  const srcDir = path.join(EXPERIMENTS_DIR, expFolder, 'src');
  const destDir = path.join(SOURCES_DIR, expFolder);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  let copiedCount = 0;

  files.forEach(file => {
    if ((file.endsWith('.js') || file.endsWith('.css')) && 
        !file.includes('test') && 
        !file.includes('setupTests') && 
        !file.includes('reportWebVitals') &&
        !file.includes('index.')) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);
      fs.copyFileSync(srcPath, destPath);
      copiedCount++;
    }
  });
  
  if (copiedCount > 0) {
    console.log(`  Copied: ${expFolder}/ (${copiedCount} files)`);
  }
}

/**
 * Generate demo HTML for a specific experiment
 */
function generateDemoHTML(expFolder, expId, experiment) {
  const srcDir = path.join(EXPERIMENTS_DIR, expFolder, 'src');

  // Read App.js
  const appJsPath = path.join(srcDir, 'App.js');
  let appJsContent = readFile(appJsPath);
  appJsContent = cleanCodeForBrowser(appJsContent);

  // Read App.css
  const appCssPath = path.join(srcDir, 'App.css');
  const appCssContent = readFile(appCssPath);

  // Read component files dynamically
  let componentsCode = '';
  
  // Look for any .js files that aren't App.js
  const files = fs.readdirSync(srcDir);
  const componentFiles = files.filter(f => 
    f.endsWith('.js') && 
    f !== 'App.js' && 
    !f.includes('test') &&
    !f.includes('index') &&
    !f.includes('setupTests') &&
    !f.includes('reportWebVitals')
  );
  
  componentFiles.forEach(componentFile => {
    let componentContent = readFile(path.join(srcDir, componentFile)) || '';
    componentContent = cleanCodeForBrowser(componentContent);
    const componentName = componentFile.replace('.js', '');
    componentsCode += `\n// ${componentName} Component\n${componentContent}\n`;
  });

  // Create the HTML template
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${experiment.title} - Live Demo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #ffffff;
            color: #333;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #root {
            width: 100%;
            max-width: 100%;
        }
        
        ${appCssContent || ''}
    </style>
</head>
<body>
    <div id="root"></div>
    
    <script crossorigin src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone@7.23.5/babel.min.js"></script>
    
    <script type="text/babel">
        console.log('%c=== ${experiment.title} Demo Starting ===', 'color: green; font-size: 14px; font-weight: bold');
        
        // Simple synchronous React initialization
        setTimeout(() => {
            try {
                console.log('Checking React availability...');
                console.log('window.React:', typeof window.React);
                console.log('window.ReactDOM:', typeof window.ReactDOM);
                
                if (!window.React) {
                    throw new Error('React not loaded');
                }
                if (!window.ReactDOM) {
                    throw new Error('ReactDOM not loaded');
                }
                if (!window.React.createElement) {
                    throw new Error('React.createElement not available');
                }
                
                const React = window.React;
                const ReactDOM = window.ReactDOM;
                const { useState, useEffect, useReducer, useContext, useRef, useCallback, useMemo } = React;
                
                console.log('✓ React loaded successfully');
                console.log('Defining components...');
                
                ${componentsCode}
                ${appJsContent || ''}
                
                console.log('✓ Components defined');
                console.log('Rendering to DOM...');
                
                const rootElement = document.getElementById('root');
                if (!rootElement) {
                    throw new Error('Root element not found');
                }
                
                try {
                    // Try React 18 API first
                    const root = ReactDOM.createRoot(rootElement);
                    root.render(React.createElement(App));
                } catch (e) {
                    // Fallback to React 16/17 API
                    console.log('Using legacy render method...');
                    ReactDOM.render(React.createElement(App), rootElement);
                }
                
                console.log('✓ App rendered successfully');
            } catch (error) {
                console.error('DEMO ERROR:', error);
                const root = document.getElementById('root');
                if (root) {
                    root.innerHTML = '<div style="color: red; padding: 30px; font-family: monospace; font-size: 14px; line-height: 1.5;"><h2>Error:</h2><pre>' + (error.stack || error.message) + '</pre></div>';
                }
            }
        }, 500); // Give React 500ms to load
    </script>
</body>
</html>`;

  // Write the HTML file
  const outputPath = path.join(DEMOS_DIR, `${expId}.html`);
  fs.writeFileSync(outputPath, htmlContent, 'utf-8');
  console.log(`  ✓ Generated ${expId}.html`);
}

// Main build process
console.log('🚀 Building React Lab Showcase...\n');

try {
  console.log('1️⃣  Discovering experiments...\n');
  const experiments = discoverExperiments();
  
  if (experiments.length === 0) {
    console.error('❌ No experiments found! Make sure you have exp1/, exp2/, etc. folders.');
    process.exit(1);
  }
  
  console.log(`✓ Found ${experiments.length} experiment(s): ${experiments.map(e => e.id).join(', ')}\n`);

  console.log('2️⃣  Generating experiments.json...\n');
  generateExperimentsJSON(experiments);

  console.log('\n3️⃣  Copying source files to public/sources/\n');
  experiments.forEach(exp => {
    copySourcesToPublic(exp.id);
  });

  console.log('\n4️⃣  Generating demo HTML files\n');
  experiments.forEach(exp => {
    generateDemoHTML(exp.id, exp.id, exp);
  });

  console.log('\n✅ Build complete!');
  console.log(`📊 Experiments: ${experiments.length}`);
  console.log(`📁 Sources: ${SOURCES_DIR}`);
  console.log(`📁 Demos: ${DEMOS_DIR}`);
  console.log(`📄 Config: ${path.join(DATA_DIR, 'experiments.json')}\n`);
  console.log('💡 To add a new experiment:');
  console.log('   1. Create exp6/ folder with src/ subfolder');
  console.log('   2. Add App.js and App.css in src/');
  console.log('   3. (Optional) Create metadata.json with title, description, concepts');
  console.log('   4. Run: npm run build-demos\n');
  
} catch (error) {
  console.error('❌ Error building demos:', error);
  process.exit(1);
}
