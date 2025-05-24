<script setup lang="ts">
const { label } = defineProps<{ label?: string }>()
</script>

<template>
  <div :class="$style.formField">
    <slot name="label">
      <label :class="$style.label">{{ label }}</label>
    </slot>

    <slot />

    <slot name="info" />
  </div>
</template>

<style module>
.formField {
  display: flex;
  flex-direction: column;
  gap: var(--ga-size-spacing-03);
}

.label {
  display: inline-flex;
}
</style>
