<script setup lang="ts">
import { computed, useCssModule } from 'vue'

export interface BadgeProps {
  inverted?: boolean
  information?: boolean
  error?: boolean
  warning?: boolean
  success?: boolean
  muted?: boolean
  disabled?: boolean
}

const { inverted, information, error, warning, success, muted, disabled } =
  defineProps<BadgeProps>()
const style = useCssModule()

const isDefault = computed(
  () => !inverted && !information && !error && !warning && !success && !muted && !disabled,
)

const classes = computed(() => [
  style.badge,
  { [style.default]: isDefault.value },
  { [style.inverted]: inverted },
  { [style.information]: information },
  { [style.error]: error },
  { [style.warning]: warning },
  { [style.success]: success },
  { [style.muted]: muted },
  { [style.disabled]: disabled },
])
</script>

<template>
  <span :class="classes"><slot /></span>
</template>

<style module>
.badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  vertical-align: baseline;
  border-radius: var(--ga-radius-round);

  &:not(:empty) {
    padding: var(--ga-size-4);
    min-width: var(--ga-size-24);
    height: var(--ga-size-24);

    font-weight: var(--font-weight-medium);
    font-size: var(--text-sm);
    font-family: var(--default-font-family);

    text-align: center;
    white-space: nowrap;
  }

  &:empty {
    width: var(--ga-size-8);
    height: var(--ga-size-8);
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
  background-color: var(--ga-color-on-primary);
  color: var(--ga-color-text-action);

  &:empty {
    border: 1px solid var(--ga-color-border-disabled);
  }
}

.information {
  border: 1px solid var(--ga-color-border-information);
  background-color: var(--ga-color-utility-blue-light);
  color: var(--ga-color-text-information);

  &:empty {
    background-color: var(--ga-color-icon-information);
  }
}

.error {
  border: 1px solid var(--ga-color-border-error);
  background-color: var(--ga-color-utility-red-light);
  color: var(--ga-color-text-error);

  &:empty {
    background-color: var(--ga-color-icon-error);
  }
}

.warning {
  border: 1px solid var(--ga-color-border-warning);
  background-color: var(--ga-color-utility-orange-light);
  color: var(--ga-color-text-warning);

  &:empty {
    background-color: var(--ga-color-icon-warning);
  }
}

.success {
  border: 1px solid var(--ga-color-border-success);
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

  &:empty {
    background-color: var(--ga-color-icon-on-disabled);

    &.inverted {
      background-color: var(--ga-color-utility-grey-light);
    }
  }
}
</style>
