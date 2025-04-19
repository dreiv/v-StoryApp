import { ref, type Ref, readonly } from 'vue'

export function useSelectableChildren() {
  const selectableChildren = ref<HTMLButtonElement[]>([])

  const registerChild = (child: HTMLButtonElement) => {
    selectableChildren.value.push(child)
  }

  const unregisterChild = (childToRemove: HTMLButtonElement) => {
    const index = selectableChildren.value.indexOf(childToRemove)

    if (index !== -1) selectableChildren.value.splice(index, 1)
  }

  return {
    selectableChildren: readonly(selectableChildren) as Ref<readonly HTMLButtonElement[]>,
    registerChild,
    unregisterChild,
  }
}
