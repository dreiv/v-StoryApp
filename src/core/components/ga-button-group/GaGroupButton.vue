<script setup lang="ts">
import { computed, inject, useCssModule, useTemplateRef } from 'vue'
import { buttonGroupKey } from './types'

export interface SegmentButtonProps {
  value?: string | number
  label?: string
  icon?: boolean
  disabled?: boolean
}
const { icon, value, disabled, label } = defineProps<SegmentButtonProps>()
const inputRef = useTemplateRef<HTMLElement>('inputRef')

const group = inject(buttonGroupKey)
if (!group) throw new Error('GaSegmentButton must be used inside a GaButtonGroup')

const style = useCssModule()
const classes = computed(() => [style.button, { [style.icon]: icon }])

defineExpose({ inputRef })
</script>

<template>
  <label :class="classes">
    <input
      ref="inputRef"
      type="radio"
      :class="$style.native"
      :disabled="disabled"
      :name="group.name"
      :checked="group.model.value === value"
      @change="group.model.value = value as string"
      v-bind="$attrs"
    />

    <slot>{{ label }}</slot>
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
  min-width: 2.25rem; /* TODO: fix */
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
    background-color: var(--ga-color-surface-primary);
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

.icon {
  justify-content: center;
  padding: 0;

  &:has(input:not(:active, :disabled):is(:hover)) {
    color: var(--ga-color-icon-action-hover);
  }
}
</style>
