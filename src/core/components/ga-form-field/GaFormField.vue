<script setup lang="ts">
const { label } = defineProps<{ label?: string }>()
</script>

<template>
  <div :class="$style.formField">
    <label :class="$style.label" v-if="$slots.label || label">
      <slot name="label">{{ label }}</slot>
    </label>

    <slot />

    <div :class="$style.info" v-if="$slots.info">
      <slot name="info" />
    </div>
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
  gap: var(--ga-size-spacing-02);
  padding: 0 var(--ga-size-spacing-02);

  width: fit-content;
  font-weight: var(--ga-font-weight-medium);
}

.info {
  display: flex;
  align-items: center;
  gap: var(--ga-size-spacing-02);

  font-size: var(--ga-text-xs-font-size);
  line-height: var(--ga-text-xs-line-height);
  letter-spacing: var(--ga-text-xs-tracking);
}
</style>
