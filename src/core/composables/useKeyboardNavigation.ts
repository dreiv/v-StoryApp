import { ref, type Ref, computed, onUnmounted, watch } from 'vue'

export function useKeyboardNavigation(
  selectableChildren: Ref<readonly HTMLButtonElement[]>,
  shown: Ref<boolean>,
  model?: Ref<string | number>,
) {
  const activeIndex = ref(-1)
  let abortController: AbortController | null = null

  const actionableChildren = computed(() =>
    selectableChildren.value.filter((child) => !child.disabled),
  )

  const focusNext = () => {
    if (shown.value && actionableChildren.value.length > 0) {
      activeIndex.value = (activeIndex.value + 1) % actionableChildren.value.length
      actionableChildren.value[activeIndex.value]?.focus()
    }
  }

  const focusPrevious = () => {
    if (shown.value && actionableChildren.value.length > 0) {
      activeIndex.value =
        (activeIndex.value - 1 + actionableChildren.value.length) % actionableChildren.value.length
      actionableChildren.value[activeIndex.value]?.focus()
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (shown.value) {
      if (event.key === 'ArrowDown') {
        focusNext()
      } else if (event.key === 'ArrowUp') {
        focusPrevious()
      }
    }
  }

  const resetActiveIndex = () => {
    activeIndex.value = -1
  }

  watch(
    shown,
    (newValue) => {
      if (newValue) {
        abortController = new AbortController()
        window.addEventListener('keydown', handleKeyDown, { signal: abortController.signal })

        setTimeout(() => {
          // Set active index to the currently selected item
          const selectedIndex = actionableChildren.value.findIndex(
            (child) => child.dataset.value === String(model?.value), // Assuming you set a data-value attribute on GaDropdownItem
          )
          if (selectedIndex !== -1) {
            activeIndex.value = selectedIndex
            // Optionally focus the selected item immediately upon opening
            actionableChildren.value[activeIndex.value]?.focus()
          }
        }, 100)
      } else {
        abortController?.abort()
        abortController = null
        resetActiveIndex()
      }
    },
    { immediate: true, flush: 'post' },
  )

  onUnmounted(() => {
    abortController?.abort()
  })

  return {
    handleKeyDown,
    resetActiveIndex,
  }
}
