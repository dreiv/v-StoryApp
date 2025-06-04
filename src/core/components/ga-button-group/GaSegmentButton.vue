<script setup lang="ts">
import { inject } from 'vue'
import { buttonGroupKey } from './types'

export interface SegmentButtonProps {
  value?: string | number
  disabled?: boolean
}
defineProps<SegmentButtonProps>()

const group = inject(buttonGroupKey)
if (!group) throw new Error('GaSegmentButton must be used inside a GaButtonGroup')
</script>

<template>
  <label :class="$style.button">
    <input
      type="radio"
      :class="$style.native"
      :value
      :disabled
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
  user-select: none;

  &:has(input:enabled) {
    cursor: pointer;
  }

  &:has(input:focus-visible) {
    outline: var(--ga-size-border-width-md) solid var(--ga-color-border-focus);
    outline-offset: var(--ga-size-spacing-01);
  }

  &:has(input:checked) {
    border-color: var(--ga-color-border-focus);
  }

  &:has(input:not(:active, :disabled):is(:hover, :focus)) {
    border-color: var(--ga-color-border-focus);
    background-color: var(--ga-color-border-action-hover-2);
  }

  &:has(input:disabled) {
    cursor: not-allowed;
    color: var(--ga-color-text-disabled);
  }
}

.native {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
</style>
