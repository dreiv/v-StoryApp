import { onMounted, type Ref } from 'vue'
import { useFloating as useFloatingUI, type UseFloatingOptions } from '@floating-ui/vue'

export function useFloating(reference: Ref, floating: Ref, options?: UseFloatingOptions) {
  let referenceEl: HTMLElement

  onMounted(() => {
    if (!reference.value) {
      console.warn('Floating UI: reference ref is not yet defined')
      return
    }

    // Check if the reference element directly contains text content
    if (
      reference.value.childNodes.length > 0 &&
      reference.value.childNodes[0].nodeType === Node.TEXT_NODE &&
      reference.value.childNodes[0].textContent.trim() !== ''
    ) {
      referenceEl = reference.value
    } else if (reference.value.children.length > 0) {
      referenceEl = reference.value.children[0] as HTMLElement
    } else {
      console.warn('Floating UI: Could not determine the reference element')
    }

    if (!referenceEl) {
      console.warn('Floating UI: Final reference element not found')
    }
  })

  return useFloatingUI(reference, floating, options)
}
