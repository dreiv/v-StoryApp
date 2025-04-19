<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, ref, useTemplateRef } from 'vue'
import { Dropdown } from 'floating-vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'

import GaButton from './GaButton.vue'
import { dropdownKey } from '../constants'

export interface DropdownProps {
  title?: string
}

const buttonRef = useTemplateRef<HTMLElement>('buttonRef')
const model = defineModel<string | number>({ default: '' })
const emit = defineEmits(['onChange'])

const shown = ref(false)
const activeIndex = ref(-1)
const selectableChildren = ref<HTMLElement[]>([])

defineProps<DropdownProps>()

function registerChild(child: HTMLElement) {
  return selectableChildren.value.push(child)
}
function unregisterChild(childToRemove: HTMLElement) {
  const index = selectableChildren.value.indexOf(childToRemove)

  if (index !== -1) {
    selectableChildren.value.splice(index, 1)

    // Adjust activeIndex if the removed element was before or at the current focus
    if (activeIndex.value >= selectableChildren.value.length) {
      activeIndex.value = selectableChildren.value.length - 1
    } else if (index <= activeIndex.value && activeIndex.value !== -1) {
      activeIndex.value--
    }
  }
}

function onChange(value: string | number) {
  if (value === undefined) return

  model.value = value
  emit('onChange', value)
}

provide(dropdownKey, { onChange, registerChild, unregisterChild, activeIndex, model })
defineExpose({ buttonRef })

// TEMP
const focusNext = () => {
  if (selectableChildren.value.length > 0) {
    activeIndex.value = (activeIndex.value + 1) % selectableChildren.value.length
    selectableChildren.value[activeIndex.value]?.focus()
  }
}

const focusPrevious = () => {
  if (selectableChildren.value.length > 0) {
    activeIndex.value =
      (activeIndex.value - 1 + selectableChildren.value.length) % selectableChildren.value.length
    selectableChildren.value[activeIndex.value]?.focus()
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowDown') {
    focusNext()
  } else if (event.key === 'ArrowUp') {
    focusPrevious()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
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
  {{ selectableChildren }}
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
