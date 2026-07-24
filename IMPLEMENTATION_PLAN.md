# Frontend Technical Task – Implementation Plan

## 1. Project Goal

Build a single-page React application for the **HA | Wisdom Wellbeing Resource Centre**.

The application should display wellbeing resources grouped by category when the page first loads. Users should also be able to browse, inspect, sort, and filter the resources.

The main objective is to demonstrate:

- Test-Driven Development (TDD)
- Modern React best practices
- Effective TypeScript usage
- Attention to detail
- Problem-solving ability
- Clear and frequent Git commits

---

## 2. Recommended Technology Stack

- **React** – UI framework
- **TypeScript** – static typing
- **Vite** – project setup and development server
- **Vitest** – unit and component testing
- **React Testing Library** – testing user behaviour
- **Jest DOM** – additional DOM assertions
- **CSS Modules**, **Tailwind CSS**, or plain CSS – styling
- **ESLint** – code-quality checks
- **Prettier** – consistent formatting

---

## 3. Required Resource Categories

Each resource must belong to exactly one category:

- Podcasts
- Articles
- Newsletters
- Recipes
- Fitness
- Meditation

The categories should be represented by a TypeScript union type or enum to prevent invalid values.

Example:

```ts
export type ResourceCategory =
  'Podcasts' | 'Articles' | 'Newsletters' | 'Recipes' | 'Fitness' | 'Meditation'
```

---

## 4. Resource Data Model

Create a strongly typed resource interface.

```ts
export interface Resource {
  id: string
  title: string
  category: ResourceCategory
  thumbnailUrl: string
  tags: string[]
  durationMinutes: number
  description: string
  uploadedAt: string
}
```

### Validation rules

- Every resource must have a unique `id`.
- Every resource must belong to one valid category.
- Each resource must contain no more than three tags.
- `durationMinutes` must be a positive number.
- `uploadedAt` should use ISO date format, for example `2026-01-15`.
- Images should have meaningful alternative text.

---

## 5. Mock Data

Create a local mock-data file, for example:

```text
src/data/resources.ts
```

Include enough data to demonstrate all functionality properly:

- At least two resources per category
- Different upload dates
- A variety of titles and tags
- No resource with more than three tags

The mock data should be imported into the application rather than fetched from an external API.

---

## 6. Core Requirements

### 6.1 Display resources grouped by category

On first load:

- Show all six categories.
- Display each category as a separate section.
- Display the resources belonging to that category beneath its heading.
- Maintain a predictable category order.

Each resource card must display:

- Title
- Thumbnail image
- Up to three tags
- Read or watch time in minutes

Example duration label:

```text
8 min read
```

or:

```text
12 min watch
```

A helper function can determine whether to show “read” or “watch” based on the resource category.

---

## 7. Features to Implement

The task requires at least two additional features. To demonstrate a stronger solution, implement all three if time permits.

### Feature 1: Resource details

When a user selects a resource, display all its information:

- Title
- Full thumbnail image
- Category
- Tags
- Read or watch time
- Description
- Date uploaded

Recommended approaches:

- Accessible modal dialog
- Expandable card
- Side panel
- Separate details route

For a small single-page application, an accessible modal or side panel is likely the simplest solution.

The details view should support:

- Closing with a visible close button
- Closing with the Escape key if using a modal
- Keyboard navigation
- Focus management
- A clearly formatted upload date

### Feature 2: Sorting

Add a sorting control with options such as:

- Default category order
- Category A–Z
- Newest first
- Oldest first

The sorting logic should be stored in a pure utility function so it can be tested independently.

If the resources are grouped by category, date sorting can be applied within each category.

### Feature 3: Filtering

Add a search field that filters resources by:

- Title
- Tags

Filtering should:

- Be case-insensitive
- Ignore leading and trailing spaces
- Update the displayed resources as the user types
- Show a helpful empty state when there are no matches
- Preserve category grouping for matching results
- Hide empty category sections or display a category-specific empty state

---

## 8. Suggested Application Structure

