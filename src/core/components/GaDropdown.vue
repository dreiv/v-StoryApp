<script setup lang="ts">
import { provide, ref, useTemplateRef } from 'vue'
import { Dropdown } from 'floating-vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'

import GaButton from './GaButton.vue'
import { dropdownKey } from '../constants'

export interface DropdownProps {
  title?: string
}

const buttonRef = useTemplateRef<HTMLElement>('buttonRef')
const model = defineModel<string>({ default: '' })

const shown = ref(false)
const activeIndex = ref(-1)

defineProps<DropdownProps>()

provide(dropdownKey, { activeIndex, model })
defineExpose({ buttonRef })
</script>

<template>
  <dropdown v-model:shown="shown">
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
