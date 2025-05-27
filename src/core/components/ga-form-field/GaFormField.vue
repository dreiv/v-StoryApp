<script setup lang="ts">
import { computed, provide, useCssModule } from 'vue'
import type { vTooltip } from 'floating-vue'

import { uniqueId } from '@/core/utils/uniqueId'
import { formFieldKey } from './types'

export interface FormFieldProps {
  id?: string
  label?: string
  definition?: typeof vTooltip
  disabled?: boolean
  state?: string
}

const { id = uniqueId('form-field'), label, disabled } = defineProps<FormFieldProps>()

const style = useCssModule()
const classes = computed(() => [style.formField, { [style.disabled]: disabled }])

provide(formFieldKey, { id, disabled })
</script>

<template>
  <div :class="classes">
    <label :class="$style.label" v-if="$slots.label || label" :for="id">
      <span :class="$style.text" v-tooltip="definition" :tabindex="definition && 0">
        <slot name="label">{{ label }}</slot>
      </span>

      <span :class="$style.state" v-if="$slots.state || state">
        <slot name="state">{{ state }}</slot>
      </span>
    </label>

    <slot />

    <div :class="$style.info" v-if="$slots.info">
      <slot name="info" />
    </div>
  </div>
</template>

<style module>
.formField {
  display: flex;
  flex-direction: column;
  gap: var(--ga-size-spacing-03);

  &.disabled > .label {
    color: var(--ga-color-text-disabled);
  }
}

.label {
  display: inline-flex;
  gap: var(--ga-size-spacing-02);
  border-radius: var(--ga-radius);
  padding-inline: var(--ga-size-spacing-02);

  width: fit-content;
  height: 1.25rem; /* TODO: fix */

  &:focus-within {
    outline: var(--ga-size-border-width-md) solid var(--ga-color-border-focus);
    outline-offset: var(--ga-size-spacing-01);
  }
}

.text {
  outline: none;
  font-weight: var(--ga-font-weight-medium);
  line-height: 1.25rem; /* TODO: fix */
}

.state {
  font-size: var(--ga-text-sm-font-size);
  line-height: 1.25rem; /* TODO: fix */
}

.info {
  display: flex;
  align-items: center;
  gap: var(--ga-size-spacing-02);

  font-size: var(--ga-text-xs-font-size);
  line-height: var(--ga-text-xs-line-height);
  letter-spacing: var(--ga-text-xs-tracking);
}

:global(.v-popper--has-tooltip) {
  text-decoration: underline dotted 2px;
  text-underline-offset: 0.2em;
}
</style>
