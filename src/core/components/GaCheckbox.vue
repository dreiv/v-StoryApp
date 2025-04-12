<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { CheckIcon, MinusIcon } from 'lucide-vue-next'
import { useAria, type AriaProps } from '../composables/useAria'

defineOptions({ inheritAttrs: false })
const props = defineProps<AriaProps>()

const { ariaStyles, ariaAttrs } = useAria(props)
const inputRef = useTemplateRef<HTMLElement>('inputRef')
const model = defineModel<boolean>()

defineExpose({ inputRef })
</script>

<template>
  <input
    ref="inputRef"
    type="checkbox"
    :class="[$style.native, ...ariaStyles]"
    v-model="model"
    v-bind="{ ...$attrs, ...ariaAttrs }"
  />

  <div :class="$style.marker">
    <CheckIcon :class="$style.checked" :size="12" :stroke-width="4" />
    <MinusIcon :class="$style.indeterminate" :size="12" :stroke-width="4" />
  </div>
</template>

<style module>
.native,
.marker {
  margin: var(--ga-size-spacing-01) 0 var(--ga-size-spacing-01) var(--ga-size-spacing-01);
  width: var(--ga-size-spacing-05);
  height: var(--ga-size-spacing-05);
}

.marker {
  position: absolute;
  top: 0;
  left: 0;

  border: var(--ga-size-border-width-md) solid var(--ga-color-border-action);
  border-radius: var(--ga-radius);

  pointer-events: none;
  color: var(--ga-color-icon-on-primary);

  & > .checked,
  & > .indeterminate {
    display: none;
  }
}

.native {
  flex-shrink: 0;
  opacity: 0;
  cursor: pointer;

  &:focus-visible + .marker {
    outline: var(--ga-size-border-width-md) solid var(--ga-color-border-focus);
    outline-offset: var(--ga-size-spacing-01);
  }

  &:hover:enabled {
    &:not(:checked, :indeterminate) + .marker {
      border-color: var(--ga-color-border-action-hover);
      background-color: var(--ga-color-surface-action-hover-2);
    }

    &:checked + .marker,
    &:indeterminate + .marker {
      background-color: var(--ga-color-surface-action-hover);
    }
  }

  &:checked + .marker,
  &:indeterminate + .marker {
    background-color: var(--ga-color-surface-action);
  }
  &:checked + .marker > .checked {
    display: block;
  }
  &:indeterminate + .marker > .indeterminate {
    display: block;
  }

  &:disabled {
    cursor: not-allowed;

    + .marker {
      border-color: var(--ga-color-border-disabled);
      background-color: var(--ga-color-surface-disabled);
      color: var(--ga-color-icon-on-disabled);
    }

    ~ .label {
      color: var(--ga-color-text-disabled);
    }
  }

  &.error {
    + .marker {
      border-color: var(--ga-color-border-error);
      background-color: var(--ga-color-surface-error);
      color: var(--ga-color-icon-error);
    }

    &:checked + .marker,
    &:indeterminate + .marker {
      background-color: var(--ga-color-surface-error);
    }

    &:hover:enabled + .marker {
      border-color: var(--ga-color-border-error-hover);
      background-color: var(--ga-color-surface-action-hover-2);
    }
  }
}
</style>
