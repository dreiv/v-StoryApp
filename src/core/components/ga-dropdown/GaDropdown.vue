<script setup lang="ts">
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import { Dropdown } from 'floating-vue'
import { provide, ref, useTemplateRef } from 'vue'

import GaButton from '../ga-button/GaButton.vue'
import { dropdownKey } from './types'
import { useDropdownLogic } from './useDropdownLogic'

export interface DropdownProps {
  title?: string
}

const buttonRef = useTemplateRef<HTMLButtonElement>('buttonRef')
const model = defineModel<string | number>()
const emit = defineEmits(['change'])

const shown = ref(false)

defineProps<DropdownProps>()

function onChange(value: string | number) {
  model.value = value
  emit('change', value)
  shown.value = false
}

const { focusedId, focusedValue, registerChild, unregisterChild, handleKeyDown } = useDropdownLogic(
  shown,
  model,
  onChange,
)

provide(dropdownKey, {
  onChange,
  registerChild,
  unregisterChild,
  focusedValue,
  model,
})

defineExpose({ buttonRef })
</script>

<template>
  <dropdown v-model:shown="shown" @keydown="handleKeyDown" @blur="shown = false" no-auto-focus>
    <ga-button ref="buttonRef" aria-haspopup="listbox" :aria-expanded="shown" v-bind="$attrs">
      <slot name="title">{{ title }}</slot>
      <component :is="shown ? ChevronUp : ChevronDown" />
    </ga-button>

    <template #popper>
      <div role="listbox" :aria-activedescendant="focusedId">
        <slot />
      </div>
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
