<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { Dropdown } from 'floating-vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'

import GaButton from './GaButton.vue'

export interface DropdownProps {
  label?: string
}

const buttonRef = useTemplateRef<HTMLElement>('buttonRef')
const shown = ref(false)

defineProps<DropdownProps>()

defineExpose({ buttonRef })
</script>

<template>
  <dropdown v-model:shown="shown">
    <ga-button ref="buttonRef" v-bind="$attrs">
      {{ label }}
      <component :is="shown ? ChevronUp : ChevronDown" />
    </ga-button>

    <template #popper>
      <slot />
    </template>
  </dropdown>
</template>
