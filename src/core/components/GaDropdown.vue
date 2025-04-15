<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { Dropdown } from 'floating-vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'

import GaButton from './GaButton.vue'

export interface DropdownProps {
  title?: string
}

const buttonRef = useTemplateRef<HTMLElement>('buttonRef')
const shown = ref(false)

defineProps<DropdownProps>()

defineExpose({ buttonRef })
</script>

<template>
  <dropdown v-model:shown="shown" :arrow="false">
    <ga-button ref="buttonRef" v-bind="$attrs">
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
  }

  .v-popper__arrow-container {
    display: none;
  }
}
</style>