```text
src/
├── components/
│   ├── ResourceCard/
│   │   ├── ResourceCard.tsx
│   │   ├── ResourceCard.test.tsx
│   │   └── ResourceCard.module.css
│   ├── ResourceGroup/
│   │   ├── ResourceGroup.tsx
│   │   └── ResourceGroup.test.tsx
│   ├── ResourceDetails/
│   │   ├── ResourceDetails.tsx
│   │   └── ResourceDetails.test.tsx
│   ├── ResourceFilters/
│   │   ├── ResourceFilters.tsx
│   │   └── ResourceFilters.test.tsx
│   └── EmptyState/
│       └── EmptyState.tsx
├── data/
│   └── resources.ts
├── hooks/
│   └── useResourceFilters.ts
├── types/
│   └── resource.ts
├── utils/
│   ├── filterResources.ts
│   ├── filterResources.test.ts
│   ├── groupResources.ts
│   ├── groupResources.test.ts
│   ├── sortResources.ts
│   └── sortResources.test.ts
├── App.tsx
├── App.test.tsx
├── main.tsx
└── setupTests.ts
```

The exact structure can be simplified, but components, data, types, and business logic should remain clearly separated.

---

## 9. State Management

React local state should be sufficient for this task.

Suggested state:

```ts
const [searchTerm, setSearchTerm] = useState('')
const [sortOption, setSortOption] = useState<SortOption>('default')
const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
```

Derived data should be calculated from the mock resources, search term, and sort option.

Use `useMemo` only when it genuinely improves readability or prevents unnecessary repeated calculations. Avoid adding a global state library unless there is a clear reason.

---

## 10. Test-Driven Development Approach

The project should demonstrate the TDD cycle:

1. Write a failing test.
2. Implement the smallest amount of code needed to pass it.
3. Refactor while keeping the tests passing.
4. Commit the completed step.

### Recommended implementation order

#### Step 1: Data grouping

Write tests for a `groupResourcesByCategory` function.

Test that:

- Resources are placed in the correct categories.
- Empty categories are handled correctly.
- The original array is not mutated.

Then implement the grouping function.

#### Step 2: Resource card

Write component tests confirming that a card displays:

- The title
- Thumbnail
- Tags
- Duration
- Correct accessible image text

Then implement the card.

#### Step 3: Grouped page

Write a test confirming that:

- Category headings are displayed.
- Resources appear beneath the correct category.

Then implement category sections.

#### Step 4: Resource details

Write tests confirming that:

- Clicking a card opens the details view.
- Description and upload date are displayed.
- The details view can be closed.

Then implement the details interaction.

#### Step 5: Filtering

Write tests confirming that:

- A title match is displayed.
- A tag match is displayed.
- Filtering is case-insensitive.
- Non-matching resources are removed.
- An empty state appears when there are no matches.

Then implement the filter logic and search input.

#### Step 6: Sorting

Write tests confirming that:

- Newest-first sorting works.
- Oldest-first sorting works.
- Alphabetical category sorting works if included.
- The original mock-data array is not mutated.

Then implement the sorting control.

---

## 11. Minimum Test Coverage

The solution should include tests for both logic and visible user behaviour.

### Unit tests

Test pure utility functions:

- Grouping resources
- Filtering by title
- Filtering by tags
- Sorting by upload date
- Sorting by category
- Duration label formatting

### Component tests

Test:

- Resource card content
- Category sections
- Search interaction
- Sort interaction
- Resource details interaction
- Empty results state

### Optional end-to-end test

One end-to-end test could cover this flow:

1. Open the application.
2. Verify grouped resources are visible.
3. Search for a resource tag.
4. Open a matching resource.
5. Verify its description.
6. Close the details view.

Testing should focus on behaviour rather than internal implementation details.

---

## 12. Accessibility

Accessibility should be considered throughout the implementation.

Include:

- Semantic HTML elements
- A single clear page heading
- Proper heading hierarchy for category sections
- Descriptive image `alt` text
- Associated labels for search and sorting fields
- Visible keyboard focus styles
- Keyboard-accessible cards or buttons
- Appropriate button elements instead of clickable `div` elements
- Accessible modal semantics if using a dialog
- Sufficient colour contrast
- A status or message for zero search results

Example card interaction:

```tsx
<button type="button" onClick={() => onSelect(resource)}>
  {/* Card content */}
</button>
```

---

## 13. Responsive Design

The application should work on mobile, tablet, and desktop screens.

Suggested behaviour:

- One-column card layout on small screens
- Two columns on tablets
- Three or four columns on larger screens
- Filters stack vertically on mobile
- Images use a consistent aspect ratio
- Long titles and tags wrap without breaking the layout

