<script setup lang="ts">
import { inject } from 'vue'
import { buttonGroupKey } from './types'

export interface SegmentButtonProps {
  value?: string | number
}
const { value } = defineProps<SegmentButtonProps>()

const group = inject(buttonGroupKey)
if (!group) throw new Error('GaSegmentButton must be used inside a GaButtonGroup')
</script>

<template>
  <label :class="$style.button">
    <input
      type="radio"
      :class="$style.native"
      :value
      :name="group.name"
      :checked="group.model.value === value"
      @change="group.model.value = value as string"
    />

    <slot />
  </label>
</template>

<style module>
.button {
  display: inline-flex;
  position: relative;
  align-items: center;
  gap: var(--ga-size-spacing-03);
  border: var(--ga-size-border-width-sm) solid transparent;

  border-radius: var(--ga-radius);
  padding-inline: var(--ga-size-spacing-05);
  height: 2.25rem; /* TODO: fix */

  &:has(input:enabled) {
    cursor: pointer;
  }

  &:has(input:checked) {
    border-color: var(--ga-color-border-focus);
  }
  &:has(input:hover) {
    border-color: var(--ga-color-border-focus);
    background-color: var(--ga-color-border-action-hover-2);
  }
}

.native {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
</style>
