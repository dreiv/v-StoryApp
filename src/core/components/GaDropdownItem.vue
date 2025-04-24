<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, useCssModule, useTemplateRef } from 'vue'
import { dropdownKey } from '../constants'

export interface DropdownItemProps {
  label?: string
  value?: string | number
  disabled?: boolean
  keyLine?: boolean
}

const itemRef = useTemplateRef<HTMLElement>('itemRef')
const { value, disabled, keyLine } = defineProps<DropdownItemProps>()
const style = useCssModule()

const parent = inject(dropdownKey)
if (!parent) throw new Error('GaDropdownItem must be used inside a GaDropdown')

onMounted(() => {
  if (parent) parent.registerChild(itemRef.value!)
})

onBeforeUnmount(() => {
  if (parent) parent.unregisterChild(itemRef.value!)
})

const classes = computed(() => [
  style.item,
  { [style.keyLine]: keyLine },
  { [style.selected]: parent!.model?.value === value },
])

function handleClick() {
  if (value !== undefined && parent!.model) {
    parent!.onChange(value)
  }
}
</script>

<template>
  <div ref="itemRef" :class="classes" :disabled="disabled" @click="handleClick" :data-value="value">
    <slot>{{ label }}</slot>
  </div>
</template>

<style module>
.item {
  display: flex;
  align-items: center;
  gap: var(--ga-size-spacing-03);

  outline-color: var(--ga-color-border-focus);
  outline-width: var(--ga-size-border-width-md);
  outline-offset: -1px; /* TODO: fix */

  border: 0;
  border-radius: 2px;
  background-color: var(--ga-color-surface-primary);
  padding: 0 var(--ga-size-spacing-04);
  height: 2.25rem; /* TODO: fix */

  font-weight: var(--ga-font-weight-normal);
  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
  letter-spacing: var(--ga-text-md-tracking);

  text-align: left;

  &:enabled {
    cursor: pointer;
  }

  &:hover {
    background-color: var(--ga-color-border-action-hover-2);
  }

  &.selected {
    background-color: var(--ga-color-surface-success);
  }

  &:disabled {
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
