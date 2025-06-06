<script setup lang="ts">
import { computed, useCssModule } from 'vue'

export interface TagProps {
  beforeIcon?: string | object
  afterIcon?: string | object
  interactive?: boolean
  label?: string
  success?: boolean
  information?: boolean
  error?: boolean
  warning?: boolean
  disabled?: boolean
}

const { disabled, error, information, interactive, success, warning } = defineProps<TagProps>()
const style = useCssModule()

const classes = computed(() => {
  const classList = [style.tag]

  if (interactive) {
    classList.push(style.interactive)
  }

  if (disabled) {
    classList.push(style.disabled)
  } else if (information) {
    classList.push(style.information)
  } else if (error) {
    classList.push(style.error)
  } else if (warning) {
    classList.push(style.warning)
  } else if (success) {
    classList.push(style.success)
  } else {
    classList.push(style.default)
  }

  return classList
})
</script>

<template>
  <component :is="interactive ? 'button' : 'span'" :class="classes">
    <component :is="beforeIcon" v-if="beforeIcon" :class="$style.beforeIcon" :size="16" />
    <slot>{{ label }}</slot>
    <component :is="afterIcon" v-if="afterIcon" :class="$style.afterIcon" :size="16" />
  </component>
</template>

<style module>
.tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--ga-size-spacing-02);

  border-radius: var(--ga-radius-round);
  padding: var(--ga-size-spacing-02) var(--ga-size-spacing-03);

  font-size: var(--ga-text-sm-font-size);
  line-height: var(--ga-text-sm-line-height);
  letter-spacing: var(--ga-text-sm-tracking);
}

.default {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-action);
  background-color: var(--ga-color-surface-primary);
  color: var(--ga-color-text-action);
}

.success {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-success);
  background-color: var(--ga-color-utility-green-light);
  color: var(--ga-color-text-success);

  .beforeIcon {
    color: var(--ga-color-icon-success);
  }
}

.interactive {
  border-style: dashed;

  &:enabled {
    cursor: pointer;
  }

  &:focus-visible {
    outline: var(--ga-size-border-width-md) solid var(--ga-color-border-focus);
    outline-offset: var(--ga-size-spacing-01);
  }

  &:not(:active, :disabled):is(:hover, :focus) {
    background-color: var(--ga-color-surface-action-hover-2);

    .beforeIcon {
      color: var(--ga-color-icon-action-hover);
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.information {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-information);
  background-color: var(--ga-color-utility-blue-light);
  color: var(--ga-color-text-information);

  .beforeIcon {
    color: var(--ga-color-icon-information);
  }
}

.error {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-error);
  background-color: var(--ga-color-utility-red-light);
  color: var(--ga-color-text-error);

  .beforeIcon {
    color: var(--ga-color-icon-error);
  }
}

.warning {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-warning);
  background-color: var(--ga-color-utility-orange-light);
  color: var(--ga-color-text-warning);

  .beforeIcon {
    color: var(--ga-color-icon-warning);
  }
}

.disabled {
  cursor: not-allowed;
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-disabled);
  background-color: var(--ga-color-surface-disabled);
  color: var(--ga-color-text-disable-selected);

  .beforeIcon {
    color: var(--ga-color-icon-on-disabled);
  }
}
</style>
