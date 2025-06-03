<script setup lang="ts">
import { computed, inject, useCssModule } from 'vue'
import { buttonGroupKey } from './types'

export interface SegmentButtonProps {
  value?: string | number
}
const { value } = defineProps<SegmentButtonProps>()
const style = useCssModule()

const group = inject(buttonGroupKey)
if (!group) throw new Error('GaSegmentButton must be used inside a GaButtonGroup')

const classes = computed(() => [style.button, { [style.selected]: value === group?.model?.value }])
</script>

<template>
  <label :class="classes">
    <input
      type="radio"
      :value
      :name="group.name"
      :checked="group.model.value === value"
      @change="group.model.value = value as string"
    />

    <slot />
  </label>
</template>

<style module>
.button:not(.selected) {
  border: transparent;
  background-color: transparent;
}
</style>
