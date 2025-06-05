<script setup lang="ts">
import { computed, useCssModule } from 'vue'

export interface TagProps {
  is?: string | object
  label?: string
  success?: boolean
  information?: boolean
  error?: boolean
  warning?: boolean
  disabled?: boolean
}

const { is = 'span', disabled, information, error, warning, success } = defineProps<TagProps>()
const style = useCssModule()

const classes = computed(() => {
  const classList = [style.tag]

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
  <component :is :class="classes">
    <slot>{{ label }}</slot>
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
</style>
