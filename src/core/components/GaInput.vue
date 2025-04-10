<script setup lang="ts">
import { computed, useCssModule, useTemplateRef, type InputHTMLAttributes } from 'vue'

defineOptions({ inheritAttrs: false })

export interface GaInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  invalid?: boolean
  success?: boolean
}
const { invalid, success } = defineProps<GaInputProps>()
const inputRef = useTemplateRef<HTMLElement>('inputRef')
const style = useCssModule()

const classes = computed(() => [
  style.input,
  { [style.invalid]: invalid, [style.success]: success },
])

defineExpose({ inputRef })
</script>

<template>
  <div :class="classes">
    <slot name="prefix" />
    <input ref="inputRef" type="text" v-bind="$attrs" />
    <slot name="suffix" />
  </div>
</template>

<style module>
.input {
  display: flex;
  gap: var(--ga-size-spacing-03);
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-primary);
  border-radius: var(--ga-radius);

  background-color: var(--ga-color-bg-primary);
  padding: var(--ga-size-8) var(--ga-size-12);
  height: var(--ga-size-40);

  &:hover {
    border-color: var(--ga-color-border-action-hover);
  }

  &:has(input:disabled) {
    border-color: var(--ga-color-border-primary);
    background-color: var(--ga-color-surface-disabled);
    color: var(--ga-color-text-disable-selected);

    &:has(input:not(:placeholder-shown)) {
      border-color: var(--ga-color-surface-disable-selected);
      background-color: var(--ga-color-surface-disable-selected);
      color: var(--ga-color-text-on-action);
    }
  }

  &:has(input:focus):not(.invalid, .success) {
    outline: 1px solid var(--ga-color-border-focus);
    border-color: var(--ga-color-border-focus);
  }

  &.invalid {
    outline: 1px solid var(--ga-color-border-error);
    border-color: var(--ga-color-border-error);

    &:has(input:not(:placeholder-shown)) {
      border-color: var(--ga-color-surface-error);
    }
  }

  &.success {
    outline: 1px solid var(--ga-color-border-success);
    border-color: var(--ga-color-border-success);

    &:has(input:not(:placeholder-shown)) {
      background-color: var(--ga-color-surface-success);
    }
  }

  > input {
    outline: none;
    border: none;
    background-color: transparent;
    width: 100%;

    &::placeholder {
      color: var(--ga-color-text-disabled);
    }
  }
}
</style>
