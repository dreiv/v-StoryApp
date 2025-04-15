<script setup lang="ts">
import { computed, useCssModule, type ButtonHTMLAttributes } from 'vue'

export interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  label?: string
  primary?: boolean
  ghost?: boolean
  transparent?: boolean
  icon?: boolean
}

const { primary, transparent, ghost, icon } = defineProps<ButtonProps>()
const style = useCssModule()

const isSecondaryStyle = computed(() => !primary && !ghost && !transparent)
const classes = computed(() => [
  style.button,
  { [style.primary]: primary },
  { [style.secondary]: isSecondaryStyle.value },
  { [style.ghost]: ghost },
  { [style.transparent]: transparent },
  { [style.icon]: icon },
])
</script>

<template>
  <button :class="classes">
    <slot>{{ label }}</slot>
  </button>
</template>

<style module>
.button {
  display: inline-flex;
  align-items: center;
  gap: var(--ga-size-spacing-03);

  border-radius: var(--ga-radius);
  padding: 0 var(--ga-size-spacing-05);
  min-width: var(--ga-size-spacing-08);
  height: var(--ga-size-spacing-08);

  font-weight: var(--ga-font-weight-medium);
  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
  font-family: var(--ga-font-family-primary);
  letter-spacing: var(--ga-text-md-tracking);

  &:enabled {
    cursor: pointer;
  }

  &:focus-visible {
    outline: var(--ga-size-border-width-md) solid var(--ga-color-border-focus);
    outline-offset: var(--ga-size-spacing-01);
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.primary {
  border: none;
  background-color: var(--ga-color-surface-action);
  color: var(--ga-color-text-on-action);

  &:not(:active, :disabled):is(:hover, :focus) {
    background-color: var(--ga-color-surface-action-hover);
  }

  &:disabled {
    background-color: var(--ga-color-surface-disabled);
    color: var(--ga-color-text-disable-selected);
  }
}

.secondary {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-action);
  background-color: var(--ga-color-surface-primary);
  color: var(--ga-color-text-action);

  &:not(:active, :disabled):is(:hover, :focus) {
    background-color: var(--ga-color-border-action-hover-2);
  }

  &:disabled {
    border-color: var(--ga-color-border-disabled);
    background-color: var(--ga-color-surface-page);
    color: var(--ga-color-text-disabled);
  }
}

.ghost {
  border: none;
  background-color: transparent;
  color: var(--ga-color-text-action);

  &:not(:active, :disabled):is(:hover, :focus) {
    background-color: var(--ga-color-border-action-hover-2);
  }

  &:disabled {
    background-color: transparent;
    color: var(--ga-color-text-disabled);
  }
}

.transparent {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-action);
  background-color: transparent;
  color: var(--ga-color-text-action);

  &:not(:active, :disabled):is(:hover, :focus) {
    background-color: var(--ga-color-border-action-hover-2);
  }

  &:disabled {
    border-color: var(--ga-color-border-disabled);
    background-color: transparent;
    color: var(--ga-color-text-disable-selected);
  }
}

.icon {
  justify-content: center;
  padding: 0;
}
</style>
