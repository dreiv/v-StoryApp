<script setup lang="ts">
import { Tooltip } from 'floating-vue'

defineProps<{ content?: string }>()
</script>

<template>
  <tooltip>
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
  </tooltip>
</template>

<style module>
.header {
  margin-bottom: var(--ga-size-spacing-02);
  font-weight: var(--ga-font-weight-semibold);
  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
  font-family: var(--ga-font-family-primary);
  letter-spacing: var(--ga-text-md-tracking);
}

.footer {
  display: flex;
  gap: var(--ga-size-spacing-03);
  margin-top: var(--ga-size-spacing-05);
}
</style>

<style>
.v-popper--theme-tooltip {
  display: inline-flex;
  font-weight: var(--ga-font-weight-normal);
  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
  font-family: var(--ga-font-family-primary);
  letter-spacing: var(--ga-text-md-tracking);

  .v-popper__inner {
    background-color: var(--ga-color-surface-action-hover);
    padding: var(--ga-size-spacing-03);
    color: var(--ga-color-text-on-action);
  }

  .v-popper__arrow-outer {
    border-color: var(--ga-color-surface-action-hover);
  }
}
</style>
