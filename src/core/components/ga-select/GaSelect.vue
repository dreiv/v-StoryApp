<script setup lang="ts">
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import { Dropdown } from 'floating-vue'
import { provide, ref, useTemplateRef } from 'vue'

import GaButton from '../ga-button/GaButton.vue'
import { selectKey } from './types'
import { useSelectLogic } from './useSelectLogic'
import type { SelectItemProps } from './GaSelectItem.vue'

/**
 * Props for the GaSelect component
 *
 * The component supports the following slots:
 * - default: Contains the select items (GaSelectItem components)
 * - label: Content for the default button trigger label
 * - trigger: Custom trigger element replacing the default button.
 *   This slot receives props:
 *   - shown: boolean - Whether the dropdown is open
 *   - model: SelectItemProps - The currently selected item
 *   - label: string - The label prop passed to the select
 *   - ref-el: function - Use this to set the button reference for keyboard navigation
 *   - aria: object - ARIA attributes for accessibility
 */
export interface SelectProps {
  label?: string
}

const buttonRef = useTemplateRef<HTMLButtonElement>('buttonRef')
const model = defineModel<SelectItemProps>()
const emit = defineEmits(['change'])

const shown = ref(false)

defineProps<SelectProps>()

function onChange(value: SelectItemProps) {
  model.value = value
  emit('change', value)
  shown.value = false
}

const { focusedItem, registerChild, unregisterChild, handleKeyDown } = useSelectLogic(
  onChange,
  shown,
  model,
)

provide(selectKey, { focusedItem, model, onChange, registerChild, unregisterChild })
defineExpose({ buttonRef })
</script>

<template>
  <dropdown v-model:shown="shown" @keydown="handleKeyDown" @blur="shown = false" no-auto-focus>
    <template v-if="$slots.trigger">
      <slot
        name="trigger"
        :shown="shown"
        :model="model"
        :label="label"
        :ref-el="(el: HTMLButtonElement) => (buttonRef = el)"
        :aria="{ 'aria-haspopup': 'listbox', 'aria-expanded': shown }"
      />
    </template>
    <ga-button
      v-else
      ref="buttonRef"
      aria-haspopup="listbox"
      :aria-expanded="shown"
      v-bind="$attrs"
    >
      <slot name="label">{{ model?.label ? model?.label : label }}</slot>
      <component :is="shown ? ChevronUp : ChevronDown" />
    </ga-button>

    <template #popper>
      <div role="listbox" :aria-activedescendant="focusedItem?.id">
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
