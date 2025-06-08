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
</style>
