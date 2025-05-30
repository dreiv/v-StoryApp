<script setup lang="ts">
import { computed, provide, useCssModule, reactive } from 'vue'
import type { vTooltip } from 'floating-vue'

import { uniqueId } from '@/core/utils/uniqueId'
import GaFormInfo from '../GaFormInfo.vue'
import { formFieldKey, type FormFieldContext } from './types'

export interface FormFieldProps extends FormFieldContext {
  info?: string
  label?: string
  state?: string
  tooltip?: typeof vTooltip
}

const { id = uniqueId('form-field'), disabled, error } = defineProps<FormFieldProps>()

provide(
  formFieldKey,
  reactive({
    id,
    get disabled() {
      return disabled
    },
    get error() {
      return error
    },
  }),
)

const style = useCssModule()
const classes = computed(() => [style.formField, { [style.disabled]: disabled }])
</script>

<template>
  <div :class="classes">
    <label :class="$style.label" v-if="$slots.label || label" :for="id">
      <span :class="$style.text" v-tooltip="tooltip" :tabindex="tooltip && 0">
        <slot name="label">{{ label }}</slot>
      </span>

      <span :class="$style.state" v-if="$slots.state || state">
        <slot name="state">{{ state }}</slot>
      </span>
    </label>

    <slot />

    <div :class="$style.info" v-if="$slots.info || info">
      <slot name="info"><ga-form-info :label="info" /></slot>
    </div>
  </div>
</template>

<style module>
.formField {
  display: flex;
  flex-direction: column;
  gap: var(--ga-size-spacing-03);

  &.disabled {
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
</style>
