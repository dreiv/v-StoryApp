<script setup lang="ts">
import { computed, useCssModule } from 'vue'
export interface SpinnerProps {
  size?: 'sm' | 'default' | 'lg'
  label?: string
}

const { size = 'default' } = defineProps<SpinnerProps>()
const style = useCssModule()
const classes = computed(() => [
  style.spinner,
  { [style.small]: size === 'sm', [style.large]: size === 'lg' },
])
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    stroke-width="6.4"
    :class="classes"
    :aria-label="label"
  >
    <defs><circle id="circle" cx="16" cy="16" r="12.8" fill="none" /></defs>

    <use href="#circle" stroke="pink" />
    <use
      href="#circle"
      :class="$style.circle"
      stroke="lime"
      stroke-linecap="round"
      stroke-dasharray="21 84"
    />
  </svg>
</template>

<style module>
@keyframes load {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.small {
  width: var(--ga-size-16);
  height: var(--ga-size-16);
}
.large {
  width: var(--ga-size-48);
  height: var(--ga-size-48);
}

.circle {
  transform-origin: center;
  animation: load 1.2s linear infinite;
}
</style>
