<script setup lang="ts">
import { computed, provide, useCssModule } from 'vue'
import { uniqueId } from '@/core/utils/uniqueId'
import { radioGroupKey } from './types'

export interface RadioGroupProps {
  label?: string
  callout?: string
  state?: string
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
    <legend :class="$style.legend">
      <div :class="$style.label">
        <span :class="$style.text">
          <slot name="label">{{ label }}</slot>
        </span>

        <span :class="$style.state" v-if="$slots.state || state">
          <slot name="state">{{ state }}</slot>
        </span>
      </div>

      <span :class="$style.callout" v-if="$slots.callout || callout">
        <slot name="callout">{{ callout }}</slot>
      </span>
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

.legend {
  padding-left: 0;

  &:not(:empty) {
    margin-bottom: var(--ga-size-spacing-03);
  }
}

.label {
  display: flex;
  gap: var(--ga-size-spacing-02);
}

.callout {
  font-size: var(--ga-text-sm-font-size);
  line-height: var(--ga-text-sm-line-height);
}

.text {
  font-weight: var(--ga-font-weight-medium);
  line-height: var(--ga-text-md-line-height);
}

.state {
  font-size: var(--ga-text-sm-font-size);
  line-height: var(--ga-text-sm-line-height);
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
