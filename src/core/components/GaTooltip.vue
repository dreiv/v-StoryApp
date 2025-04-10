<script setup lang="ts">
import { PopperWrapper } from 'floating-vue'

defineProps<{ content?: string }>()
</script>

<template>
  <PopperWrapper theme="tooltip">
    <slot />

    <template #popper>
      <header :class="$style.header" v-if="$slots.header">
        <slot name="header" />
      </header>
      <slot name="content">{{ content }}</slot>

      <footer :class="$style.footer" v-if="$slots.footer">
        <slot name="footer" />
      </footer>
    </template>
  </PopperWrapper>
</template>

<style module>
.header {
  margin-bottom: var(--ga-size-4);
  font-weight: var(--font-weight-semibold);
}

.footer {
  display: flex;
  gap: var(--ga-size-spacing-03);
  margin-top: var(--ga-size-16);
}
</style>

<style>
.v-popper--theme-tooltip {
  display: inline-flex;

  .v-popper__inner {
    background-color: var(--ga-color-surface-action-hover);
    padding: var(--ga-size-8);
    color: var(--ga-color-text-on-action);
  }

  .v-popper__arrow-outer {
    border-color: var(--ga-color-surface-action-hover);
  }
}
</style>
