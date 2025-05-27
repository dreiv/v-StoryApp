<script setup lang="ts">
import {
  computed,
  inject,
  useAttrs,
  useCssModule,
  useTemplateRef,
  type InputHTMLAttributes,
} from 'vue'
import { formFieldKey } from '../ga-form-field/types'

defineOptions({ inheritAttrs: false })

export interface GaInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  id?: string
  error?: boolean
  success?: boolean
}
const { id, error, disabled, success } = defineProps<GaInputProps>()
const inputRef = useTemplateRef<HTMLElement>('inputRef')
const style = useCssModule()
const attrs = useAttrs()
const model = defineModel<string>()

const formField = inject(formFieldKey)

const inputAttrs = computed(() => ({
  ...attrs,
  id: id || formField?.id,
  disabled: disabled || formField?.disabled,
}))

const classes = computed(() => [
  style.input,
  { [style.error]: error || formField?.error, [style.success]: success },
])

defineExpose({ inputRef })
</script>

<template>
  <div :class="classes">
    <slot name="prefix" />
    <input ref="inputRef" type="text" v-model="model" v-bind="inputAttrs" />
    <slot name="suffix" />
  </div>
</template>

<style module>
.input {
  display: flex;
  align-items: center;
  gap: var(--ga-size-spacing-03);

  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-primary);
  border-radius: var(--ga-radius);

  background-color: var(--ga-color-bg-primary);
  padding: var(--ga-size-spacing-03) var(--ga-size-spacing-04);
  height: var(--ga-size-spacing-08);

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

  &:has(input:focus):not(.error, .success) {
    outline: 1px solid var(--ga-color-border-focus);
    border-color: var(--ga-color-border-focus);
  }

  &.error {
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
