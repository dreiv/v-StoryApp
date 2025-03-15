# Style System Demo Application

This application serves as a demonstration for a style system, showcasing its capabilities and ease of integration within a **Vue 3** environment. It provides a clean and intuitive interface to explore the system's components and themes.

## Live Storybook

You can explore the live Storybook of our components [**here**](https://dreiv.github.io/v-StoryApp/ux)

## Quickstart

You can run the demo application locally by following the steps below:

```sh
npm install
npm run dev
```

## Supported Browsers

We support the latest, stable versions of Chrome, Edge, and Safari. The application is optimized for modern web browsers.

## Dependencies

The project relies on a set of dependencies for development and runtime. Here's a summary of the most relevant ones:

### Application Dependencies

| Dependency | Description                                                    | License | WWW                                                    |
| ---------- | -------------------------------------------------------------- | ------- | ------------------------------------------------------ |
| Vue        | The core framework for building the user interface.            | MIT     | [https://vuejs.org/](https://vuejs.org/)               |
| Vue Router | Official router for Vue.js, enabling navigation between views. | MIT     | [https://router.vuejs.org/](https://router.vuejs.org/) |
| Pinia      | State management library for Vue, facilitating state sharing.  | MIT     | [https://pinia.vuejs.org/](https://pinia.vuejs.org/)   |

### Development Dependencies

| Dependency | Description                                                                            | License    | WWW                                                                    |
| ---------- | -------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------- |
| TypeScript | Adds static typing to JavaScript, improving code quality.                              | MIT        | [https://www.typescriptlang.org/](https://www.typescriptlang.org/)     |
| Vite       | Next-generation frontend tooling, providing a fast dev server and build tool.          | MIT        | [https://vitejs.dev/](https://vitejs.dev/)                             |
| Storybook  | UI component development environment for building and testing components in isolation. | MIT        | [https://storybook.js.org/](https://storybook.js.org/)                 |
| Vitest     | Fast unit-testing framework powered by Vite.                                           | MIT        | [https://vitest.dev/](https://vitest.dev/)                             |
| Playwright | End-to-end testing framework for reliable cross-browser tests.                         | Apache 2.0 | [https://playwright.dev/](https://playwright.dev/)                     |
| ESLint     | Linter for identifying and fixing code issues.                                         | MIT        | [https://eslint.org/](https://eslint.org/)                             |
| Prettier   | Code formatter for enforcing consistent code style.                                    | MIT        | [https://prettier.io/](https://prettier.io/)                           |
| Husky      | Git hooks for automating checks before commits.                                        | MIT        | [https://github.com/typicode/husky](https://github.com/typicode/husky) |

## State Management

We utilize [Pinia](https://pinia.vuejs.org/) for managing the application state, allowing for efficient state sharing between components. You can inspect the state using [Vue DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg).

## Testing

We use Vitest for unit testing and Playwright for end-to-end testing.

```sh
npm run test
```

For developing and testing components in isolation, we use Storybook:

```sh
npm run storybook
```

To run end-to-end tests:

```sh
npm run test-e2e
```

## Build & Deployment

To build the application for production, run:

```sh
npm run build
```

This will create an optimized build in the `dist` folder.

## Pre-commit Checks

We enforce code quality and consistency through pre-commit checks using Husky. These checks include:

- TypeScript type checking.
- Code formatting with Prettier.
- Linting with ESLint.
- Running unit tests.
