<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { CheckIcon } from 'lucide-vue-next'
import { useFormInput, type FormInputProps } from '@/core/composables/useFormInput'

defineOptions({ inheritAttrs: false })
const props = defineProps<FormInputProps>()

const { classes, aria } = useFormInput(props)
const inputRef = useTemplateRef<HTMLElement>('inputRef')
const model = defineModel<boolean>()

defineExpose({ inputRef })
</script>

<template>
  <label :class="classes" v-bind="aria">
    <input ref="inputRef" type="checkbox" :class="$style.native" v-model="model" v-bind="$attrs" />
    <div :class="$style.marker">
      <CheckIcon :class="$style.checked" :size="16" />
    </div>

    <span :class="$style.label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style module>
.input {
  display: inline-flex;
  position: relative;
  gap: var(--ga-size-spacing-04);
  user-select: none;
}

.native,
.marker {
  width: var(--ga-size-spacing-09);
  height: var(--ga-size-spacing-06);
}

.marker {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;

  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-action);
  border-radius: var(--ga-radius-round);

  padding-inline: var(--ga-size-spacing-02);
  pointer-events: none;
  color: var(--ga-color-icon-on-primary);

  & > .checked {
    display: none;
  }

  &::after {
    position: absolute;
    top: calc(50% - 9px); /* TODO: fix */

    border-radius: var(--ga-radius-round);
    background-color: var(--ga-color-border-action);

    width: 18px;
    height: 18px;
    content: '';
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
    &:not(:checked) + .marker {
      border-color: var(--ga-color-border-action-hover);
      background-color: var(--ga-color-surface-action-hover-2);
    }

    &:checked + .marker {
      background-color: var(--ga-color-surface-action-hover);

      &::after {
        background-color: var(--ga-color-surface-action-hover-2);
      }
    }
  }

  &:checked + .marker {
    background-color: var(--ga-color-surface-action);

    > .checked {
      display: block;
    }

    &::after {
      transform: translateX(20px); /* TODO: fix */
      background-color: var(--ga-color-surface-primary);
    }
  }

  &:disabled {
    cursor: not-allowed;

    + .marker {
      border-color: var(--ga-color-border-disabled);
      background-color: var(--ga-color-surface-disabled);
      color: var(--ga-color-icon-on-disabled);

      &::after {
        background-color: var(--ga-color-icon-on-disabled);
      }
    }

    ~ .label {
      color: var(--ga-color-text-disabled);
    }
    &:checked ~ .label {
      color: var(--ga-color-text-disable-selected);
    }
  }
}

.error {
  > .marker {
    border-color: var(--ga-color-border-error);
    background-color: var(--ga-color-surface-error);
    color: var(--ga-color-icon-error);

    &::after {
      background-color: var(--ga-color-icon-error);
    }
  }
  > .native:enabled {
    &:checked + .marker {
      background-color: var(--ga-color-surface-error);

      &::after {
        background-color: var(--ga-color-icon-error);
      }
    }

    &:hover + .marker {
      border-color: var(--ga-color-border-error-hover);
      background-color: var(--ga-color-surface-action-hover-2);

      &::after {
        background-color: var(--ga-color-icon-error);
      }
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
