# Contributing to React Lab

Thank you for your interest in contributing to React Lab. This project is designed for learning and open collaboration.

## Ways to Contribute

- Report bugs
- Improve documentation
- Fix issues in existing experiments
- Add new experiments (`exp6`, `exp7`, etc.)
- Improve the showcase UI/UX and tooling

## Prerequisites

- Node.js (v14+ recommended)
- npm
- Git

## Project Setup

1. Fork this repository and clone your fork.
2. Install dependencies in the area you plan to change.

### For Showcase changes

```bash
cd showcase
npm install
npm run build-demos
npm start
```

### For Experiment changes

```bash
cd exp1   # or exp2, exp3, exp4, exp5
npm install
npm start
```

## Development Workflow

1. Create a branch from `main`:
   - `feature/<short-description>` for features
   - `fix/<short-description>` for bug fixes
   - `docs/<short-description>` for documentation updates
2. Make focused, minimal changes.
3. Run relevant checks before opening a PR:
   - `npm test`
   - `npm run build`
   - For showcase or new experiments: `cd showcase && npm run build-demos`
4. Commit with clear messages.
5. Open a Pull Request with:
   - What changed
   - Why it changed
   - How it was tested

## Adding a New Experiment

1. Create a new folder using the `exp{N}` pattern (example: `exp6/`).
2. Add source files under `exp{N}/src/` (at minimum `App.js` and `App.css`).
3. Add `metadata.json` (recommended).
4. Run:

```bash
cd showcase
npm run build-demos
```

For full details, see `ADDING_EXPERIMENTS.md`.

## Code & Content Guidelines

- Keep code simple and educational.
- Follow existing naming and file structure patterns.
- Avoid unrelated refactors in the same PR.
- Update docs when behavior or setup changes.

## Pull Request Checklist

- [ ] Changes are focused and minimal
- [ ] Relevant tests/build run successfully
- [ ] Docs updated (if needed)
- [ ] No secrets or sensitive data added

## Reporting Issues

When opening an issue, include:

- Clear title and summary
- Steps to reproduce
- Expected vs actual behavior
- Screenshots or logs (if relevant)
- Environment details (OS, Node version, browser)

Thanks for helping improve React Lab 🚀
