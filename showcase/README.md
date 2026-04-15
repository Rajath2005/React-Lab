# React Lab Showcase

Interactive showcase website for the 5 React Lab experiments. View all experiments side-by-side with syntax-highlighted code and live demos.

## 🚀 Features

- **Side-by-Side Layout**: Code viewer on the left, live demo on the right (50/50 split)
- **Syntax Highlighting**: Beautiful Dracula theme with syntax highlighting using Prism.js
- **Multiple File Viewer**: Select between different source files (App.js, components, CSS)
- **Copy to Clipboard**: One-click copy button for all code snippets
- **Responsive Design**: Adapts to tablet and mobile screens
- **Live Experiments**: All 5 React experiments running in isolated iframes
- **Educational Context**: Each experiment includes learning concepts and descriptions

## 📋 Experiments Included

1. **exp1**: Text Input Display - Learn useState and event handling
2. **exp2**: Header-Footer Component Composition - Master component reusability
3. **exp3**: Counter Application - Multiple state variables and conditional logic
4. **exp4**: Todo Application - CRUD operations and array manipulation
5. **exp5**: Image Gallery - Dynamic content management and component callbacks

## 🛠️ Setup

### Prerequisites
- Node.js 16+ and npm installed
- All parent experiment folders must be accessible

### Installation

1. Navigate to the showcase directory:
```bash
cd showcase
```

2. Install dependencies:
```bash
npm install
```

3. Generate demo HTML files (required before running):
```bash
npm run build-demos
```

4. Start the development server:
```bash
npm start
```

The showcase will open at `http://localhost:3000`

## 📁 Project Structure

```
showcase/
├── public/
│   ├── index.html
│   └── demos/
│       ├── exp1.html      (Generated)
│       ├── exp2.html      (Generated)
│       ├── exp3.html      (Generated)
│       ├── exp4.html      (Generated)
│       └── exp5.html      (Generated)
├── src/
│   ├── components/
│   │   ├── Sidebar.js          # Experiment navigation
│   │   ├── CodeViewer.js       # Syntax-highlighted code display
│   │   ├── DemoFrame.js        # Live demo iframe container
│   │   └── ExperimentPanel.js  # Main layout component
│   ├── data/
│   │   └── experiments.json    # Experiment metadata
│   ├── styles/
│   │   ├── variables.css       # CSS variables and theming
│   │   ├── App.css             # Main layout styling
│   │   └── CodeViewer.css      # Syntax highlighting styles
│   ├── App.js
│   └── index.js
├── scripts/
│   └── generateDemos.js        # Builds standalone demo HTML files
├── package.json
├── .gitignore
└── README.md
```

## 🔧 How It Works

### Demo Generation
The `generateDemos.js` script:
1. Reads source code from each experiment folder (exp1-exp5)
2. Combines component files into a single bundle
3. Wraps code with React CDN and Babel for JSX transpilation
4. Generates standalone HTML files in `public/demos/`
5. IFrames load these static HTML files for isolated execution

### Code Viewing
- CodeViewer component fetches source files from the experiments directory
- Uses Prism.js for syntax highlighting
- Supports .js and .css files
- Includes copy-to-clipboard functionality

### Sidebar Navigation
- Lists all 5 experiments with descriptions
- Click to switch between experiments
- Shows learning concepts and keywords
- Links to the original GitHub repository

## 🎨 Styling & Theme

The showcase uses:
- **Color Scheme**: Dracula dark theme with accent green (#50fa7b)
- **Fonts**: System fonts for UI, monospace for code
- **Responsive**: Mobile-first approach with breakpoints at 480px, 768px, 1200px
- **Syntax Highlighting**: Dracula theme via Prism.js

## 📦 Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm run build-demos` - Generate HTML demo files
- `npm test` - Run tests (if configured)

## ⚙️ Configuration

### Adding a New Experiment
1. Add experiment entry to `src/data/experiments.json`
2. Update `scripts/generateDemos.js` if special handling is needed
3. Run `npm run build-demos` to generate demo HTML
4. Demo iframe will automatically load

### Changing Theme Colors
Edit `src/styles/variables.css`:
```css
:root {
  --bg-primary: #1e1e2e;      /* Background */
  --text-primary: #f8f8f2;    /* Text color */
  --accent: #50fa7b;          /* Accent green */
  /* ... other variables */
}
```

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## 📝 Notes

- The showcase should be run independently; don't run showcase + all 5 experiments simultaneously (port conflicts)
- If experiment source code is modified, run `npm run build-demos` to update iframes
- Code viewer fetches files from the parent directories, ensure paths in experiments.json are correct
- All demos run in sandboxed iframes for safety

## 🔗 Related

- **GitHub Repository**: [React-Lab](https://github.com/Rajath2005/React-Lab)
- **Experiments**: Each experiment is also runnable independently

## 📄 License

See LICENSE in the parent repository.
