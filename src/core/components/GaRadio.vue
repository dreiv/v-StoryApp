<script setup lang="ts">
import { inject, useTemplateRef } from 'vue'
import { useFormInput, type FormInputProps } from '../composables/useFormInput'
import { radioGroupKey } from '../constants'

defineOptions({ inheritAttrs: false })
const props = defineProps<FormInputProps>()

const { classes, aria } = useFormInput(props)
const inputRef = useTemplateRef<HTMLElement>('inputRef')

const group = inject(radioGroupKey)
if (!group) throw new Error('GaRadio must be used inside a GaRadioGroup')

defineExpose({ inputRef })
</script>

<template>
  <label :class="classes" v-bind="aria">
    <input
      ref="inputRef"
      type="radio"
      :class="$style.native"
      :name="group.name"
      :checked="group.model.value === $attrs.value"
      @change="group.model.value = $attrs.value as string"
      v-bind="$attrs"
    />
    <div :class="$style.marker" />

    <span :class="$style.label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style module>
.input {
  display: inline-flex;
  position: relative;
  gap: var(--ga-size-spacing-03);
  user-select: none;
}

.native,
.marker {
  margin: var(--ga-size-spacing-01) 0 var(--ga-size-spacing-01) var(--ga-size-spacing-01);
  width: var(--ga-size-spacing-05);
  height: var(--ga-size-spacing-05);
}

.marker {
  position: absolute;
  top: 0;
  left: 0;

  border: var(--ga-size-border-width-md) solid var(--ga-color-border-action);
  border-radius: var(--ga-radius-round);

  pointer-events: none;
  color: var(--ga-color-icon-on-primary);
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
    + .marker {
      border-color: var(--ga-color-border-action-hover);
    }

    &:not(:checked) + .marker {
      background-color: var(--ga-color-surface-action-hover-2);
    }
  }

  &:checked + .marker {
    background-color: var(--ga-color-surface-action);

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      border-radius: var(--ga-radius-round);
      background-color: var(--ga-color-icon-on-primary);

      width: var(--ga-size-spacing-02);
      height: var(--ga-size-spacing-02);
      content: '';
    }
  }

  &:disabled {
    cursor: not-allowed;

    + .marker {
      border-color: var(--ga-color-border-disabled);
      background-color: var(--ga-color-surface-disabled);
      color: var(--ga-color-icon-on-disabled);
    }

    &:checked {
      + .marker::after {
        background-color: var(--ga-color-icon-on-disabled);
      }
      ~ .label {
        color: var(--ga-color-text-disable-selected);
      }
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
    &:checked:enabled + .marker {
      background-color: var(--ga-color-icon-error);
    }
    &:hover:enabled + .marker {
      border-color: var(--ga-color-red-70);
    }
  }
}

.label {
  font-weight: var(--ga-font-weight-normal);
  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
  font-family: var(--ga-font-family-primary);
  letter-spacing: var(--ga-text-md-tracking);

  &:empty {
    display: none;
  }
}
</style>
