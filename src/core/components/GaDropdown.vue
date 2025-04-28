<script setup lang="ts">
import { provide, ref, useTemplateRef } from 'vue'
import { Dropdown } from 'floating-vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'

import GaButton from './GaButton.vue'
import { dropdownKey } from '../constants'
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

function focusNext() {
  if (children.value.length === 0) return

  const currentIndex = children.value.findIndex((child) => child.value === activeChild.value)
  const nextIndex = currentIndex >= children.value.length - 1 ? 0 : currentIndex + 1
  activeChild.value = children.value[nextIndex].value
}

function focusPrevious() {
  if (children.value.length === 0) return

  const currentIndex = children.value.findIndex((child) => child.value === activeChild.value)
  const prevIndex = currentIndex <= 0 ? children.value.length - 1 : currentIndex - 1
  activeChild.value = children.value[prevIndex].value
}

function handleKeyDown(event: KeyboardEvent) {
  if (!shown.value) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      shown.value = true
    }
    return
  } else {
    if (event.key === 'ArrowDown') {
      focusNext()
    } else if (event.key === 'ArrowUp') {
      focusPrevious()
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