Use CSS Grid for the card layout where appropriate.

---

## 14. User Interface Details

Recommended page sections:

1. Header and page introduction
2. Search and sorting controls
3. Grouped resource sections
4. Resource details view
5. Empty state when no resources match

Useful visual details:

- Category headings with resource counts
- Consistent card heights
- Rounded thumbnails
- Clearly styled tags
- Hover and focus states
- A readable maximum page width
- Loading skeletons are unnecessary because the data is local

---

## 15. Error and Edge-Case Handling

Handle the following cases:

- Empty resource list
- Category with no resources
- No filter matches
- Resource with fewer than three tags
- Invalid or missing image
- Long title or description
- Invalid uploaded date
- Search containing only spaces

For broken images, a fallback image or neutral placeholder can be displayed.

---

## 16. Git Commit Strategy

Commit little and often so the reviewers can follow the development process.

Example commits:

```text
chore: initialise React TypeScript project
chore: configure vitest and testing library
feat: add typed resource mock data

test: add resource grouping tests
feat: group resources by category

test: add resource card tests
feat: create resource card component

test: add grouped resource page tests
feat: display resources by category

test: add resource details interaction tests
feat: add resource details dialog

test: add resource filtering tests
feat: filter resources by title and tags

test: add resource sorting tests
feat: sort resources by date and category

style: add responsive resource centre layout
fix: improve keyboard navigation and focus states
docs: complete README with decisions and limitations
```

Avoid creating only one large final commit.

---

## 17. README Contents

The repository README should include:

### Project overview

A short explanation of the Resource Centre and the completed functionality.

### Setup instructions

```bash
npm install
npm run dev
```

### Test instructions

```bash
npm run test
```

Optional commands:

```bash
npm run test:coverage
npm run lint
npm run build
```

### Features completed

List the implemented functionality, including which two or more optional features were completed.

### Technical decisions

Explain decisions such as:

- Why Vite was selected
- Why local React state was sufficient
- Why filtering and sorting were implemented as pure functions
- Why a modal, side panel, or route was selected for details
- How TDD was used

### Accessibility considerations

Briefly explain keyboard support, semantic HTML, image text, labels, focus handling, and dialog behaviour.

### Known limitations

Clearly state any incomplete or simplified areas.

Example:

```text
With more time, I would add end-to-end tests, improve image fallback handling,
and perform further accessibility testing with a screen reader.
```

### Future improvements

Possible additions:

- Pagination or infinite scrolling
- API integration
- Saved or favourite resources
- Multiple simultaneous filters
- URL-based search and sorting state
- More complete end-to-end testing
- Improved animation and transitions

---

## 18. Suggested Delivery Order

### Phase 1: Setup

- Create the Vite React TypeScript project.
- Configure testing.
- Add linting and formatting.
- Create the resource types and mock data.

### Phase 2: Core display

- Test and implement grouping logic.
- Test and implement the resource card.
- Test and implement category sections.
- Add the responsive layout.

### Phase 3: Required additional features

- Test and implement resource details.
- Test and implement title and tag filtering.
- Test and implement sorting.

### Phase 4: Quality

- Improve accessibility.
- Handle empty and edge cases.
- Review responsive behaviour.
- Run tests, linting, and production build.

### Phase 5: Submission

- Complete the README.
- Review commit history.
- Push the repository to GitHub.
- Confirm the repository is accessible to the reviewer.

---

## 19. Definition of Done

The task is ready to submit when:

- The application starts successfully.
- All six categories are represented.
- Resources are grouped by category on first load.
- Every card shows its title, thumbnail, tags, and duration.
- At least two additional features are complete.
- TypeScript is used without avoidable `any` types.
- Tests demonstrate a TDD approach.
- All tests pass.
- The production build succeeds.
- The interface is responsive.
- Basic accessibility requirements are met.
- The README explains setup, decisions, limitations, and future improvements.
- The Git history contains frequent, meaningful commits.

---

## 20. Recommended Scope for a Strong Submission

For the best balance between quality and available time, prioritise:

1. Grouped resource display
2. Resource details modal or side panel
3. Search by title and tags
4. Sort by newest and oldest upload date
5. Unit and component tests written before implementation
6. Responsive and accessible card layout
7. Clear README documentation

A smaller, well-tested and clearly structured solution is preferable to a large but unfinished implementation.
