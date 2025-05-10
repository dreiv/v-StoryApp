<script setup lang="ts">
import { computed, provide, useCssModule } from 'vue'
import { radioGroupKey } from '@/core/constants'
import { uniqueId } from '@/core/utils/uniqueId'

export interface RadioGroupProps {
  title?: string
  name?: string
  direction?: 'horizontal' | 'vertical'
}

const { direction = 'vertical', name = uniqueId('group') } = defineProps<RadioGroupProps>()
const model = defineModel<string>({ default: '' })
const style = useCssModule()

const classes = computed(() => [style.content, { [style.horizontal]: direction === 'horizontal' }])

provide(radioGroupKey, { name, model })
</script>

<template>
  <fieldset :class="$style.group">
    <legend :class="$style.title">
      <slot name="title">{{ title }}</slot>
    </legend>

    <div :class="classes">
      <slot />
    </div>
  </fieldset>
</template>

<style module>
.group {
  margin: 0;
  border: none;
  padding: 0;
}

.title {
  padding-left: 0;

  font-weight: var(--font-weight-medium);
  line-height: var(--text-md--line-height);
  font-family: var(--default-font-family);

  &:not(:empty) {
    margin-bottom: var(--ga-size-spacing-03);
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--ga-size-spacing-03);

  &.horizontal {
    flex-direction: row;
  }
}
</style>
