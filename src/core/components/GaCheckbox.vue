<script setup lang="ts">
import { computed, useCssModule } from 'vue'
import { CheckIcon, MinusIcon } from 'lucide-vue-next'

export interface CheckboxProps {
  checked?: boolean
  disabled?: boolean
  indeterminate?: boolean
  error?: boolean
}

const { checked, error } = defineProps<CheckboxProps>()
const style = useCssModule()

const classes = computed(() => [style.checkbox, { [style.error]: error }])
const aria = computed(() => (error ? { 'aria-invalid': true } : {}))
</script>

<template>
  <label :class="classes" v-bind="aria">
    <input type="checkbox" :class="$style.native" :checked :disabled :indeterminate />
    <div :class="$style.marker">
      <CheckIcon :class="$style.checked" :size="12" :stroke-width="4" />
      <MinusIcon :class="$style.indeterminate" :size="12" :stroke-width="4" />
    </div>

    <span :class="$style.label"><slot /></span>
  </label>
</template>

<style module>
.checkbox {
  display: inline-flex;
  position: relative;
  gap: var(--ga-size-8);
}

.native,
.marker {
  margin: var(--ga-size-2);
  width: var(--ga-size-16);
  height: var(--ga-size-16);
}

.native {
  flex-shrink: 0;
  opacity: 0;
  cursor: pointer;

  &:focus-visible + .marker {
    outline: 2px solid var(--ga-color-border-focus);
    outline-offset: 2px;
  }

  &:hover + .marker {
    border-color: var(--ga-color-border-action-hover);
    background-color: var(--ga-color-surface-action-hover-2);
  }

  &:checked + .marker {
    background-color: var(--ga-color-surface-action);

    & > .checked {
      display: block;
    }
  }

  &:indeterminate + .marker {
    background-color: var(--ga-color-surface-action);

    & > .indeterminate {
      display: block;
    }
  }

  &:disabled {
    cursor: not-allowed;

    + .marker {
      border-color: var(--ga-color-border-disabled);
      background-color: var(--ga-color-surface-disabled);
      color: var(--ga-color-icon-on-disabled);
    }

    + .label {
      color: var(--ga-color-text-disabled);
    }
  }
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

:not(.error) > .native:hover:not(:disabled) {
  &:checked,
  &:indeterminate {
    + .marker {
      background-color: var(--ga-color-surface-action-hover);
    }
  }
}

.error > .marker {
  border-color: var(--ga-color-border-error);
  background-color: var(--ga-color-surface-error);
  color: var(--ga-color-icon-error);
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
