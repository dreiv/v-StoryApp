<script setup lang="ts">
import { computed, inject, useCssModule } from 'vue'
import GaButton from '../ga-button/GaButton.vue'
import { buttonGroupKey } from './types'

export interface SegmentButtonProps {
  value?: string | number
}
const { value } = defineProps<SegmentButtonProps>()
const style = useCssModule()

const group = inject(buttonGroupKey)
if (!group) throw new Error('GaSegmentButton must be used inside a GaButtonGroup')

const classes = computed(() => [style.button, { [style.selected]: value === group?.model?.value }])

function handleClick() {
  if (group?.model && value !== undefined) group.model.value = value
}
</script>

<template>
  <ga-button :class="classes" @click="handleClick"><slot /></ga-button>
</template>

<style module>
.button:not(.selected) {
  border: transparent;
  background-color: transparent;
}
</style>
