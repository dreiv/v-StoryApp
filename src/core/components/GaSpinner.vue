<script setup lang="ts">
import { computed } from 'vue'
export interface SpinnerProps {
  size?: 'sm' | 'default' | 'lg'
  label?: string
}

const { size = 'default' } = defineProps<SpinnerProps>()
const sizeMap = {
  sm: { size: 16, strokeWidth: 3.2 },
  default: { size: 32, strokeWidth: 6.3 },
  lg: { size: 48, strokeWidth: 9.6 },
}

const pixelSize = computed(() => sizeMap[size].size)
const strokeWidth = computed(() => sizeMap[size].strokeWidth)
const radius = computed(() => pixelSize.value / 2 - strokeWidth.value / 2)
const dashArray = computed(() => (radius.value * Math.PI) / 2 + ' ' + radius.value * Math.PI * 2)
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="pixelSize"
    :height="pixelSize"
    :viewBox="`0 0 ${pixelSize} ${pixelSize}`"
    :class="$style.load"
    :aria-label="label"
  >
    <circle
      :cx="pixelSize / 2"
      :cy="pixelSize / 2"
      :r="radius"
      fill="none"
      :stroke-width="strokeWidth"
      stroke="pink"
    />

    <circle
      :class="$style.circle"
      fill="none"
      :cx="pixelSize / 2"
      :cy="pixelSize / 2"
      :r="radius"
      :stroke-width="strokeWidth"
      stroke="lime"
      stroke-linecap="round"
      :stroke-dasharray="dashArray"
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

.load {
}

.circle {
  transform-origin: center;
  animation: load 1.2s linear infinite;
}
</style>
