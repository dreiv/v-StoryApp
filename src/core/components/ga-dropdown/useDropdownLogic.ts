import { computed, ref, shallowRef, type Ref } from 'vue'
import type { DropdownItemProps } from './GaDropdownItem.vue'

export function useDropdownLogic(
  shown: Ref<boolean>,
  model: Ref<string | number>,
  emitUserChange: (value: string | number) => void,
) {
  const children = shallowRef<DropdownItemProps[]>([])
  const focusedIndex = ref(0)
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

  function findNextEnabledItemValue(direction: 1 | -1) {
    const itemCount = children.value.length

    for (let i = 0; i < itemCount; i++) {
      const index = (focusedIndex.value + direction + itemCount) % itemCount // Wrap around

      focusedIndex.value = index
      if (children.value[index]?.disabled) continue
      break
    }
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
        findNextEnabledItemValue(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        findNextEnabledItemValue(-1)
        break
      case 'Home':
        event.preventDefault()
        focusedIndex.value = 0
        break
      case 'End':
        event.preventDefault()
        focusedIndex.value = children.value.length - 1
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

  return {
    children,
    focusedValue,
    registerChild,
    unregisterChild,
    handleKeyDown,
    selectItem,
  }
}
