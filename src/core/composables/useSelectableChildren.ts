import { ref, type Ref, readonly } from 'vue'

export function useSelectableChildren() {
  const selectableChildren = ref<HTMLElement[]>([])

  const registerChild = (child: HTMLElement) => {
    selectableChildren.value.push(child)
  }

  const unregisterChild = (childToRemove: HTMLElement) => {
    const index = selectableChildren.value.indexOf(childToRemove)
    if (index !== -1) {
      selectableChildren.value.splice(index, 1)
    }
  }

  return {
    selectableChildren: readonly(selectableChildren) as Ref<readonly HTMLElement[]>,
    registerChild,
    unregisterChild,
  }
}
