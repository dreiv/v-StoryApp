<script setup lang="ts"></script>

<template>
  <div :class="$style.segmentedControl">
    <slot />
  </div>
</template>

<style module>
.segmentedControl {
  display: inline-flex;
  gap: var(--ga-size-spacing-01);
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-primary);
  border-radius: var(--ga-radius);
  padding: var(--ga-size-spacing-02);
}
</style>
