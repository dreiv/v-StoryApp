<script setup lang="ts">
import { computed, useCssModule, ref, useSlots } from 'vue'

export interface GaAvatarProps {
  size?: 'small' | 'medium' | 'large'
  content?: string
  interactive?: boolean
  icon?: string
  image?: string
  alt?: string
}

const { size = 'medium', content, interactive, icon, image, alt } = defineProps<GaAvatarProps>()
const style = useCssModule()
const slots = useSlots()

const is = computed(() => (interactive ? 'button' : 'div'))
const classes = computed(() => {
  const classList = [style.avatar, style[size]]
  if (icon || slots.icon) classList.push(style.icon)
  if (interactive) classList.push(style.interactive)

  return classList
})

const iconSizes = { small: 12, medium: 16, large: 24 }
const iconSize = computed(() => iconSizes[size])

const imageError = ref(false)
</script>

<template>
  <component :is :class="classes" :aria-label="alt">
    <img
      v-if="image && !imageError"
      :src="image"
      :alt="alt || 'Avatar'"
      :class="$style.image"
      @error="imageError = true"
    />

    <template v-else>
      <slot name="icon">
        <component v-if="icon" :is="icon" :size="iconSize" />
      </slot>

      <slot>{{ content }}</slot>
    </template>
  </component>
</template>

<style module>
.avatar {
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;

  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-primary);
  border-radius: var(--ga-radius-round);
  background-color: var(--ga-color-surface-primary);

  padding: 0;
  overflow: hidden;
  color: var(--ga-color-text-headings);
  font-weight: var(--ga-font-weight-bold);
}

.image {
  transition: filter 0.2s ease; /** TODO: Find common solution for transitions */
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
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
  &:enabled {
    cursor: pointer;
  }

  &:focus-visible {
    outline: var(--ga-size-border-width-md) solid var(--ga-color-border-focus);
    outline-offset: var(--ga-size-spacing-01);
  }

  &:not(:active, :disabled):is(:hover, :focus) {
    background-color: var(--ga-color-border-action-hover-2);
    color: var(--ga-color-text-action);

    &.icon {
      border-color: var(--ga-color-icon-action-hover);
      color: var(--ga-color-icon-action-hover);
    }

    .image {
      filter: brightness(0.9) contrast(1.1);
    }
  }

  &:disabled {
    cursor: not-allowed;
    border-color: var(--ga-color-border-disabled);
    background-color: var(--ga-color-surface-disabled);
    color: var(--ga-color-text-on-disabled);

    &.icon {
      color: var(--ga-color-icon-on-disabled);
    }

    .image {
      filter: grayscale(70%) opacity(0.6);
    }
  }
}
</style>
