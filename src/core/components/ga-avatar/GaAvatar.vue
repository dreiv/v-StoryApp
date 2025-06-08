<script setup lang="ts">
export interface GaAvatarProps {
  size?: 'small' | 'medium' | 'large'
  content?: string
}

const { size = 'medium', content } = defineProps<GaAvatarProps>()
</script>

<template>
  <div :class="[$style.avatar, $style[size]]">
    {{ content }}
  </div>
</template>

<style module>
.avatar {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--ga-radius-round);
  background-color: var(--ga-color-surface-action);
  color: var(--ga-color-text-on-action);
  font-weight: var(--ga-font-weight-medium);
  font-family: var(--ga-font-family-primary);
}

.small {
  width: var(--ga-size-spacing-06);
  height: var(--ga-size-spacing-06);
  font-size: var(--ga-text-sm-font-size);
}

.medium {
  width: var(--ga-size-spacing-08);
  height: var(--ga-size-spacing-08);
  font-size: var(--ga-text-md-font-size);
}

.large {
  width: var(--ga-size-spacing-10);
  height: var(--ga-size-spacing-10);
  font-size: var(--ga-text-lg-font-size);
}
</style>
