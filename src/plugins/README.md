# Plugins

This directory contains custom Vue.js plugins that extend the functionality of the application.
Plugins can be used to add global-level features and are often used for things like internationalization, global components, and custom directives.

### Creating a New Plugin

To create a new plugin, follow these steps:

1. Create a new TypeScript file inside the `plugins` directory.
2. Define the plugin by exporting a function that takes the `Vue` instance as an argument.
3. Inside the function, add any global properties, methods, components, or mixins.
4. Register the plugin in the main application entry point (usually `main.ts`).
