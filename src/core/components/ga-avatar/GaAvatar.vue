<script setup lang="ts">
import { computed, useCssModule } from 'vue'

export interface GaAvatarProps {
  size?: 'small' | 'medium' | 'large'
  content?: string
  interactive?: boolean
}

const { size = 'medium', content, interactive } = defineProps<GaAvatarProps>()
const style = useCssModule()

const is = computed(() => (interactive ? 'button' : 'div'))
const classes = computed(() => {
  const classList = [style.avatar, style[size]]
  if (interactive) classList.push(style.interactive)

  return classList
})
</script>

<template>
  <component :is :class="classes">
    {{ content }}
  </component>
</template>

<style module>
.avatar {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-primary);
  border-radius: var(--ga-radius-round);
  background-color: var(--ga-color-surface-primary);
  color: var(---ga-color-text-headings);

  font-weight: var(--ga-font-weight-bold);
}

.small {
  width: var(--ga-size-spacing-06);
  height: var(--ga-size-spacing-06);

  font-size: var(--ga-text-sm-font-size);
  line-height: var(--ga-text-sm-line-height);
}

.medium {
  width: var(--ga-size-spacing-08);
  height: var(--ga-size-spacing-08);

  font-size: var(--ga-text-lg-font-size);
  line-height: var(--ga-text-lg-line-height);
}

.large {
  width: var(--ga-size-spacing-10);
  height: var(--ga-size-spacing-10);

  font-size: var(--ga-text-2xl-font-size);
  line-height: var(--ga-text-2xl-line-height);
}

.interactive {
  cursor: pointer;

  &:focus-visible {
    outline: var(--ga-size-border-width-md) solid var(--ga-color-border-focus);
    outline-offset: var(--ga-size-spacing-01);
  }

  &:not(:active, :disabled):is(:hover, :focus) {
    background-color: var(--ga-color-border-action-hover-2);
    color: var(--ga-color-text-action);
  }
}
</style>
