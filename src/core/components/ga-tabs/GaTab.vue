<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, useTemplateRef, useCssModule } from 'vue'
import { RouterLink } from 'vue-router'
import { uniqueId } from '@/core/utils/uniqueId'
import { tabsKey } from './types'
import type { TabsContext } from './types'

export interface TabProps {
  /**
   * Unique identifier for the tab
   */
  id?: string
  /**
   * Display label for the tab
   */
  label: string
  /**
   * Whether the tab is active
   */
  active?: boolean
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean
  /**
   * Path for router integration (if using with router)
   */
  to?: string | object
  /**
   * An optional icon to display in the tab
   */
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
    return parent.activeTab === props.id
  }
  return props.active
})

// Compute classes based on state
const classes = computed(() => [
  style.tab,
  isActive.value && style.active,
  props.disabled && style.disabled,
])

// Handle click events
function handleClick() {
  if (props.disabled) return

  emit('click')

  if (parent) {
    parent.setActiveTab(props.id)
  }
}

// Determine the component to render (router-link or button)
const component = computed(() => (props.to ? RouterLink : 'button'))
</script>

<template>
  <component
    :is="component"
    v-bind="props.to ? { to: props.to } : {}"
    :class="classes"
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
  transition: color 0.2s ease;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: var(--ga-size-spacing-03) var(--ga-size-spacing-04);
  color: var(--ga-color-text-secondary);
  font-weight: var(--ga-font-weight-medium);
  font-size: var(--ga-text-sm-font-size);
  text-decoration: none;
  white-space: nowrap;
}

.tab:hover:not(.disabled) {
  color: var(--ga-color-text-primary);
}

.tab.active {
  color: var(--ga-color-text-primary);
}

.tab.active::after {
  position: absolute;
  bottom: -1px;
  left: 0;
  background-color: var(--ga-color-primary);
  width: 100%;
  height: 2px;
  content: '';
}

.tab.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon {
  color: currentColor;
}
</style>
