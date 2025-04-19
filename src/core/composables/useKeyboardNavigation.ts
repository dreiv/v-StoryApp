import { ref, type Ref, computed, onUnmounted, watch } from 'vue'

export function useKeyboardNavigation(
  selectableChildren: Ref<readonly HTMLButtonElement[]>,
  shown: Ref<boolean>,
) {
  const activeIndex = ref(-1)

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

  let removeListener: (() => void) | null = null

  watch(
    shown,
    (newValue) => {
      if (newValue) {
        window.addEventListener('keydown', handleKeyDown)
        removeListener = () => {
          window.removeEventListener('keydown', handleKeyDown)
        }
      } else {
        if (removeListener) {
          removeListener()
          removeListener = null
        }
        resetActiveIndex()
      }
    },
    { immediate: true },
  )

  onUnmounted(() => {
    if (removeListener) {
      removeListener()
    }
  })

  return {
    handleKeyDown,
    resetActiveIndex,
  }
}
