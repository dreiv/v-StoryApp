<script setup lang="ts">
import { provide } from 'vue'
import { uniqueId } from '@/core/utils/uniqueId'
import { formFieldKey } from './types'

export interface FormFieldProps {
  id?: string
  label?: string
}

const { id = uniqueId('form-field'), label } = defineProps<FormFieldProps>()

provide(formFieldKey, { id })
</script>

<template>
  <div :class="$style.formField">
    <label :class="$style.label" v-if="$slots.label || label" :for="id">
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
  padding-inline: var(--ga-size-spacing-02);

  width: fit-content;
  height: 1.25rem; /* TODO: fix */
  font-weight: var(--ga-font-weight-medium);
  line-height: var(--ga-text-md-line-height);
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
