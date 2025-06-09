<script setup lang="ts">
import { computed, useCssModule } from 'vue'
import GaAvatar from '../ga-avatar/GaAvatar.vue'

export interface GaAvatarGroupProps {
  /**
   * Size of all avatars in the group
   * @default 'medium'
   */
  size?: 'extra-small' | 'small' | 'medium' | 'large'
  /**
   * Maximum number of avatars to display
   * @default undefined
   */
  max?: number
  /**
   * Amount of overlap between avatars (in pixels)
   * @default undefined - uses default overlap based on size
   */
  overlap?: number
  /**
   * Text for the excess avatar count when max is reached
   */
  overflowLabel?: string
}

const props = withDefaults(defineProps<GaAvatarGroupProps>(), {
  size: 'medium',
})

const style = useCssModule()

// Get avatar width based on size for proper half-overlap calculation
const getAvatarWidth = computed(() => {
  const avatarWidths = {
    'extra-small': 24, // estimated width in pixels
    small: 32,
    medium: 40,
    large: 48,
  }
  return avatarWidths[props.size]
})

// Calculate overlap values (when not explicitly provided)
const getDefaultOverlap = computed(() => {
  // Default to half the avatar width for natural looking overlap
  if (props.overlap !== undefined) return props.overlap

  // Calculate half of the avatar width for overlap
  return Math.round(getAvatarWidth.value / 2)
})

// Get border thickness based on size
const getBorderThickness = computed(() => {
  const borderValues = {
    'extra-small': 1,
    small: 1.5,
    medium: 2,
    large: 3,
  }
  return borderValues[props.size]
})
</script>

<template>
  <div
    :class="style.group"
    :style="{
      '--avatar-width': `${getAvatarWidth}px`,
      '--avatar-overlap': `${getDefaultOverlap}px`,
      '--border-thickness': `${getBorderThickness}px`,
    }"
  >
    <!-- Regular slot for child avatars -->
    <slot></slot>

    <!-- Overflow indicator -->
    <GaAvatar v-if="overflowLabel" :size="size" :content="overflowLabel" :class="style.count" />
  </div>
</template>

<style module>
.group {
  display: flex;
  flex-direction: row-reverse; /* Reverse order so last avatar appears on top */
  align-items: center;
  width: max-content;
}

.group :deep(.avatar) {
  position: relative;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  margin-left: calc(var(--avatar-overlap) * -1); /* Negative margin for overlap */
  border: var(--border-thickness) solid var(--ga-color-surface-primary);
}

/* When hovering/focusing, bring avatar forward with transform and box-shadow */
.group :deep(.avatar:hover),
.group :deep(.avatar:focus-visible) {
  transform: translateY(-4px) scale(1.05);
  z-index: 1; /* Only need one level of z-index here */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Remove negative margin from first element in the reversed flexbox (actually the last element visually) */
.group :deep(.avatar:first-child) {
  margin-left: 0;
}

.count {
  background-color: var(--ga-color-surface-secondary);
}
</style>
