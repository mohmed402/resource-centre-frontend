# Health Assured – Frontend Tech Task

Single-page React application that groups wellbeing resources by category on
first load, with:

- **Details on click** – accessible modal with Escape close, focus trapping,
  initial focus, and focus restoration
- **Filter by title and tags** – case-insensitive search with helpful empty
  states
- **Sort resources** – default, title, duration, and category ordering
- **Responsive interface** – phone, tablet, desktop, dark mode, and reduced
  motion support

## Stack & rationale

- **Vite + React + TypeScript** – fast development, minimal scaffolding, and
  strongly typed data
- **CSS Modules** – locally scoped, responsive component styling
- **Vitest + React Testing Library** – behavior-focused component and utility
  testing
- **ESLint + Prettier** – static analysis and consistent formatting

## Getting started

Requires Node.js 20.19 or newer and npm.

```text
npm install
npm run dev           # Start the Vite development server
npm run test          # Run tests in watch mode
npm run test:run      # Run the test suite once
npm run lint          # Run ESLint
npm run format:check  # Check formatting without changing files
```

## Build & preview

```text
npm run build         # Type-check and create the production bundle in /dist
npm run preview       # Serve the production bundle locally
```

## Key decisions

- The grouped layout preserves the six-category structure required by the
  brief.
- React local state manages search, sorting, and the selected resource without
  an unnecessary global state library.
- Filtering, sorting, grouping, duration labels, and date formatting are pure
  utilities that can be tested independently.
- A custom modal keeps focus and keyboard behavior predictable in browsers and
  jsdom.
- Sorting reorders category sections because the supplied dataset contains one
  resource per category.
- Failed remote images use a bundled fallback illustration.

## Tests

The project contains **41 passing tests** covering:

- Correct grouping and predictable category order
- Title and tag filtering, whitespace handling, and zero-result states
- Title, duration, and category sorting without input mutation
- Resource card content and keyboard interaction
- Modal opening, Escape and button closing, focus management, and scroll
  locking
- Duration and uploaded-date formatting
- Empty datasets, live result announcements, and broken-image fallbacks

Run the complete submission check with:

```text
npm run test:run
npm run lint
npm run format:check
npm run build
```

## Accessibility

- Semantic main, section, heading, list, button, form, and status elements
- Associated search and sorting labels
- Meaningful image alternative text
- Keyboard-accessible cards and visible focus styles
- Dialog naming, modal semantics, initial focus, focus trapping, Escape close,
  and return focus
- Polite result-count announcements
- Background scrolling disabled while details are open
- Animations disabled when reduced motion is preferred

## What I’d do with more time

- Replace local mock data with a validated API integration
- Store search and sorting state in the URL
- Add favorites and pagination for a larger resource library
- Add Playwright end-to-end and visual-regression coverage
- Perform a complete screen-reader audit
- Add CI checks and a preview deployment

The original technical plan is available in
[`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md).
