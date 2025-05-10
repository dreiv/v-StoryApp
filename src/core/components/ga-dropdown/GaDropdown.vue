<script setup lang="ts">
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import { Dropdown } from 'floating-vue'
import { provide, ref, useTemplateRef } from 'vue'

import GaButton from '../ga-button/GaButton.vue'
import { dropdownKey } from '@/core/constants'
import { useDropdownLogic } from './useDropdownLogic'

export interface DropdownProps {
  title?: string
}

const buttonRef = useTemplateRef<HTMLButtonElement>('buttonRef')
const model = defineModel<string | number>({ default: '' })
const emit = defineEmits(['change'])

const shown = ref(false)

defineProps<DropdownProps>()

const { activeChild, registerChild, unregisterChild, handleKeyDown, selectItem } = useDropdownLogic(
  shown,
  model,
  (value) => emit('change', value),
)

provide(dropdownKey, {
  onChange: selectItem,
  registerChild,
  unregisterChild,
  activeChild,
  model,
})

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
