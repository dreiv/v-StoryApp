<script setup lang="ts">
import { inject } from 'vue'
import { useFormInput, type FormInputProps } from '../composables/useFormInput'
import { radioGroupKey } from '../constants'

defineOptions({ inheritAttrs: false })
const props = defineProps<FormInputProps>()
const { classes, aria } = useFormInput(props)

const group = inject(radioGroupKey)
if (!group) throw new Error('GaRadio must be used inside a GaRadioGroup')
</script>

<template>
  <label :class="classes" v-bind="aria">
    <input
      type="radio"
      :class="$style.native"
      :name="group?.name"
      :checked="group?.model?.value === $attrs.value"
      @change="group.model.value = `${$attrs.value}`"
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
  gap: var(--ga-size-8);
  user-select: none;
}

.native,
.marker {
  margin: var(--ga-size-2);
  width: var(--ga-size-16);
  height: var(--ga-size-16);
}

.marker {
  position: absolute;
  top: 0;
  left: 0;

  border: 2px solid var(--ga-color-border-action);
  border-radius: var(--ga-radius-round);

  pointer-events: none;
  color: var(--ga-color-icon-on-primary);
}

.native {
  flex-shrink: 0;
  opacity: 0;
  cursor: pointer;

  &:focus-visible + .marker {
    outline: 2px solid var(--ga-color-border-focus);
    outline-offset: 2px;
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

      width: var(--ga-size-4);
      height: var(--ga-size-4);
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
  min-height: var(--ga-size-16);
  font-size: var(--text-md);
  line-height: var(--text-md--line-height);

  &:empty {
    display: none;
  }
}
</style>
