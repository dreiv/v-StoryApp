<script setup lang="ts">
import {
  computed,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
  ref,
  useCssModule,
  watch,
} from 'vue'
import { uniqueId } from '@/core/utils/uniqueId'
import { Menu } from 'floating-vue'
import { ChevronDown } from 'lucide-vue-next'
import { tabsKey, type TabProps } from './types'

export interface TabsProps {
  /**
   * Array of tabs to display
   */
  tabs?: TabProps[]
  /**
   * Whether to use router for navigation
   */
  useRouterLinks?: boolean
  /**
   * Whether to align tabs to the start, center or end
   */
  align?: 'start' | 'center' | 'end'
}

const props = withDefaults(defineProps<TabsProps>(), {
  tabs: () => [],
  useRouterLinks: false,
  align: 'start',
})

const emit = defineEmits(['change'])
const model = defineModel<string>()

// These will be undefined if Vue Router isn't installed
const router = inject<{
  push: (to: string | object) => void
  currentRoute: { value: { path: string } }
}>('router')
const route = router?.currentRoute
const style = useCssModule()

// Internal state
const registeredTabs = ref<TabProps[]>([])
const visibleTabs = ref<TabProps[]>([])
const overflowTabs = ref<TabProps[]>([])
const activeTabId = ref<string>(model?.value || '')
const tabsRef = ref<HTMLElement | null>(null)
const tabsContainerRef = ref<HTMLElement | null>(null)
const resizeObserver = ref<ResizeObserver | null>(null)

// Generate or use provided tabs
const allTabs = computed(() => {
  if (props.tabs.length) {
    return props.tabs.map((tab) => ({
      ...tab,
      id: tab.id || uniqueId('tab-'),
    }))
  }
  return registeredTabs.value
})

// Handle router integration if enabled
if (props.useRouterLinks && route) {
  watch(
    () => route.value?.path,
    (newPath) => {
      if (!newPath) return

      const matchingTab = allTabs.value.find((tab) => {
        if (typeof tab.to === 'string') {
          return tab.to === newPath
        } else if (tab.to && typeof tab.to === 'object' && 'path' in tab.to) {
          return tab.to.path === newPath
        }
        return false
      })

      if (matchingTab) {
        setActiveTab(matchingTab.id as string)
      }
    },
    { immediate: true },
  )
}

// Watch for model/value changes
watch(
  () => model?.value,
  (newValue) => {
    if (newValue && newValue !== activeTabId.value) {
      setActiveTab(newValue)
    }
  },
)

// Provide context for child components
provide(tabsKey, {
  activeTab: activeTabId.value,
  setActiveTab,
  registerTab,
  unregisterTab,
  isOverflowTab: (id: string) => overflowTabs.value.some((tab) => tab.id === id),
})

function setActiveTab(id: string) {
  const tab = allTabs.value.find((t) => t.id === id)

  if (!tab || tab.disabled) return

  activeTabId.value = id
  if (model.value !== undefined) {
    model.value = id
  }

  emit('change', id)

  // Handle router navigation if enabled
  if (props.useRouterLinks && router && tab.to) {
    try {
      router.push(tab.to)
    } catch (e) {
      console.warn('Failed to navigate with Vue Router:', e)
    }
  }
}

function registerTab(tab: TabProps) {
  const newTab = {
    ...tab,
    id: tab.id || uniqueId('tab-'),
  }

  registeredTabs.value.push(newTab)

  // If it's the first tab and no active tab is set, make it active
  if (registeredTabs.value.length === 1 && !activeTabId.value) {
    setActiveTab(newTab.id as string)
  }
}

function unregisterTab(id: string) {
  const index = registeredTabs.value.findIndex((t) => t.id === id)
  if (index !== -1) {
    registeredTabs.value.splice(index, 1)
  }
}

function calculateVisibleTabs() {
  if (!tabsContainerRef.value || !tabsRef.value) return

  const containerWidth = tabsContainerRef.value.offsetWidth
  const tabElements = Array.from(tabsRef.value.querySelectorAll('[data-tab-id]'))

  let totalWidth = 0
  const moreButtonWidth = 50 // Approximate width for the "more" button

  // Reset to all tabs visible
  visibleTabs.value = [...allTabs.value]
  overflowTabs.value = []

  // Skip calculation if we have enough space for all tabs
  const allTabsWidth = tabElements.reduce((sum, el) => sum + (el as HTMLElement).offsetWidth, 0)
  if (allTabsWidth + 10 <= containerWidth) return // 10px buffer

  // We need to move some tabs to overflow
  const availableWidth = containerWidth - moreButtonWidth
  const tabsToShow = []
  const tabsToOverflow = []

  // Calculate which tabs fit in the container
  for (let i = 0; i < allTabs.value.length; i++) {
    const tab = allTabs.value[i]
    const tabEl = tabElements.find((el) => el.getAttribute('data-tab-id') === tab.id) as HTMLElement

    if (!tabEl) continue

    const tabWidth = tabEl.offsetWidth

    if (totalWidth + tabWidth <= availableWidth) {
      tabsToShow.push(tab)
      totalWidth += tabWidth
    } else {
      tabsToOverflow.push(tab)
    }
  }

  visibleTabs.value = tabsToShow
  overflowTabs.value = tabsToOverflow
}

