import { computed, ref, shallowRef, watch, type Ref } from 'vue'
import type { DropdownItemProps } from './GaDropdownItem.vue'

export function useDropdownLogic(
  shown: Ref<boolean>,
  model: Ref<string | number>,
  emitUserChange: (value: string | number) => void,
) {
  const children = shallowRef<DropdownItemProps[]>([])
  const focusedIndex = ref(-1)
  const focusedValue = computed(() => children.value[focusedIndex.value]?.value)

  function selectItem(value: string | number) {
    model.value = value
    emitUserChange(value)
    shown.value = false
  }

  function registerChild(child: Partial<DropdownItemProps>) {
    if (child.value === model?.value) focusedIndex.value = children.value.length

    children.value = [...children.value, child]
  }

  function unregisterChild(childToRemove: Partial<DropdownItemProps>) {
    children.value = children.value.filter((c) => c.value !== childToRemove.value)
  }

  function findFirstEnabledIndex(): number {
    return findNextEnabledIndex(-1, 1)
  }

  function findLastEnabledIndex(): number {
    return findNextEnabledIndex(children.value.length, -1)
  }

  function findNextEnabledIndex(currentKnownIndex: number, direction: 1 | -1): number {
    const itemCount = children.value.length
    if (!itemCount) return -1

    for (let i = 1; i <= itemCount; i++) {
      const nextPotentialIndex = (currentKnownIndex + direction * i + itemCount) % itemCount // Wrap around
      if (!children.value[nextPotentialIndex]?.disabled) {
        return nextPotentialIndex
      }
    }

    return -1 // If loop completes, no enabled item was found
  }

  function focusNext() {
    if (!children.value.length) return
    focusedIndex.value = findNextEnabledIndex(focusedIndex.value, 1)
  }

  function focusPrevious() {
    if (!children.value.length) return
    focusedIndex.value = findNextEnabledIndex(focusedIndex.value, -1)
  }

  function handleKeyDown(event: KeyboardEvent) {
    const { key } = event
    const isDropdownOpen = shown.value

    if (!isDropdownOpen) {
      if (['ArrowDown', 'ArrowUp'].includes(key)) {
        event.preventDefault()
        shown.value = true
      }
      return
    }

    switch (key) {
      case 'ArrowDown':
        event.preventDefault()
        focusNext()
        break
      case 'ArrowUp':
        event.preventDefault()
        focusPrevious()
        break
      case 'Home':
        event.preventDefault()
        focusedIndex.value = findFirstEnabledIndex()
        break
      case 'End':
        event.preventDefault()
        focusedIndex.value = findLastEnabledIndex()
        break
      case 'Enter':
      case ' ': // Space key also selects
        event.preventDefault()
        if (focusedValue.value && !children.value[focusedIndex.value]?.disabled) {
          selectItem(focusedValue.value)
        }
        break
      case 'Escape':
        event.preventDefault()
        shown.value = false
        break
      case 'Tab':
        shown.value = false
        break
    }
  }

  watch(
    children,
    (newChildren) => {
      if (newChildren.length && !model.value) focusedIndex.value = findFirstEnabledIndex()
    },
    { flush: 'post' },
  )

  return {
    children,
    focusedValue,
    registerChild,
    unregisterChild,
    handleKeyDown,
    selectItem,
  }
}
