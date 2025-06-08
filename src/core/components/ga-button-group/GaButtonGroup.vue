<script setup lang="ts">
import { provide } from 'vue'
import { uniqueId } from '@/core/utils/uniqueId'
import { buttonGroupKey } from './types'

export interface ButtonGroupProps {
  name?: string
}

const { name = uniqueId('group') } = defineProps<ButtonGroupProps>()
const model = defineModel<string>({ default: '' })

provide(buttonGroupKey, { name, model })
</script>

<template>
  <fieldset :class="$style.group">
    <slot />
  </fieldset>
</template>

<style module>
.group {
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--ga-size-spacing-01);

  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-primary);
  border-radius: var(--ga-radius);
  padding: var(--ga-size-spacing-01);
}
</style>
