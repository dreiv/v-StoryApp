import { computed, ref, shallowRef, watch, type ModelRef, type Ref } from 'vue'
import type { SelectItemProps } from './GaSelectItem.vue'

export function useSelectLogic(
  onChange: (value: SelectItemProps) => void,
  shown: Ref<boolean>,
  model: ModelRef<SelectItemProps | undefined>,
) {
  const children = shallowRef<SelectItemProps[]>([])
  const focusedIndex = ref(-1)
  const focusedItem = computed(() => children.value[focusedIndex.value])

  function registerChild(child: SelectItemProps) {
    if (child.value === model?.value?.value) focusedIndex.value = children.value.length // Set focus

    children.value = [...children.value, child]
  }

  function unregisterChild(childToRemove: Pick<SelectItemProps, 'value'>) {
    if (childToRemove.value === focusedItem?.value?.value) focusedIndex.value = -1 // Reset focus

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
      const term = currentKnownIndex + direction * i
      const nextPotentialIndex = ((term % itemCount) + itemCount) % itemCount // Wrap around safely
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
    const isSelectOpen = shown.value

    if (!isSelectOpen) {
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
        if (!focusedItem.value?.disabled) onChange(focusedItem.value)
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
      if (newChildren.length && !model?.value?.value) focusedIndex.value = findFirstEnabledIndex()
    },
    { flush: 'post' },
  )

  return { focusedItem, registerChild, unregisterChild, handleKeyDown }
}
