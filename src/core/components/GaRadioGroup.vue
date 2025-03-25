<script setup lang="ts">
import { computed, provide, useCssModule } from 'vue'
import { uniqueId } from '../utils/uniqueId'
import { radioGroupKey } from '../constants'

export interface RadioGroupProps {
  title?: string
  name?: string
  direction?: 'horizontal' | 'vertical'
}

const { direction = 'vertical', name = uniqueId('group') } = defineProps<RadioGroupProps>()
const style = useCssModule()

const classes = computed(() => [style.content, { [style.horizontal]: direction === 'horizontal' }])

provide(radioGroupKey, { name })
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

  .title {
    margin-bottom: var(--ga-size-8);
    padding-left: 0;

    font-weight: var(--font-weight-medium);
    line-height: var(--text-md--line-height);
    font-family: var(--default-font-family);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: var(--ga-size-8);

    &.horizontal {
      flex-direction: row;
    }
  }
}
</style>
