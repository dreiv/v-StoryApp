<script setup lang="ts">
import { computed, useCssModule, onBeforeMount } from 'vue'
import { Hourglass } from 'lucide-vue-next'
import type { FormInputProps } from '../composables/useFormInput'

export interface SpinnerProps extends FormInputProps {
  size?: 'sm' | 'default' | 'lg'
  direction?: 'horizontal' | 'vertical'
}

let reducedMotion = false
onBeforeMount(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

const {
  size = 'default',
  direction = 'horizontal',
  error,
  errorMessage,
  label,
} = defineProps<SpinnerProps>()
const style = useCssModule()

const sizeCss = computed(() => [{ [style.small]: size === 'sm', [style.large]: size === 'lg' }])
const containerCss = computed(() => [
  style.container,
  { [style.vertical]: direction === 'vertical' },
])

const aria = computed(() => ({
  'aria-label': label,
  'aria-invalid': error ? true : undefined,
  'aria-errormessage': errorMessage ?? undefined,
}))
</script>

<template>
  <div :class="containerCss" v-bind="aria">
    <slot name="icon">
      <hourglass v-if="reducedMotion" :class="[$style.icon, ...sizeCss]" />

      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        stroke-width="6.4"
        :class="[$style.icon, ...sizeCss]"
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

    <span :class="[$style.label, ...sizeCss]">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  gap: var(--ga-size-4);

  &.vertical {
    flex-direction: column;
    gap: var(--ga-size-8);
  }
}

.icon {
  &.small {
    width: var(--ga-size-16);
    height: var(--ga-size-16);
  }
  &.large {
    width: var(--ga-size-48);
    height: var(--ga-size-48);
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
  min-height: var(--ga-size-16);
  color: var(--ga-color-text-body);
  font-size: var(--text-md);
  line-height: var(--text-md--line-height);

  &:empty {
    display: none;
  }
}

.vertical .label {
  font-size: var(--text-sm);
  line-height: var(--text-sm--line-height);

  &.small {
    font-size: var(--text-xs);
    line-height: var(--text-xs--line-height);
  }
  &.large {
    font-size: var(--text-md);
    line-height: var(--text-md--line-height);
  }
}
</style>
