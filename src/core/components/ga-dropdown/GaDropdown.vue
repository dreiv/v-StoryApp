<script setup lang="ts">
import { provide, ref, useTemplateRef } from 'vue'
import { Dropdown } from 'floating-vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'

import GaButton from '../GaButton.vue'
import { dropdownKey } from '@/core/constants'
import type { DropdownItemProps } from './GaDropdownItem.vue'

export interface DropdownProps {
  title?: string
}

const buttonRef = useTemplateRef<HTMLButtonElement>('buttonRef')
const model = defineModel<string | number>({ default: '' })
const emit = defineEmits(['change'])

const shown = ref(false)

defineProps<DropdownProps>()

function onChange(value: string | number) {
  if (value === undefined) return

  model.value = value
  emit('change', value)
  shown.value = false
}

const children = ref<DropdownItemProps[]>([])

const activeChild = ref()
function registerChild(child: Partial<DropdownItemProps>) {
  // Register child component
  console.log('Registering child:', child)

  children.value.push(child as DropdownItemProps)

  if (child.value === model.value) {
    activeChild.value = child.value
  }
}
function unregisterChild(childToRemove: Partial<DropdownItemProps>) {
  // Unregister child component
  console.log('Unregistering child:', childToRemove)
  children.value = children.value.filter((child) => child.value !== childToRemove.value)

  if (activeChild.value) activeChild.value = null
}

provide(dropdownKey, { onChange, registerChild, unregisterChild, activeChild, model })

function findNextEnabled(startIndex: number, direction: 1 | -1): string | number | undefined {
  console.log('Finding next enabled item from index:', startIndex, 'direction:', direction)

  let currentIndex = startIndex
  const itemCount = children.value.length

  for (let i = 0; i < itemCount; i++) {
    currentIndex = (currentIndex + direction + itemCount) % itemCount // Wrap around
    if (!children.value[currentIndex]?.disabled) {
      return children.value[currentIndex]?.value
    }
  }
  return undefined // No enabled item found
}

function focusNext() {
  if (children.value.length === 0) return

  const currentIndex = children.value.findIndex((child) => child.value === activeChild.value)
  const nextEnabledValue = findNextEnabled(currentIndex, 1)
  if (nextEnabledValue !== undefined) {
    activeChild.value = nextEnabledValue
  }
}

function focusPrevious() {
  if (children.value.length === 0) return

  const currentIndex = children.value.findIndex((child) => child.value === activeChild.value)
  const previousEnabledValue = findNextEnabled(currentIndex, -1)
  if (previousEnabledValue !== undefined) {
    activeChild.value = previousEnabledValue
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (!shown.value) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      shown.value = true
      // When opening with arrow keys, focus the first enabled item
      const firstEnabled = children.value.find((child) => !child.disabled)?.value
      if (firstEnabled) {
        activeChild.value = firstEnabled
      }
    }
    return
  } else {
    if (event.key === 'ArrowDown') {
      focusNext()
    } else if (event.key === 'ArrowUp') {
      focusPrevious()
    } else if (event.key === 'Home') {
      event.preventDefault()
      activeChild.value = children.value.find((child) => !child.disabled)?.value
    } else if (event.key === 'End') {
      event.preventDefault()
      // Find the last enabled item
      for (let i = children.value.length - 1; i >= 0; i--) {
        if (!children.value[i]?.disabled) {
          activeChild.value = children.value[i]?.value
          break
        }
      }
    } else if (event.key === 'Enter' && activeChild.value !== undefined) {
      // Find the active child in the children array and trigger onChange
      const selectedChild = children.value.find((child) => child.value === activeChild.value)
      if (selectedChild && !selectedChild.disabled) {
        onChange(selectedChild.value!)
      }
    } else if (event.key === 'Escape') {
      shown.value = false
    }
  }
}

defineExpose({ buttonRef })
</script>

<template>
  <dropdown v-model:shown="shown" @keydown="handleKeyDown" no-auto-focus>
    <ga-button ref="buttonRef" aria-haspopup="listbox" :aria-expanded="shown" v-bind="$attrs">
      {{ title }}
      <component :is="shown ? ChevronUp : ChevronDown" />
    </ga-button>

    <template #popper>
      <slot />
    </template>
  </dropdown>

  {{ children }}
</template>

<style>
.v-popper--theme-dropdown {
  .v-popper__inner {
    border: var(--ga-size-border-width-sm) solid var(--ga-color-border-primary);
    border-radius: var(--ga-radius);

    > div {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      overflow-y: auto;
    }
  }

  .v-popper__arrow-container {
    display: none;
  }
}
</style>
