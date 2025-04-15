<script setup lang="ts">
import { computed, useCssModule } from 'vue'

export interface DropdownItemProps {
  label?: string
  selected?: boolean
  disabled?: boolean
  active?: boolean
}

const { active, disabled, selected } = defineProps<DropdownItemProps>()
const style = useCssModule()

const classes = computed(() => [
  style.item,
  { [style.active]: active },
  { [style.selected]: selected },
])
</script>

<template>
  <button :class="classes" :disabled="disabled">
    <slot>{{ label }}</slot>
  </button>
</template>

<style module>
.item {
  display: flex;
  gap: var(--ga-size-spacing-03);

  outline-color: var(--ga-color-border-focus);
  outline-width: var(--ga-size-border-width-md);
  outline-offset: -1px; /* TODO: fix */

  border: 0;
  border-radius: 2px;
  padding: var(--ga-size-spacing-03) var(--ga-size-spacing-04);
  height: 2.25rem; /* TODO: fix */

  font-weight: var(--ga-font-weight-normal);
  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
  letter-spacing: var(--ga-text-md-tracking);

  text-align: left;

  &:enabled {
    cursor: pointer;
  }

  &:hover {
    background-color: var(--ga-color-border-action-hover-2);
  }

  &.selected {
    background-color: var(--ga-color-surface-success);
  }

  &:disabled {
    background-color: var(--ga-color-surface-disabled);

    &.selected {
      background-color: var(--ga-color-surface-disable-selected);
    }
  }
}
</style>
