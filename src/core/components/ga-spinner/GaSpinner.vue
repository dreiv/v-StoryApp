<script setup lang="ts">
import { computed, useCssModule, ref, onMounted, onUnmounted } from 'vue'
import { Hourglass } from 'lucide-vue-next'
import { type FormInputProps } from '@/core/composables/useFormInput'

export interface SpinnerProps extends FormInputProps {
  size?: 'small' | 'medium' | 'large'
  direction?: 'horizontal' | 'vertical'
}

const reducedMotion = ref(false)
let mediaQuery: MediaQueryList
let handleChange: (e: MediaQueryListEvent) => void

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = mediaQuery.matches

  handleChange = (e: MediaQueryListEvent) => {
    reducedMotion.value = e.matches
  }

  mediaQuery.addEventListener('change', handleChange)
})

onUnmounted(() => {
  if (mediaQuery && handleChange) {
    mediaQuery.removeEventListener('change', handleChange)
  }
})

const {
  size = 'medium',
  direction = 'horizontal',
  error,
  errorMessage,
  label,
} = defineProps<SpinnerProps>()
const style = useCssModule()

const iconClasses = computed(() => [style.icon, style[size]])

const labelClasses = computed(() => [style.label, style[size]])

const containerClasses = computed(() => {
  const classList = [style.container]

  if (direction === 'vertical') classList.push(style.vertical)

  return classList
})

const aria = computed(() => ({
  'aria-label': label,
  'aria-invalid': error ? true : undefined,
  'aria-errormessage': errorMessage || undefined,
}))
</script>

<template>
  <div :class="containerClasses" v-bind="aria">
    <slot name="icon">
      <hourglass v-if="reducedMotion" :class="iconClasses" />

      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        stroke-width="6.4"
        :class="iconClasses"
      >
        <defs><circle id="circle" cx="16" cy="16" r="12.8" fill="none" /></defs>

        <use href="#circle" stroke="var(--ga-color-secondary)" />
        <use
          href="#circle"
          :class="$style.spinner"
          stroke="var(--ga-color-primary-70)"
          stroke-linecap="round"
          stroke-dasharray="21 84"
        />
      </svg>
    </slot>

    <span :class="labelClasses">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  gap: var(--ga-size-spacing-02);

  &.vertical {
    flex-direction: column;
    gap: var(--ga-size-spacing-03);
  }
}

.icon {
  &.small {
    width: var(--ga-size-spacing-05);
    height: var(--ga-size-spacing-05);
  }

  &.large {
    width: var(--ga-size-spacing-09);
    height: var(--ga-size-spacing-09);
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
.spinner {
  transform-origin: center;
  animation: spin 1.1s cubic-bezier(0.4, 0.2, 0.6, 0.8) infinite;
  will-change: transform;
}

.label {
  min-height: var(--ga-size-spacing-05);
  color: var(--ga-color-text-body);

  font-weight: var(--ga-font-weight-normal);
  font-size: var(--ga-text-sm-font-size);
  line-height: var(--ga-text-sm-line-height);
  font-family: var(--ga-font-family-primary);
  letter-spacing: var(--ga-text-sm-tracking);

  &:empty {
    display: none;
  }
}

.label {
  &.small {
    font-size: var(--ga-text-xs-font-size);
    line-height: var(--ga-text-xs-line-height);
    letter-spacing: var(--ga-text-xs-tracking);
  }

  &.large {
    font-size: var(--ga-text-md-font-size);
    line-height: var(--ga-text-md-line-height);
    letter-spacing: var(--ga-text-md-tracking);
  }
}
</style>
