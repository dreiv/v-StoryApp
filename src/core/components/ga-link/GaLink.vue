<script setup lang="ts">
import { useCssModule, computed, type AnchorHTMLAttributes, useAttrs } from 'vue'

export interface GaLinkProps extends /* @vue-ignore */ AnchorHTMLAttributes {
  text?: string
  size?: 'sm' | 'lg'
  inline?: boolean
  disabled?: boolean
}

defineOptions({ inheritAttrs: false })

const { size, inline, disabled } = defineProps<GaLinkProps>()
const style = useCssModule()
const attrs = useAttrs()

const classes = computed(() => [
  style.link,
  size && style[size],
  inline && style.inline,
  disabled && style.disabled,
])

const attributes = computed(() => ({
  ...attrs,
  href: disabled ? undefined : (attrs?.href as string | undefined),
  'aria-disabled': disabled ? true : undefined,
}))
</script>

<template>
  <a :class="classes" v-bind="attributes">
    <slot name="prefix" />
    <slot>{{ text }}</slot>
    <slot name="suffix" />
  </a>
</template>

<style module>
.link {
  display: inline-flex;
  align-items: center;
  gap: var(--ga-size-spacing-02);

  cursor: pointer;
  border-radius: var(--ga-radius);
  padding-inline: var(--ga-size-spacing-01);

  color: var(--ga-color-text-action);
  font-weight: var(--ga-font-weight-medium);
  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
  text-decoration: inherit;
}

.sm {
  font-size: var(--ga-text-sm-font-size);
  line-height: var(--ga-text-sm-line-height);
}

.lg {
  font-size: var(--ga-text-lg-font-size);
  line-height: var(--ga-text-lg-line-height);
}

.inline {
  text-decoration: underline 1px solid var(--ga-color-primary-90);
}

.disabled {
  cursor: not-allowed;
  color: var(--ga-color-text-disabled);
}

.disabled .link_icon {
  color: var(--ga-color-icon-disabled);
}

.link:not(.disabled):visited {
  color: var(--ga-color-text-link-visited);
  text-decoration-color: var(--ga-color-text-link-visited);
}

.link:not(.disabled):hover {
  color: var(--ga-color-text-action-hover);
  text-decoration: underline 1px solid var(--ga-color-primary-90);
}

.link:not(.disabled):active {
  color: var(--ga-color-text-action);
  text-decoration-color: var(--ga-color-text-action);
}

.link:not(.disabled):focus-visible {
  outline: var(--ga-size-border-width-md) solid var(--ga-color-border-focus);
  outline-offset: var(--ga-size-spacing-01);
}
</style>
