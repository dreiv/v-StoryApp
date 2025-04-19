import { ref, type Ref, computed, onUnmounted, watch } from 'vue'

export function useKeyboardNavigation(
  selectableChildren: Ref<readonly HTMLButtonElement[]>,
  shown: Ref<boolean>,
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
      } else {
        abortController?.abort()
        abortController = null
        resetActiveIndex()
      }
    },
    { immediate: true },
  )

  onUnmounted(() => {
    abortController?.abort()
  })

  return {
    handleKeyDown,
    resetActiveIndex,
  }
}
