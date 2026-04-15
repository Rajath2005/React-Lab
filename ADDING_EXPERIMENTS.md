# 🚀 Adding New Experiments Dynamically

The React Lab Showcase now **automatically discovers and integrates new experiments** without any manual configuration!

## How It Works

When you run `npm run build-demos`, the script:
1. **Auto-discovers** all `exp{N}/` folders in the repo
2. **Reads metadata** from `metadata.json` in each experiment folder
3. **Generates** `experiments.json` dynamically
4. **Copies source files** to `/public/sources/`
5. **Generates demo HTML** files automatically

## Adding a New Experiment

### Step 1: Create the Experiment Folder
```bash
mkdir -p exp6/src
```

### Step 2: Add Your React App Files
Create `exp6/src/App.js`:
```javascript
import React, { useState } from 'react';
import './App.css';

function App() {
  // Your component logic here
  return (
    <div className="App">
      {/* Your JSX here */}
    </div>
  );
}

export default App;
```

Create `exp6/src/App.css`:
```css
.App {
  /* Your styles */
}
```

### Step 3: (Optional) Add Metadata
Create `exp6/metadata.json`:
```json
{
  "title": "My Awesome Experiment",
  "description": "A brief description of what this experiment demonstrates",
  "concepts": ["Concept1", "Concept2", "Concept3"]
}
```

If you don't create `metadata.json`, defaults will be used:
- **title**: "Experiment 6"
- **description**: "React lab experiment"
- **concepts**: []

### Step 4: (Optional) Add Supporting Components
You can add multiple component files in `exp6/src/`:
- `Header.js` - Header component
- `Footer.js` - Footer component
- `Sidebar.js` - Any other component
- etc.

All will be automatically discovered and included in the demo!

### Step 5: Build the Showcase
```bash
cd showcase
npm run build-demos
```

The script will:
```
🚀 Building React Lab Showcase...

1️⃣  Discovering experiments...

✓ Found 6 experiment(s): exp1, exp2, exp3, exp4, exp5, exp6

2️⃣  Generating experiments.json...
✓ Generated experiments.json with 6 experiments

3️⃣  Copying source files to public/sources/

  Copied: exp6/ (X files)

4️⃣  Generating demo HTML files

  ✓ Generated exp6.html

✅ Build complete!
```

### Step 6: Commit and Push
```bash
git add exp6/
git commit -m "Add experiment 6: My Awesome Experiment"
git push
```

The website will automatically display your new experiment in the sidebar!

## Folder Structure

Each experiment should follow this structure:

```
exp6/
├── src/
│   ├── App.js           (Required)
│   ├── App.css          (Required)
│   ├── Header.js        (Optional)
│   ├── Footer.js        (Optional)
│   └── [Other components].js
├── public/              (Optional)
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── metadata.json        (Optional - auto-generated defaults if missing)
└── package.json
```

## What Gets Auto-Generated

After running `npm run build-demos`:

1. **`showcase/src/data/experiments.json`**
   - Dynamically generated from all exp{N} folders
   - Includes metadata from each experiment's `metadata.json`
   - Lists all source files per experiment

2. **`showcase/public/demos/exp6.html`**
   - Standalone HTML demo file
   - Includes React 18 & Babel from CDN
   - Auto-loads all components and CSS

3. **`showcase/public/sources/exp6/`**
   - Copies all `.js` and `.css` files
   - Used by the Code Viewer in the sidebar
   - Excluded: test files, index.js, setupTests.js

## Customization

### Custom Metadata

You can override any metadata in `metadata.json`:

```json
{
  "title": "My Custom Title",
  "description": "My custom description that overrides defaults",
  "concepts": ["React Patterns", "Best Practices"],
  "number": 6
}
```

### Multiple Components

If you have `Header.js`, `Footer.js`, `Sidebar.js`, etc., they'll all be:
1. Auto-discovered
2. Included in the code viewer dropdown
3. Automatically injected into the demo HTML

### CSS Included Automatically

All CSS files in `exp{N}/src/` are:
1. Copied to `/public/sources/`
2. Listed in the file viewer
3. Injected into demo HTML styling

## Tips & Best Practices

✅ **Do:**
- Follow the `exp{N}` naming convention (exp6, exp7, exp8, etc.)
- Include a `metadata.json` with proper descriptions
- Keep component names simple and clear
- Add supporting components in the same `src/` folder
- Use placeholder images if needed (via CDN)
- Commit all files including `metadata.json`

❌ **Don't:**
- Use test files in src/ (they're auto-excluded)
- Put demo data in App.js (use defaults)
- Create components outside src/
- Forget to run `npm run build-demos` after adding files

## Example: Adding Exp6 (API Integration Demo)

```bash
# Create structure
mkdir -p exp6/src

# Add App.js with API fetching
cat > exp6/src/App.js << 'EOF'
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.github.com/users/github');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <button onClick={fetchData}>Fetch GitHub User</button>
      {loading && <p>Loading...</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default App;
EOF

# Add metadata
cat > exp6/metadata.json << 'EOF'
{
  "title": "API Integration with Fetch",
  "description": "Learn how to fetch data from external APIs and manage async state in React",
  "concepts": ["API Calls", "useEffect", "Async State", "Error Handling"]
}
EOF

# Build
cd showcase
npm run build-demos

# Commit
git add ../exp6/
git commit -m "Add exp6: API Integration"
git push
```

Done! 🎉 Your experiment is now live on the showcase.

## Troubleshooting

**"No experiments found"**
- Make sure your folder is named `exp{N}` (e.g., `exp6`)
- Make sure it has a `src/` subfolder with `App.js`

**Experiment not showing up**
- Run `npm run build-demos` again
- Check console for warnings about missing files

**Demo shows error**
- Check browser console (F12) for JavaScript errors
- Make sure imports are removed in final code
- Verify App.js exports the component

**Wrong title/description**
- Check `metadata.json` for typos
- Invalid JSON? Use a JSON validator
- Run `npm run build-demos` to regenerate

---

Happy experimenting! 🧪🚀
