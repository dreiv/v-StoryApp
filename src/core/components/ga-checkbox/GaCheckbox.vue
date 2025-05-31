<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { CheckIcon, MinusIcon } from 'lucide-vue-next'
import { useFormInput, type FormInputProps } from '@/core/composables/useFormInput'

export interface CheckboxProps extends FormInputProps {
  state?: string
}

defineOptions({ inheritAttrs: false })
const props = defineProps<CheckboxProps>()

const { classes, aria } = useFormInput(props)
const inputRef = useTemplateRef<HTMLElement>('inputRef')
const model = defineModel<boolean>()

defineExpose({ inputRef })
</script>

<template>
  <label :class="classes" v-bind="aria">
    <input ref="inputRef" type="checkbox" :class="$style.native" v-model="model" v-bind="$attrs" />
    <div :class="$style.marker">
      <CheckIcon :class="$style.checked" :size="12" :stroke-width="4" />
      <MinusIcon :class="$style.indeterminate" :size="12" :stroke-width="4" />
    </div>

    <div :class="$style.label" v-if="$slots.default || label">
      <span :class="$style.text">
        <slot>{{ label }}</slot>
      </span>

      <span :class="$style.state" v-if="$slots.state || state">
        <slot name="state">{{ state }}</slot>
      </span>
    </div>
  </label>
</template>

<style module>
.input {
  display: inline-flex;
  position: relative;
  gap: var(--ga-size-spacing-01);
  width: fit-content;

  user-select: none;
}

.native,
.marker {
  margin: var(--ga-size-spacing-01);
  width: var(--ga-size-spacing-05);
  height: var(--ga-size-spacing-05);
}

.marker {
  position: absolute;
  top: 0;
  left: 0;

  border: var(--ga-size-border-width-md) solid var(--ga-color-border-action);
  border-radius: var(--ga-radius);

  pointer-events: none;
  color: var(--ga-color-icon-on-primary);

  & > .checked,
  & > .indeterminate {
    display: none;
  }
}

.native {
  flex-shrink: 0;
  opacity: 0;
  cursor: pointer;

  &:focus-visible + .marker {
    outline: var(--ga-size-border-width-md) solid var(--ga-color-border-focus);
    outline-offset: var(--ga-size-spacing-01);
  }

  &:hover:enabled {
    &:not(:checked, :indeterminate) + .marker {
      border-color: var(--ga-color-border-action-hover);
      background-color: var(--ga-color-surface-action-hover-2);
    }

    &:checked + .marker,
    &:indeterminate + .marker {
      background-color: var(--ga-color-surface-action-hover);
    }
  }

  &:checked + .marker,
  &:indeterminate + .marker {
    background-color: var(--ga-color-surface-action);
  }
  &:checked + .marker > .checked {
    display: block;
  }
  &:indeterminate + .marker > .indeterminate {
    display: block;
  }

  &:disabled {
    cursor: not-allowed;

    + .marker {
      border-color: var(--ga-color-border-disabled);
      background-color: var(--ga-color-surface-disabled);
      color: var(--ga-color-icon-on-disabled);
    }

    ~ .label {
      color: var(--ga-color-text-disabled);
    }
  }
}

.error {
  > .marker {
    border-color: var(--ga-color-border-error);
    background-color: var(--ga-color-surface-error);
    color: var(--ga-color-icon-error);
  }

  > .native {
    &:checked + .marker,
    &:indeterminate + .marker {
      background-color: var(--ga-color-surface-error);
    }
    &:hover:enabled + .marker {
      border-color: var(--ga-color-border-error-hover);
      background-color: var(--ga-color-surface-action-hover-2);
    }
  }
}

.label {
  display: inline-flex;
  gap: var(--ga-size-spacing-02);
  padding-inline: var(--ga-size-spacing-02);

  width: fit-content;
}

.text {
  font-weight: var(--ga-font-weight-normal);
  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
}

.state {
  font-size: var(--ga-text-sm-font-size);
  line-height: var(--ga-text-sm-line-height);
}
</style>
