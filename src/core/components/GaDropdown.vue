<script setup lang="ts">
import { onBeforeUnmount, provide, ref, useTemplateRef } from 'vue'
import { Dropdown } from 'floating-vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'

import { useSelectableChildren } from '@/core/composables/useSelectableChildren'
import { useKeyboardNavigation } from '@/core/composables/useKeyboardNavigation'

import GaButton from './GaButton.vue'
import { dropdownKey } from '../constants'

export interface DropdownProps {
  title?: string
}

const buttonRef = useTemplateRef<HTMLButtonElement>('buttonRef')
const model = defineModel<string | number>({ default: '' })
const emit = defineEmits(['onChange'])

const shown = ref(false)

const { selectableChildren, registerChild, unregisterChild } = useSelectableChildren()
const { resetActiveIndex } = useKeyboardNavigation(selectableChildren, shown)

defineProps<DropdownProps>()

function onChange(value: string | number) {
  if (value === undefined) return

  model.value = value
  emit('onChange', value)
  shown.value = false
}

provide(dropdownKey, { onChange, registerChild, unregisterChild, model })
defineExpose({ buttonRef })

onBeforeUnmount(() => {
  resetActiveIndex()
})

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    shown.value = true
  }
}
</script>

<template>
  <dropdown v-model:shown="shown" @keydown="handleKeyDown">
    <ga-button ref="buttonRef" aria-haspopup="listbox" :aria-expanded="shown" v-bind="$attrs">
      {{ title }}
      <component :is="shown ? ChevronUp : ChevronDown" />
    </ga-button>

    <template #popper>
      <slot />
    </template>
  </dropdown>
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
