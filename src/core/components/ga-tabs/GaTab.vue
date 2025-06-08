<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, useTemplateRef, useCssModule } from 'vue'
import { RouterLink } from 'vue-router'
import { uniqueId } from '@/core/utils/uniqueId'
import { tabsKey, type TabsContext } from './types'

export interface TabProps {
  id?: string
  label: string
  active?: boolean
  disabled?: boolean
  to?: string | object
  icon?: unknown
}

const props = withDefaults(defineProps<TabProps>(), {
  id: () => uniqueId('tab-'),
  active: false,
  disabled: false,
})

const emit = defineEmits(['click'])
const buttonRef = useTemplateRef<HTMLElement>('buttonRef')
const style = useCssModule()

// Get parent tabs context
const parent = inject<TabsContext | null>(tabsKey, null)

// Register with parent on mount
onMounted(() => {
  if (parent) {
    parent.registerTab({
      id: props.id,
      label: props.label,
      disabled: props.disabled,
      to: props.to,
      icon: props.icon,
    })
  }
})

// Unregister on unmount
onBeforeUnmount(() => {
  if (parent) {
    parent.unregisterTab(props.id)
  }
})

// Determine if the tab is active
const isActive = computed(() => {
  if (parent) {
    return parent.model.value === props.id
  }
  return props.active
})

// Compute classes based on state
const classes = computed(() => [
  style.tab,
  { [style.active]: isActive.value, [style.disabled]: props.disabled },
])

// Handle click events
function handleClick() {
  if (props.disabled) return

  emit('click')

  if (parent) {
    parent.model.value = props.id
  }
}

// Get access to router if available
const router = inject<{
  push: (to: string | object) => void
  currentRoute: { value: { path: string } }
}>('router')

// Determine if we should use router links
const useRouterLink = computed(() => !!props.to && !!router)

// Determine the component to render (router-link or button)
const component = computed(() => (useRouterLink.value ? RouterLink : 'button'))
</script>

<template>
  <component
    :is="component"
    :class="classes"
    :to="props.to && useRouterLink ? props.to : undefined"
    :disabled="props.disabled"
    :data-tab-id="props.id"
    @click="handleClick"
    ref="buttonRef"
  >
    <component :is="props.icon" v-if="props.icon" :size="16" :class="style.icon" />
    <slot>{{ props.label }}</slot>
  </component>
</template>

<style module>
.tab {
  display: flex;
  position: relative;
  align-items: center;
  gap: var(--ga-size-spacing-02);

  cursor: pointer;
  border: none;
  border-bottom: var(--ga-size-spacing-02) solid transparent;
  background: transparent;
  padding: var(--ga-size-spacing-03) var(--ga-size-spacing-05) var(--ga-size-spacing-02);
  height: var(--ga-size-spacing-07);
  color: var(--ga-color-text-action);

  font-weight: var(--ga-font-weight-medium);
  font-size: var(--ga-text-md-font-size);
  line-height: var(--ga-text-md-line-height);
  font-family: var(--ga-font-family-primary);
  letter-spacing: var(--ga-text-md-tracking);
  text-decoration: none;
  white-space: nowrap;
}

.tab:hover:not(.disabled) {
  border-color: var(--ga-color-border-action-hover);
}

.tab.active {
  border-color: var(--ga-color-border-action);
  font-weight: var(--ga-font-weight-semibold);
}

.tab.disabled {
  cursor: not-allowed;
  color: var(--ga-color-text-disabled);
}

.icon {
  color: currentColor;
}
</style>
