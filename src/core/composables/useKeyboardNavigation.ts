import { ref, type Ref, readonly, computed } from 'vue'

export function useKeyboardNavigation(selectableChildren: Ref<readonly HTMLButtonElement[]>) {
  const activeIndex = ref(-1)

  const actionableChildren = computed(() =>
    selectableChildren.value.filter((child) => !child.disabled),
  )

  const focusNext = () => {
    if (actionableChildren.value.length > 0) {
      activeIndex.value = (activeIndex.value + 1) % actionableChildren.value.length
      actionableChildren.value[activeIndex.value]?.focus()
    }
  }

  const focusPrevious = () => {
    if (actionableChildren.value.length > 0) {
      activeIndex.value =
        (activeIndex.value - 1 + actionableChildren.value.length) % actionableChildren.value.length
      actionableChildren.value[activeIndex.value]?.focus()
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      focusNext()
    } else if (event.key === 'ArrowUp') {
      focusPrevious()
    }
  }

  const resetActiveIndex = () => {
    activeIndex.value = -1
  }

  return {
    focusNext,
    focusPrevious,
    handleKeyDown,
    resetActiveIndex,
  }
}
