<script setup lang="ts">
import { computed, useCssModule, defineModel } from 'vue'
import { CheckIcon, MinusIcon } from 'lucide-vue-next'

export interface CheckboxProps {
  modelValue?: boolean
  disabled?: boolean
  indeterminate?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
}

const { error, errorMessage } = defineProps<CheckboxProps>()
const style = useCssModule()
const model = defineModel()

const classes = computed(() => [style.checkbox, { [style.error]: error }])
const aria = computed(() => ({
  'aria-invalid': error ? true : undefined,
  'aria-errormessage': errorMessage ?? undefined,
}))
</script>

<template>
  <label :class="classes" v-bind="aria">
    <input type="checkbox" :class="$style.native" v-model="model" :disabled :indeterminate />
    <div :class="$style.marker">
      <CheckIcon :class="$style.checked" :size="12" :stroke-width="4" />
      <MinusIcon :class="$style.indeterminate" :size="12" :stroke-width="4" />
    </div>

    <span :class="$style.label">
      <slot>{{ label }}</slot>
    </span>
  </label>

  <div v-if="$slots.children" :class="$style.children">
    <slot name="children" />
  </div>
</template>

<style module>
.checkbox {
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
    outline: 2px solid var(--ga-color-border-focus);
    outline-offset: 2px;
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
  min-height: var(--ga-size-16);
  font-size: var(--text-md);
  line-height: var(--text-md--line-height);

  &:empty {
    display: none;
  }
}

.children {
  display: flex;
  flex-direction: column;
  gap: var(--ga-size-8);

  margin-left: calc(var(--ga-size-16) + var(--ga-size-10));
}
</style>
