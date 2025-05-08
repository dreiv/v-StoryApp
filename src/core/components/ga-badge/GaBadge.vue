<script setup lang="ts">
import { computed, useCssModule } from 'vue'

export interface BadgeProps {
  label?: string
  inverted?: boolean
  muted?: boolean
  information?: boolean
  error?: boolean
  warning?: boolean
  success?: boolean
  disabled?: boolean
}

const { inverted, information, error, warning, success, muted, disabled } =
  defineProps<BadgeProps>()

const style = useCssModule()
const classes = computed(() => {
  const classList = [style.badge]

  if (disabled) {
    classList.push(style.disabled)
    if (inverted) classList.push(style.inverted)
  } else if (information) {
    classList.push(style.information)
  } else if (error) {
    classList.push(style.error)
  } else if (warning) {
    classList.push(style.warning)
  } else if (success) {
    classList.push(style.success)
  } else if (muted) {
    classList.push(style.muted)
  } else if (inverted) {
    classList.push(style.inverted)
  } else {
    classList.push(style.default)
  }

  return classList
})
</script>

<template>
  <span :class="classes">
    <slot>{{ label }}</slot>
  </span>
</template>

<style module>
.badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border-radius: var(--ga-radius-round);

  &:not(:empty) {
    padding: var(--ga-size-spacing-02);
    min-width: var(--ga-size-spacing-06);
    height: var(--ga-size-spacing-06);

    font-weight: var(--ga-font-weight-medium);
    font-size: var(--ga-text-md-font-size);
    line-height: var(--ga-text-md-line-height);
    font-family: var(--ga-font-family-primary);

    text-align: center;
    white-space: nowrap;
  }

  &:empty {
    width: var(--ga-size-spacing-03);
    height: var(--ga-size-spacing-03);
  }
}

.default {
  background-color: var(--ga-color-surface-action);
  color: var(--ga-color-text-on-action);
}

.inverted {
  background-color: var(--ga-color-icon-on-action);
  color: var(--ga-color-text-information);
}

.muted {
  background-color: var(--ga-color-icon-on-primary);
  color: var(--ga-color-text-action);

  &:empty {
    border: var(--ga-size-border-width-sm) solid var(--ga-color-border-disabled);
  }
}

.information {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-information);
  background-color: var(--ga-color-utility-blue-light);
  color: var(--ga-color-text-information);

  &:empty {
    background-color: var(--ga-color-icon-information);
  }
}

.error {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-error);
  background-color: var(--ga-color-utility-red-light);
  color: var(--ga-color-text-error);

  &:empty {
    background-color: var(--ga-color-icon-error);
  }
}

.warning {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-warning);
  background-color: var(--ga-color-utility-orange-light);
  color: var(--ga-color-text-warning);

  &:empty {
    background-color: var(--ga-color-icon-warning);
  }
}

.success {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-success);
  background-color: var(--ga-color-utility-green-light);
  color: var(--ga-color-text-success);

  &:empty {
    background-color: var(--ga-color-icon-success);
  }
}

.disabled {
  background-color: var(--ga-color-surface-disabled);
  color: var(--ga-color-text-disable-selected);

  &.inverted {
    background-color: var(--ga-color-utility-grey-light);
    color: var(--ga-color-text-disabled);
  }

  &:not(.inverted):empty {
    background-color: var(--ga-color-icon-on-disabled);
  }
}
</style>
