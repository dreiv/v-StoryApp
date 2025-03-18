<script setup lang="ts">
import { computed, useCssModule } from 'vue'

const { primary, transparent, ghost, icon } = defineProps<{
  primary?: boolean
  transparent?: boolean
  ghost?: boolean
  icon?: boolean
}>()
const style = useCssModule()

const classes = computed(() => [
  style.base,
  { [style.primary]: primary },
  { [style.secondary]: !(primary || ghost || transparent) },
  { [style.ghost]: ghost },
  { [style.transparent]: transparent },
  { [style.icon]: icon },
])
</script>

<template>
  <button :class="classes"><slot /></button>
</template>

<style module>
.base {
  display: inline-flex;
  align-items: center;
  gap: var(--ga-size-8);

  border-radius: var(--ga-radius);
  padding: 0 var(--ga-size-16);
  min-width: var(--ga-size-40);
  height: var(--ga-size-40);

  font-weight: var(--font-weight-medium);
  font-family: var(--default-font-family);

  &:enabled {
    cursor: pointer;
  }

  &:focus-visible {
    outline: 2px solid var(--ga-color-border-focus);
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.primary {
  border: none;
  background: var(--ga-color-surface-action);
  color: var(--ga-color-text-on-action);

  &:hover {
    background: var(--ga-color-surface-action-hover);
  }

  &:active {
    background: var(--ga-color-surface-action);
  }

  &:disabled {
    background: var(--ga-color-surface-disabled);
    color: var(--ga-color-text-disable-selected);
  }
}

.secondary {
  border: 1px solid var(--ga-color-border-action);
  background: var(--ga-color-surface-primary);
  color: var(--ga-color-text-action);

  &:hover {
    background: var(--ga-color-border-action-hover-2);
  }

  &:active {
    background: var(--ga-color-surface-primary);
  }

  &:disabled {
    border-color: var(--ga-color-border-disabled);
    background: var(--ga-color-surface-page);
    color: var(--ga-color-text-disabled);
  }
}

.ghost {
  border: none;
  background: transparent;
  color: var(--ga-color-text-action);

  &:hover {
    background: var(--ga-color-border-action-hover-2);
  }

  &:active {
    background: transparent;
  }

  &:disabled {
    background: transparent;
    color: var(--ga-color-text-disabled);
  }
}

.transparent {
  border: 1px solid var(--ga-color-border-action);
  background: transparent;
  color: var(--ga-color-text-action);

  &:hover {
    background: var(--ga-color-border-action-hover-2);
  }

  &:active {
    background: var(--ga-color-surface-primary);
  }

  &:disabled {
    border-color: var(--ga-color-border-disabled);
    background: transparent;
    color: var(--ga-color-text-disable-selected);
  }
}

.icon {
  justify-content: center;
  padding: 0;
}
</style>
