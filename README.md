# React Lab - Learning Experiments

A comprehensive collection of React learning experiments demonstrating fundamental concepts through practical applications. This repository contains 5 progressive experiments that build upon React fundamentals to create interactive, functional components.

## 📋 Table of Contents

- [Overview](#overview)
- [Experiments](#experiments)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [License](#license)

## 🎯 Overview

This React Lab contains educational experiments that progressively teach React concepts including:

- **State Management** - Using `useState` hook
- **Component Composition** - Building reusable components
- **Event Handling** - Managing user interactions
- **List Rendering** - Dynamic list creation and manipulation
- **Form Handling** - Input validation and data collection

Each experiment is a standalone Create React App project that can be run independently.

## 🧪 Experiments

### **Experiment 1: Text Input Form** (`exp1/`)

**Concepts:** State Management, Event Handling

A simple React application that captures and displays user input in real-time.

**Features:**
- Text input field with placeholder
- Real-time display of typed text
- Student ID display (4VP23CS070)
- Basic styling with CSS

**Files:**
- `src/App.js` - Main component with state management
- `src/App.css` - Styling
- `package.json` - Dependencies

**Key Learning:**
- Using `useState` hook for form input
- Handling `onChange` events
- Conditional rendering

---

### **Experiment 2: Component Composition** (`exp2/`)

**Concepts:** Component Reusability, Props, Component Structure

Demonstrates how to build applications using multiple reusable components and pass data via props.

**Features:**
- Header component with customizable title
- Footer component with copyright and tagline
- Props-based data passing
- Clean component separation

**Components:**
- `Header.js` - Top section with title
- `Footer.js` - Bottom section with copyright and tagline
- `App.js` - Main component orchestrating UI

**Key Learning:**
- Creating functional components
- Passing props to child components
- Component composition pattern
- Separation of concerns

---

### **Experiment 3: Counter Application** (`exp3/`)

**Concepts:** State Management, Event Handling, Conditional Logic

A functional counter application with dynamic step control for more advanced state management.

**Features:**
- Increment counter by step value
- Decrement counter (with minimum value validation)
- Reset counter to zero
- Custom step size adjustment
- Dynamic counter display

**Controls:**
- **Increase Button** - Adds step value to counter
- **Decrease Button** - Subtracts step value (prevents negative)
- **Reset Button** - Sets counter to 0
- **Step Input** - Configurable increment/decrement value

**Key Learning:**
- Multiple state variables
- Conditional logic in event handlers
- Input validation
- Derived state updates

---

### **Experiment 4: Todo Application** (`exp4/`)

**Concepts:** List Management, Array Methods, Complex State

A fully functional todo application demonstrating CRUD operations with task management.

**Features:**
- Add new tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Persistent task list
- Visual feedback for completed tasks (strikethrough)
- Input validation (prevents empty tasks)

**Functions:**
- `addTask()` - Creates new task with unique ID
- `toggleCompletion()` - Toggles task completion status
- `deleteTask()` - Removes task from list

**Key Learning:**
- Array destructuring and spread operator
- Array methods (map, filter)
- Unique ID generation
- Complex state updates
- Conditional CSS classes

---

### **Experiment 5: Image Gallery with Figures** (`exp5/`)

**Concepts:** Component Composition, List Rendering, Advanced State

An interactive image gallery demonstrating advanced list manipulation and component reusability.

**Features:**
- Display images with captions
- Add new images via URL input
- Remove images from gallery
- Grid-based layout
- Placeholder images for demo

**Components:**
- `BasicFigure` - Individual figure component
- `FigureList` - Gallery manager component
- Image URL input
- Caption input

**Key Learning:**
- Child component communication (callbacks)
- Form validation
- Dynamic list rendering
- Grid CSS layout
- State management with complex objects

---

## 📦 Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rajath2005/React-Lab.git
   cd React-Lab
   ```

2. **Navigate to an experiment directory:**
   ```bash
   cd exp1
   # or exp2, exp3, exp4, exp5
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

   The application will open in your browser at `http://localhost:3000`

## 📁 Project Structure

```
React-Lab/
├── exp1/                    # Text Input Form
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── exp2/                    # Component Composition
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── exp3/                    # Counter Application
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── exp4/                    # Todo Application
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── exp5/                    # Image Gallery
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── FigureList.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── LICENSE                  # MIT License
├── README.md               # This file
└── .gitignore             # Git ignore rules
```

## 🚀 Getting Started

### Running Each Experiment

Each experiment is independent. Follow these steps for any experiment:

```bash
# Navigate to experiment
cd exp1

# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm build

# Run tests
npm test
```

### Development Workflow

1. Open the project in your code editor
2. Navigate to the specific experiment folder
3. Edit files in the `src/` directory
4. Changes automatically reload in the browser (Hot Module Replacement)
5. Open browser developer tools for debugging

### Available npm Scripts

For each experiment:

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (irreversible)

## 💡 Learning Path

**Beginner → Intermediate:**

1. Start with **Exp1** - Understand basic state management
2. Move to **Exp2** - Learn component composition
3. Practice with **Exp3** - Master state updates and validation
4. Build with **Exp4** - Complex state and list management
5. Advance with **Exp5** - Advanced patterns and callbacks

## 🛠️ Technologies Used

- **React** - UI library
- **JavaScript ES6+** - Programming language
- **CSS3** - Styling
- **npm** - Package manager
- **Create React App** - Build tool

## 📚 Concepts Covered

- **React Hooks:** useState
- **Components:** Functional components, component composition
- **State Management:** Local state management with useState
- **Event Handling:** onClick, onChange events
- **List Rendering:** map() for dynamic lists
- **Conditional Rendering:** Ternary operators, logical operators
- **Array Methods:** filter, map, spread operator
- **Forms:** Controlled components, input validation
- **CSS:** Styling with classes, grid layouts
- **Props:** Passing data between components

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
npm start -- --port 3001
```

### npm modules not found
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

### Hot reload not working
- Check if you're in the correct experiment directory
- Restart the development server: `npm start`

## 🤝 Contributing

These are educational experiments. Feel free to:
- Modify and extend the experiments
- Add new features
- Create variations
- Submit improvements

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

You are free to:
- ✅ Use this code commercially
- ✅ Modify the code
- ✅ Distribute the code
- ✅ Use privately

With conditions:
- ⚠️ Include a copy of the license and copyright notice

## 👨‍💻 Author

**Rajath** - Student ID: 4VP23CS070  
VCET (Vidyavardhini's College of Engineering and Technology)

## 📞 Support

For questions or issues related to these experiments:
- Check the individual experiment README files
- Review the inline code comments
- Experiment with the code and test different scenarios
- Refer to [React Documentation](https://react.dev)

## 📖 Additional Resources

- [React Official Documentation](https://react.dev)
- [Create React App Documentation](https://create-react-app.dev)
- [JavaScript ES6 Guide](https://es6.io/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

**Happy Learning! 🚀**

Last Updated: April 2026
