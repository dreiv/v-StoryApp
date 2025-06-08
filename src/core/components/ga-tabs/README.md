# GaTabs Component

A customizable and responsive tabs component for Vue 3 with support for router integration and overflow handling.

## Components

### GaTabs

The main tabs container component that manages tab state and appearance.

### GaTab

An optional tab item component that can be used as a child of `GaTabs` for more customizable tabs.

## Usage

There are two ways to use the tabs component:

### Method 1: Using the `tabs` prop

This approach is simpler and recommended for most use cases:

```vue
<template>
  <ga-tabs v-model="activeTab" :tabs="tabs">
    <div v-if="activeTab === 'tab1'">Home content</div>
    <div v-if="activeTab === 'tab2'">Profile content</div>
    <div v-if="activeTab === 'tab3'">Settings content</div>
  </ga-tabs>
</template>

<script setup>
import { ref } from 'vue'
import { Home, User, Settings } from 'lucide-vue-next'
import GaTabs from './GaTabs.vue'

const activeTab = ref('tab1')
const tabs = [
  { id: 'tab1', label: 'Home', icon: Home },
  { id: 'tab2', label: 'Profile', icon: User },
  { id: 'tab3', label: 'Settings', icon: Settings },
]
</script>
```

### Method 2: Using child `GaTab` components

This approach gives you more flexibility with individual tabs:

```vue
<template>
  <ga-tabs v-model="activeTab">
    <!-- Place GaTab components in the tabs slot -->
    <template #tabs>
      <ga-tab id="tab1" label="Home" :icon="Home" />
      <ga-tab id="tab2" label="Profile" :icon="User" />
      <ga-tab id="tab3" label="Settings" :icon="Settings" />
    </template>

    <!-- Tab content is placed in the default slot -->
    <div v-if="activeTab === 'tab1'">Home content</div>
    <div v-if="activeTab === 'tab2'">Profile content</div>
    <div v-if="activeTab === 'tab3'">Settings content</div>
  </ga-tabs>
</template>

<script setup>
import { ref } from 'vue'
import { Home, User, Settings } from 'lucide-vue-next'
import GaTabs from './GaTabs.vue'
import GaTab from './GaTab.vue'

const activeTab = ref('tab1')
</script>
```

## Props

### GaTabs Props

| Prop             | Type                           | Default   | Description                          |
| ---------------- | ------------------------------ | --------- | ------------------------------------ |
| `modelValue`     | `string`                       | `''`      | The active tab ID (v-model binding)  |
| `tabs`           | `TabProps[]`                   | `[]`      | Array of tab objects                 |
| `keyLine`        | `boolean`                      | `true`    | Whether to show a line below tabs    |
| `useRouterLinks` | `boolean`                      | `false`   | Whether to integrate with Vue Router |
| `align`          | `'start' \| 'center' \| 'end'` | `'start'` | Horizontal alignment of tabs         |

### GaTab Props

| Prop       | Type               | Default             | Description                                                  |
| ---------- | ------------------ | ------------------- | ------------------------------------------------------------ |
| `id`       | `string`           | Generated unique ID | Unique identifier for the tab                                |
| `label`    | `string`           | Required            | Display text for the tab                                     |
| `active`   | `boolean`          | `false`             | Whether the tab is active (only used when not inside GaTabs) |
| `disabled` | `boolean`          | `false`             | Whether the tab is disabled                                  |
| `to`       | `string \| object` | `undefined`         | Vue Router destination (if using router integration)         |
| `icon`     | `Component`        | `undefined`         | Icon component to display before label                       |

## Features

- Two-way binding with v-model for active tab
- Vue Router integration
- Responsive design with overflow handling via a "more" dropdown menu
- Custom tab alignment (start, center, or end)
- Support for icons in tabs
- Disabled tab states
- Two usage patterns (props or child components)

## Important Notes

1. When using GaTab components, do not provide the `tabs` prop to avoid duplicated tabs.
2. When using GaTab components, place them in the `tabs` slot (not the default slot).
3. Tab content should always be placed in the default slot (not a named slot).
4. The overflow functionality works with both approaches (using `tabs` prop or GaTab components).
