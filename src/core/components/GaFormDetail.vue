<script setup lang="ts">
defineProps<{ label?: string }>()
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.iconWrapper">
      <slot name="icon" />
    </div>

    <slot>{{ label }}</slot>
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  gap: var(--ga-size-spacing-03);

  font-size: var(--ga-text-xs-font-size);
  line-height: var(--ga-text-xs-line-height);
  font-family: var(--ga-font-family-primary);
  letter-spacing: var(--ga-text-xs-tracking);
}

.iconWrapper {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  align-self: start;
  box-sizing: content-box;

  margin: var(--ga-size-spacing-01) 0 var(--ga-size-spacing-01) var(--ga-size-spacing-01);
  width: var(--ga-size-spacing-05);
  height: var(--ga-size-spacing-05);

  overflow: hidden;
}
</style>
