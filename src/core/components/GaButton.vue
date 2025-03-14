<script setup lang="ts">
import { computed, useCssModule } from 'vue'

const props = defineProps<{ primary?: boolean; transparent?: boolean; icon?: boolean }>()
const style = useCssModule()

const classes = computed(() => [
  style.base,
  { [style.default]: !props.primary && !props.transparent },
  { [style.primary]: props.primary },
  { [style.transparent]: props.transparent },
  { [style.icon]: props.icon },
])
</script>

<template>
  <button :class="classes"><slot /></button>
</template>

<style module>
.base {
  box-sizing: border-box;
  border-radius: var(--rad-sm);
  padding: 0 var(--sp-md);
  min-width: var(--sp-xxl);
  height: var(--sp-xxl);

  font-weight: 500;
  font-family: Inter, sans-serif;

  &:enabled {
    cursor: pointer;
  }

  &:disabled {
    color: var(--gray-70);
  }
}

.default {
  --border-col: var(--primary-80);

  border: 1px solid var(--border-col);
  background-color: var(--surface);
  color: var(--primary-80);

  &:hover:not(:active, :disabled) {
    background-color: var(--secondary-30);
  }

  &:focus-visible {
    outline: 2px solid var(--border-col);
    outline-offset: 2px;
  }
}

.primary {
  --bg-col: var(--primary-80);

  border: none;
  background-color: var(--bg-col);
  color: var(--secondary-10);

  &:hover:not(:active, :disabled) {
    background-color: var(--primary-90);
  }

  &:focus-visible {
    outline: 2px solid var(--bg-col);
    outline-offset: 2px;
  }
}

.transparent {
  --border-col: transparent;
  outline: none;
  border: 2px solid var(--border-col);

  background-color: transparent;
  color: var(--primary-80);

  &:hover {
    &:not(:active, :disabled) {
      &:not(.icon) {
        text-shadow: 0 0 1px var(--primary-80);
      }

      &.icon {
        background-color: var(--secondary-30);
      }
    }
  }

  &:focus-visible {
    --border-col: var(--primary-80);
  }
}

.icon {
  padding: 0;
}

.primary,
.default {
  &:disabled {
    border-color: var(--gray-30);
    background-color: var(--gray-10);
  }
}
</style>
