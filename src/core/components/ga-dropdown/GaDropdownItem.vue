<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, useCssModule } from 'vue'
import { uniqueId } from '@/core/utils/uniqueId'
import { dropdownKey } from './types'

export interface DropdownItemProps {
  label?: string
  value?: string | number
  disabled?: boolean
  keyLine?: boolean
}

const { value, disabled, keyLine } = defineProps<DropdownItemProps>()
const style = useCssModule()

const itemId = uniqueId('ga-dropdown-item')

const parent = inject(dropdownKey)
if (!parent) throw new Error('GaDropdownItem must be used inside a GaDropdown')

const isSelected = computed(() => value === parent?.model?.value)

onMounted(() => {
  if (parent) parent.registerChild({ id: itemId, value, disabled })
})

onBeforeUnmount(() => {
  if (parent) parent.unregisterChild({ value })
})

const classes = computed(() => [
  style.item,
  { [style.keyLine]: keyLine },
  { [style.disabled]: disabled },
  { [style.focused]: value === parent?.focusedValue?.value },
  { [style.selected]: isSelected.value },
])

function handleClick() {
  if (!disabled && value) parent!.onChange(value)
}
</script>

<template>
  <div
    :id="itemId"
    :class="classes"
    role="option"
    :aria-selected="isSelected"
    :aria-disabled="disabled"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </div>
</template>

<style module>
.item {
  display: flex;
  align-items: center;
  gap: var(--ga-size-spacing-03);

  padding: 0 var(--ga-size-spacing-04);
  height: 2.25rem; /* TODO: fix */

  font-weight: var(--ga-font-weight-normal);
  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
  letter-spacing: var(--ga-text-md-tracking);

  &:not(.disabled, .selected) {
    cursor: pointer;
  }

  &.focused {
    outline: var(--ga-size-border-width-md) solid var(--ga-color-border-focus);
    outline-offset: -2px; /* TODO: fix */
    border-radius: var(--ga-radius);
  }

  &:hover {
    background-color: var(--ga-color-border-action-hover-2);
  }

  &.selected {
    background-color: var(--ga-color-surface-success);
  }

  &.disabled {
    cursor: not-allowed;
    background-color: var(--ga-color-surface-disabled);

    &.selected {
      background-color: var(--ga-color-surface-disable-selected);
    }
  }
}

.keyLine {
  position: relative;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    left: var(--ga-size-spacing-04);
    background-color: var(--ga-color-border-primary);
    height: var(--ga-size-border-width-sm);
    content: '';
  }
}
</style>
