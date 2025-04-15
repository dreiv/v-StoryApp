# Style System Demo Application

This application serves as a demonstration for a style system, showcasing its capabilities and ease of integration within a **Vue 3** environment. It provides a clean and intuitive interface to explore the system's components and themes.

## Live Storybook

You can explore the live Storybook of our components [**here**](https://dreiv.github.io/v-StoryApp/ux)

## Quickstart

You can run the demo application locally by following the steps below:

```sh
npm install
npm start
# or
npm run dev
```

## Supported Browsers

We support the latest, stable versions of Chrome, Edge, and Safari. The application is optimized for modern web browsers.

## Dependencies

The project relies on a set of dependencies for development and runtime. Here's a summary of the most relevant ones:

### Application Dependencies

| Dependency      | Description                                                    | Version  | WWW                                                                    |
| --------------- | -------------------------------------------------------------- | -------- | ---------------------------------------------------------------------- |
| Vue             | The core framework for building the user interface.            | ^3.5.13  | [https://vuejs.org/](https://vuejs.org/)                               |
| Vue Router      | Official router for Vue.js, enabling navigation between views. | ^4.5.0   | [https://router.vuejs.org/](https://router.vuejs.org/)                 |
| Pinia           | State management library for Vue, facilitating state sharing.  | ^3.0.2   | [https://pinia.vuejs.org/](https://pinia.vuejs.org/)                   |
| Lucide Vue Next | A collection of beautiful SVG icons as Vue components.         | ^0.488.0 | [https://lucide.dev/](https://lucide.dev/)                             |
| Floating Vue    | A floating UI component library for tooltips and dropdowns.    | ^5.2.2   | [https://floating-vue.starpad.dev/](https://floating-vue.starpad.dev/) |

### Development Dependencies

| Dependency | Description                                                                            | Version | WWW                                                                    |
| ---------- | -------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------- |
| TypeScript | Adds static typing to JavaScript, improving code quality.                              | ~5.8.3  | [https://www.typescriptlang.org/](https://www.typescriptlang.org/)     |
| Vite       | Next-generation frontend tooling, providing a fast dev server and build tool.          | ^6.2.6  | [https://vitejs.dev/](https://vitejs.dev/)                             |
| Storybook  | UI component development environment for building and testing components in isolation. | ^8.6.12 | [https://storybook.js.org/](https://storybook.js.org/)                 |
| Vitest     | Fast unit-testing framework powered by Vite.                                           | ^3.1.1  | [https://vitest.dev/](https://vitest.dev/)                             |
| Playwright | End-to-end testing framework for reliable cross-browser tests.                         | ^1.51.1 | [https://playwright.dev/](https://playwright.dev/)                     |
| ESLint     | Linter for identifying and fixing code issues.                                         | ^9.24.0 | [https://eslint.org/](https://eslint.org/)                             |
| OxLint     | Blazingly fast JavaScript linter.                                                      | ^0.16.6 | [https://oxc-project.github.io/](https://oxc-project.github.io/)       |
| Prettier   | Code formatter for enforcing consistent code style.                                    | ^3.5.3  | [https://prettier.io/](https://prettier.io/)                           |
| Husky      | Git hooks for automating checks before commits.                                        | ^9.1.7  | [https://github.com/typicode/husky](https://github.com/typicode/husky) |

## State Management

We utilize [Pinia](https://pinia.vuejs.org/) for managing the application state, allowing for efficient state sharing between components. You can inspect the state using [Vue DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg).

## Testing

We have a comprehensive testing setup to ensure code quality:

```sh
# Run unit tests
npm run test

# Run tests with UI
npm run test-ui

# Generate test coverage report
npm run coverage

# Run end-to-end tests with Playwright
npm run test-e2e
```

For developing and testing components in isolation, we use Storybook:

```sh
npm run storybook
```

To build the Storybook for deployment:

```sh
npm run build-storybook
```

## Code Quality

We maintain high code quality standards through automated tools:

```sh
# Run linters
npm run lint

# Format code with Prettier
npm run format

# Run type checking
npm run type-check
```

## Build & Deployment

To build the application for production:

```sh
# Standard build
npm run build

# Build with bundle analyzer visualization
npm run build-analyze
```

These commands will create an optimized build in the `dist` folder.

To preview the production build locally:

```sh
npm run preview
```

## Pre-commit Checks

We enforce code quality and consistency through pre-commit checks using Husky and lint-staged. These checks automatically run:

- TypeScript type checking
- Code formatting with Prettier
- Linting with ESLint and OxLint
- Running unit tests related to changed files

The configuration for these checks can be found in the `lint-staged` section of the package.json file.
