import { ref, type Ref } from 'vue'
import type { DropdownItemProps } from './GaDropdownItem.vue'

export function useDropdownLogic(
  shown: Ref<boolean>,
  model: Ref<string | number>,
  emitUserChange: (value: string | number) => void,
) {
  const children = ref<DropdownItemProps[]>([])
  const activeChild = ref<string | number | undefined>()

  function selectItem(value: string | number) {
    model.value = value
    emitUserChange(value)
    shown.value = false
    activeChild.value = value
  }

  function registerChild(child: Partial<DropdownItemProps>) {
    children.value.push(child as DropdownItemProps)

    if (child.value === model?.value) {
      activeChild.value = child.value as string | number
    }
  }

  function unregisterChild(childToRemove: Partial<DropdownItemProps>) {
    children.value = children.value.filter((c) => c.value !== childToRemove.value)

    if (activeChild.value === childToRemove.value) {
      activeChild.value = undefined
    }
  }

  function getEnabledItems() {
    return children.value.filter((c) => !c.disabled)
  }

  function getFirstEnabledItemValue(): string | number | undefined {
    return getEnabledItems()[0]?.value
  }

  function getLastEnabledItemValue(): string | number | undefined {
    const enabled = getEnabledItems()
    return enabled.length > 0 ? enabled[enabled.length - 1].value : undefined
  }

  // Finds the next or previous enabled item value.
  function findNextEnabledItemValue(
    currentValue: string | number | undefined,
    direction: 1 | -1,
  ): string | number | undefined {
    const enabledItems = getEnabledItems()
    const itemCount = enabledItems.length
    if (itemCount === 0) return undefined

    let currentIndex = -1
    if (currentValue !== undefined) {
      currentIndex = enabledItems.findIndex((item) => item.value === currentValue)
    }

    if (currentIndex === -1) {
      return direction === 1 ? enabledItems[0]?.value : enabledItems[itemCount - 1]?.value
    }

    const nextIndex = (currentIndex + direction + itemCount) % itemCount
    return enabledItems[nextIndex]?.value
  }

  function focusNext() {
    activeChild.value = findNextEnabledItemValue(activeChild.value, 1)
  }

  function focusPrevious() {
    activeChild.value = findNextEnabledItemValue(activeChild.value, -1)
  }

  function handleKeyDown(event: KeyboardEvent) {
    const { key } = event
    const isDropdownOpen = shown.value

    if (!isDropdownOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(key)) {
        event.preventDefault()
        shown.value = true
        // const enabledItems = getEnabledItems()
        // if (enabledItems.length > 0) {
        //   const modelItem = enabledItems.find((c) => c.value === model.value)
        //   if (modelItem) {
        //     activeChild.value = modelItem.value
        //   } else {
        //     activeChild.value =
        //       key === 'ArrowUp' ? getLastEnabledItemValue() : getFirstEnabledItemValue()
        //   }
        // }
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
        activeChild.value = getFirstEnabledItemValue()
        break
      case 'End':
        event.preventDefault()
        activeChild.value = getLastEnabledItemValue()
        break
      case 'Enter':
      case ' ': // Space key also selects
        event.preventDefault()
        if (activeChild.value !== undefined) {
          const selectedItem = getEnabledItems().find((c) => c.value === activeChild.value)
          if (selectedItem) {
            selectItem(selectedItem.value!)
          }
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
    activeChild,
    registerChild,
    unregisterChild,
    handleKeyDown,
    selectItem,
  }
}
