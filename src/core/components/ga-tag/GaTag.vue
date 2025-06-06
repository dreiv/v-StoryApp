<script setup lang="ts">
import { computed, useCssModule, useTemplateRef } from 'vue'

export interface TagProps {
  label?: string
  beforeIcon?: string | object
  afterIcon?: string | object
  separator?: boolean
  interactive?: boolean
  selected?: boolean
  success?: boolean
  information?: boolean
  error?: boolean
  warning?: boolean
  disabled?: boolean
  utility?:
    | 'grey'
    | 'indigo'
    | 'teal'
    | 'lime'
    | 'purple'
    | 'pink'
    | 'rose'
    | 'yellow'
    | 'blue'
    | 'green'
    | 'orange'
    | 'disabled'
}

const emit = defineEmits(['onDelete'])
const {
  afterIcon,
  disabled,
  error,
  information,
  interactive,
  selected,
  success,
  utility,
  warning,
} = defineProps<TagProps>()
const style = useCssModule()

const componentRef = useTemplateRef<HTMLElement>('componentRef')

const classes = computed(() => {
  const classList = [style.tag]

  if (utility) {
    classList.push(style.utility, style[utility])
  }

  if (interactive) {
    classList.push(style.interactive)
    if (selected) classList.push(style.selected)
  }

  if (disabled) {
    classList.push(style.disabled)
  } else if (information) {
    classList.push(style.information)
  } else if (error) {
    classList.push(style.error)
  } else if (warning) {
    classList.push(style.warning)
  } else if (success) {
    classList.push(style.success)
  } else {
    classList.push(style.default)
  }

  return classList
})

const is = computed(() => (interactive || afterIcon ? 'button' : 'span'))

const handleKeyup = (event: KeyboardEvent) => {
  if (disabled) return
  if (event.key === 'Backspace' || event.key === 'Delete') {
    emit('onDelete')
  } else if (event.key === 'Escape' && componentRef.value) {
    componentRef.value.blur()
  }
}
</script>

<template>
  <component :is :class="classes" :disabled @keyup="handleKeyup" ref="componentRef">
    <slot name="before-icon">
      <component :is="beforeIcon" v-if="beforeIcon" :class="$style.beforeIcon" :size="14" />
    </slot>
    <slot>{{ label }}</slot>

    <span v-if="separator" :class="$style.separator" />
    <slot name="after-icon">
      <component :is="afterIcon" v-if="afterIcon" :class="$style.afterIcon" :size="14" />
    </slot>
  </component>
</template>

<style module>
.tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--ga-size-spacing-02);

  border-radius: var(--ga-radius-round);
  padding: var(--ga-size-spacing-02) var(--ga-size-spacing-03);

  font-size: var(--ga-text-sm-font-size);
  letter-spacing: var(--ga-text-sm-tracking);

  &:focus-visible {
    outline: var(--ga-size-border-width-md) solid var(--ga-color-border-focus);
    outline-offset: var(--ga-size-spacing-01);
  }

  &:enabled:is(:hover, :focus) {
    .afterIcon {
      cursor: pointer;
      color: var(--ga-color-icon-action-hover);
    }
  }
}

.default {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-action);
  background-color: var(--ga-color-surface-primary);
  color: var(--ga-color-text-action);
}

.separator {
  background-color: var(--ga-color-border-disabled);
  width: 1px;
  height: 100%;
}

.success {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-success);
  background-color: var(--ga-color-utility-green-light);
  color: var(--ga-color-text-success);

  .beforeIcon {
    color: var(--ga-color-icon-success);
  }
}

.interactive {
  &:not(.selected, .utility) {
    border-style: dashed;
  }

  &:enabled {
    cursor: pointer;
  }

  &:not(:active, :disabled):is(:hover, :focus) {
    background-color: var(--ga-color-surface-action-hover-2);

    .beforeIcon,
    .afterIcon {
      color: var(--ga-color-icon-action-hover);
    }
  }

  &:disabled {
    cursor: not-allowed;
    border-color: var(--ga-color-surface-disable-selected);
    background-color: var(--ga-color-surface-disable-selected);
    color: var(--ga-color-text-on-action);

    .beforeIcon,
    .afterIcon {
      color: var(--ga-color-icon-on-primary);
    }

    &:not(.selected) {
      border-color: var(--ga-color-border-disabled);
      background-color: var(--ga-color-surface-primary);
      color: var(--ga-color-text-disabled);

      .beforeIcon,
      .afterIcon {
        color: var(--ga-color-icon-disabled);
      }
    }
  }
}

.information {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-information);
  background-color: var(--ga-color-utility-blue-light);
  color: var(--ga-color-text-information);

  .beforeIcon {
    color: var(--ga-color-icon-information);
  }
}

.error {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-error);
  background-color: var(--ga-color-utility-red-light);
  color: var(--ga-color-text-error);

  .beforeIcon {
    color: var(--ga-color-icon-error);
  }
}

.warning {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-warning);
  background-color: var(--ga-color-utility-orange-light);
  color: var(--ga-color-text-warning);

  .beforeIcon {
    color: var(--ga-color-icon-warning);
  }
}

.disabled {
  border: var(--ga-size-border-width-sm) solid var(--ga-color-border-disabled);
  background-color: var(--ga-color-surface-disabled);
  color: var(--ga-color-text-disable-selected);

  .beforeIcon {
    color: var(--ga-color-icon-on-disabled);
  }
}

.utility {
  border-radius: var(--ga-radius);

  .beforeIcon {
    color: var(--ga-color-text-body);
  }

  &.grey {
    border-color: var(--ga-color-utility-grey);
    background-color: var(--ga-color-utility-grey-light);
  }

  &.indigo {
    border-color: var(--ga-color-utility-indigo);
    background-color: var(--ga-color-utility-indigo-light);
  }

  &.teal {
    border-color: var(--ga-color-utility-teal);
    background-color: var(--ga-color-utility-teal-light);
  }

  &.lime {
    border-color: var(--ga-color-utility-lime);
    background-color: var(--ga-color-utility-lime-light);
  }

  &.purple {
    border-color: var(--ga-color-utility-purple);
    background-color: var(--ga-color-utility-purple-light);
  }

  &.pink {
    border-color: var(--ga-color-utility-pink);
    background-color: var(--ga-color-utility-pink-light);
  }

  &.rose {
    border-color: var(--ga-color-utility-rose);
    background-color: var(--ga-color-utility-rose-light);
  }

  &.yellow {
    border-color: var(--ga-color-utility-yellow);
    background-color: var(--ga-color-utility-yellow-light);
  }

  &.blue {
    border-color: var(--ga-color-utility-blue);
    background-color: var(--ga-color-utility-blue-light);
  }

  &.green {
    border-color: var(--ga-color-utility-green);
    background-color: var(--ga-color-utility-green-light);
  }

  &.orange {
    border-color: var(--ga-color-utility-orange);
    background-color: var(--ga-color-utility-orange-light);
  }
}
</style>
