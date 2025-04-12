<script setup lang="ts">
import { type InputHTMLAttributes } from 'vue'

export interface FormFieldProps extends /* @vue-ignore */ InputHTMLAttributes {
  label?: string
}

defineProps<FormFieldProps>()
</script>

<template>
  <label :class="$style.field" v-bind="$attrs">
    <slot />

    <span :class="$style.label">
      <slot name="label">{{ label }}</slot>
    </span>
  </label>
</template>

<style module>
.field {
  display: inline-flex;
  position: relative;
  gap: var(--ga-size-spacing-03);

  user-select: none;
}

.label {
  font-weight: var(--ga-font-weight-normal);
  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
  font-family: var(--ga-font-family-primary);
  letter-spacing: var(--ga-text-md-tracking);

  &:empty {
    display: none;
  }
}
</style>
