<script setup lang="ts">
import { useCssModule, computed, type AnchorHTMLAttributes, useAttrs } from 'vue'

export interface GaLinkProps extends /* @vue-ignore */ AnchorHTMLAttributes {
  text?: string
  size?: 'small' | 'medium' | 'large'
  inline?: boolean
  disabled?: boolean
}

defineOptions({ inheritAttrs: false })

const { size = 'medium', inline, disabled } = defineProps<GaLinkProps>()
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
    <slot>{{ text }}</slot>
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

  &.disabled {
    cursor: not-allowed;
    color: var(--ga-color-text-disabled);

    & .link_icon {
      color: var(--ga-color-icon-disabled);
    }
  }

  &:not(.disabled) {
    &:visited {
      color: var(--ga-color-text-link-visited);
      text-decoration-color: var(--ga-color-text-link-visited);
    }

    &:hover {
      color: var(--ga-color-text-action-hover);
      text-decoration: underline var(--ga-size-border-width-sm) solid var(--ga-color-primary-90);

      &.inline {
        text-decoration-thickness: var(--ga-size-border-width-md);
      }
    }

    &:active {
      color: var(--ga-color-text-action);
      text-decoration-color: var(--ga-color-text-action);
    }

    &:focus-visible {
      outline: var(--ga-size-border-width-md) solid var(--ga-color-border-focus);
      outline-offset: var(--ga-size-spacing-01);
    }
  }
}

.small {
  font-size: var(--ga-text-sm-font-size);
  line-height: var(--ga-text-sm-line-height);
}

.medium {
  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
}

.large {
  font-size: var(--ga-text-lg-font-size);
  line-height: var(--ga-text-lg-line-height);
}

.inline {
  text-decoration: underline var(--ga-size-border-width-sm) solid var(--ga-color-primary-90);
}
</style>
