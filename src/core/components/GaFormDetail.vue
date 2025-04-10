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

  font-size: var(--text-xs);
  line-height: var(--text-xs--line-height);
}

.iconWrapper {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  align-self: start;
  box-sizing: content-box;

  margin: var(--ga-size-2) 0 var(--ga-size-2) var(--ga-size-2);
  width: var(--ga-size-16);
  height: var(--ga-size-16);

  overflow: hidden;
}
</style>