// Setup resize observer to handle responsive behavior
onMounted(() => {
  nextTick(() => {
    if (!tabsContainerRef.value) return

    resizeObserver.value = new ResizeObserver(() => {
      calculateVisibleTabs()
    })

    resizeObserver.value.observe(tabsContainerRef.value)
    calculateVisibleTabs()
  })
})

onUnmounted(() => {
  if (resizeObserver.value) {
    resizeObserver.value.disconnect()
  }
})

// Recalculate visible tabs when tabs change
watch(
  () => allTabs.value.length,
  () => {
    nextTick(calculateVisibleTabs)
  },
)

// Classes computed property
const tabsClasses = computed(() =>
  [style.tabs, props.align === 'center' && style.center, props.align === 'end' && style.end].filter(
    Boolean,
  ),
)
</script>

<template>
  <div :class="style.container" ref="tabsContainerRef">
    <div :class="tabsClasses" ref="tabsRef">
      <!-- Direct child tabs from slots or props -->
      <template v-for="tab in visibleTabs" :key="tab.id">
        <component
          :is="tab.to && props.useRouterLinks && router ? 'router-link' : 'button'"
          :class="[
            style.tab,
            { [style.active]: tab.id === activeTabId, [style.disabled]: tab.disabled },
          ]"
          :to="tab.to && props.useRouterLinks && router ? tab.to : undefined"
          :disabled="tab.disabled"
          :data-tab-id="tab.id"
          @click="!tab.disabled && setActiveTab(tab.id as string)"
        >
          <component :is="tab.icon" v-if="tab.icon" :size="16" :class="style.icon" />
          {{ tab.label }}
        </component>
      </template>

      <!-- Overflow tabs dropdown -->
      <Menu v-if="overflowTabs.length > 0" :class="style.moreMenu">
        <button :class="style.moreButton">
          More
          <ChevronDown :size="16" />
        </button>

        <template #popper>
          <div :class="style.menuContent">
            <div
              v-for="tab in overflowTabs"
              :key="tab.id"
              :class="[
                style.overflowTab,
                { [style.active]: tab.id === activeTabId, [style.disabled]: tab.disabled },
              ]"
              @click="!tab.disabled && setActiveTab(tab.id as string)"
            >
              <component :is="tab.icon" v-if="tab.icon" :size="16" :class="style.icon" />
              {{ tab.label }}
            </div>
          </div>
        </template>
      </Menu>
    </div>

    <!-- Tab content -->
    <div :class="style.content">
      <slot />
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.tabs {
  display: flex;
  position: relative;
  align-items: center;
  border-bottom: 1px solid var(--ga-color-border-subtle);
  overflow: hidden;
}

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

.center {
  justify-content: center;
}

.end {
  justify-content: flex-end;
}

.content {
  padding: var(--ga-size-spacing-04) 0;
}

.moreButton {
  display: flex;
  align-items: center;
  gap: var(--ga-size-spacing-01);
  cursor: pointer;
  margin-left: var(--ga-size-spacing-02);
  border: none;
  background: transparent;
  padding: var(--ga-size-spacing-02) var(--ga-size-spacing-04);
  color: var(--ga-color-text-secondary);
}

.moreButton:hover {
  color: var(--ga-color-text-primary);
}

.menuContent {
  box-shadow: var(--ga-shadow-sm);
  border: 1px solid var(--ga-color-border-subtle);
  border-radius: var(--ga-radius-md);
  background: var(--ga-color-background);
  min-width: 150px;
  overflow: hidden;
}

.overflowTab {
  display: flex;
  align-items: center;
  gap: var(--ga-size-spacing-02);
  transition: background-color 0.2s ease;
  cursor: pointer;
  padding: var(--ga-size-spacing-03) var(--ga-size-spacing-04);
}

.overflowTab:hover:not(.disabled) {
  background-color: var(--ga-color-background-subtle);
}

.overflowTab.active {
  background-color: var(--ga-color-background-subtle);
  color: var(--ga-color-text-primary);
  font-weight: var(--ga-font-weight-medium);
}

.overflowTab.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon {
  color: currentColor;
}
</style>
