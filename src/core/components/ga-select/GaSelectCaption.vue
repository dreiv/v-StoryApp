<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <caption :class="$style.caption">
    <slot name="title">{{ title }}</slot>
  </caption>
</template>

<style module>
.caption {
  display: flex;
  align-items: center;

  padding: 0 var(--ga-size-spacing-04);
  height: 2.25rem; /* TODO: fix */

  font-weight: var(--ga-font-weight-semibold);
  font-size: var(--ga-text-sm-font-size);
  line-height: var(--ga-text-sm-line-height);
  letter-spacing: var(--ga-text-sm-tracking);
}
</style>
