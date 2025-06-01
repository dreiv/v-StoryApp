<script setup lang="ts">
import { provide } from 'vue'
import { buttonGroupKey } from './types'

const model = defineModel<string>({ default: '' })

provide(buttonGroupKey, { model })
</script>

<template>
  <div :class="$style.group">
    <slot />
  </div>
</template>

<style module>
.group {
  display: inline-flex;
  gap: var(--ga-size-spacing-01);
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-primary);
  border-radius: var(--ga-radius);
  padding: var(--ga-size-spacing-02);
}
</style>
