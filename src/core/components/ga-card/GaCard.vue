<script lang="ts" setup>
export interface GaCardProps {
  title?: string
}

defineProps<GaCardProps>()
</script>

<template>
  <div :class="$style.card">
    <header v-if="$slots.header || title" :class="$style.header">
      <slot name="header">{{ title }}</slot>
    </header>
    <slot />
  </div>
</template>

<style module>
.card {
  display: flex;
  flex-direction: column;
  gap: var(--ga-size-spacing-03);

  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-primary);
  border-radius: var(--ga-radius);
  padding: var(--ga-size-spacing-05);
}

.header {
  font-weight: var(--ga-font-weight-bold);
  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
  letter-spacing: var(--ga-text-md-tracking);
}
</style>
