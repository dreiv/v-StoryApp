<script setup lang="ts">
import { computed, useCssModule, ref, useSlots } from 'vue'

const ICON_SIZES = { 'extra-small': 10, small: 12, medium: 16, large: 24 }

export interface GaAvatarProps {
  size?: 'extra-small' | 'small' | 'medium' | 'large'
  content?: string
  interactive?: boolean
  icon?: string
  statusInteractive?: boolean
  statusIcon?: string
  image?: string
  alt?: string
  disabled?: boolean
}

const emit = defineEmits(['statusClick'])
const {
  size = 'medium',
  content,
  interactive,
  icon,
  statusIcon,
  image,
  alt,
  disabled,
} = defineProps<GaAvatarProps>()

const style = useCssModule()
const slots = useSlots()
const imageError = ref(false)

const classes = computed(() =>
  [
    style.avatar,
    style[size],
    (icon || slots.icon) && style.icon,
    interactive && style.interactive,
  ].filter(Boolean),
)

const iconSize = computed(() => ICON_SIZES[size])
const hasImage = computed(() => Boolean(image && !imageError.value))
const hasStatus = computed(() => Boolean((statusIcon || slots.status) && size !== 'extra-small'))
</script>

<template>
  <component :is="interactive ? 'button' : 'div'" :class="classes" :aria-label="alt" :disabled>
    <img v-if="hasImage" :src="image" :alt :class="$style.image" @error="imageError = true" />

    <template v-else>
      <slot name="icon">
        <component v-if="icon" :is="icon" :size="iconSize" />
      </slot>

      <slot>{{ content }}</slot>
    </template>

    <component
      v-if="hasStatus"
      :is="statusInteractive ? 'button' : 'div'"
      :class="[style.status, statusInteractive && style.statusInteractive]"
      @click.stop="statusInteractive && emit('statusClick', $event)"
      :disabled="disabled"
    >
      <slot name="status">
        <component v-if="statusIcon" :is="statusIcon" :size="iconSize / 1.5" />
      </slot>
    </component>
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

  color: var(--ga-color-text-headings);
  font-weight: var(--ga-font-weight-bold);
}

.image {
  transition: filter 0.2s ease; /** TODO: Find common solution for transitions */
  border-radius: var(--ga-radius-round);
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.status {
  display: flex;
  position: absolute;

  right: calc(var(--ga-size-spacing-01) * -1);
  bottom: calc(var(--ga-size-spacing-01) * -1);
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease; /** TODO: Find common solution for transitions */

  box-shadow: 0 0 0 var(--ga-size-border-width-md) var(--ga-color-surface-primary);
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-primary);
  border-radius: var(--ga-radius-round);
  background-color: var(--ga-color-surface-primary);
  padding: var(--ga-size-spacing-01);

  color: var(--ga-color-icon-primary);

  &:focus-visible {
    outline: var(--ga-size-border-width-md) solid var(--ga-color-border-focus);
    outline-offset: var(--ga-size-spacing-01);
  }

  &:disabled {
    cursor: not-allowed;
    border-color: var(--ga-color-border-disabled);
    background-color: var(--ga-color-surface-disabled);
    color: var(--ga-color-icon-on-disabled);
  }

  &.statusInteractive {
    &:enabled {
      cursor: pointer;
    }

    &:not(:active, :disabled):is(:hover, :focus) {
      transform: scale(1.1);
      border-color: var(--ga-color-border-action-hover);
      background-color: var(--ga-color-border-action-hover-2);
      color: var(--ga-color-icon-action-hover);
    }
  }
}

.extra-small {
  width: var(--ga-size-spacing-05);
  height: var(--ga-size-spacing-05);

  font-weight: var(--ga-font-weight-medium);
  font-size: var(--ga-text-xs-font-size);
  line-height: var(--ga-text-xs-line-height);
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
