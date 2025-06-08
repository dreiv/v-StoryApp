<script setup lang="ts">
import {
  computed,
  inject,
  useAttrs,
  useCssModule,
  useTemplateRef,
  type TextareaHTMLAttributes,
} from 'vue'
import { formFieldKey } from '../ga-form-field/types'

export interface GaTextAreaProps extends /* @vue-ignore */ TextareaHTMLAttributes {
  id?: string
  error?: boolean
  success?: boolean
}

const { id, error, disabled, success } = defineProps<GaTextAreaProps>()

const inputRef = useTemplateRef<HTMLTextAreaElement>('inputRef')
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
  style.text,
  { [style.error]: error || formField?.error, [style.success]: success },
])

defineExpose({ inputRef })
</script>

<template>
  <textarea ref="inputRef" rows="5" :class="classes" v-model="model" v-bind="inputAttrs" />
</template>

<style module>
.text {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-primary);
  border-radius: var(--ga-radius);
  background-color: var(--ga-color-surface-primary);

  padding: var(--ga-size-spacing-03) var(--ga-size-spacing-04);
  width: 100%;
  min-width: 0rem;

  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
  font-family: var(--ga-font-family-primary);
  letter-spacing: var(--ga-text-md-tracking);

  &:hover {
    border-color: var(--ga-color-border-action-hover);
  }

  &:disabled {
    border-color: var(--ga-color-border-primary);
    background-color: var(--ga-color-surface-disabled);
    color: var(--ga-color-text-disable-selected);
  }

  &:focus:not(.error, .success) {
    outline: 1px solid var(--ga-color-border-focus);
    border-color: var(--ga-color-border-focus);
  }

  &.error {
    outline: 1px solid var(--ga-color-border-error);
    border-color: var(--ga-color-border-error);
    background-color: var(--ga-color-surface-error);
  }
}
</style>
