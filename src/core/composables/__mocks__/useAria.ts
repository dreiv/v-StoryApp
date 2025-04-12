import { computed, type ComputedRef } from 'vue'
import type { AriaProps } from '../useAria'

export interface UseAriaMock {
  ariaStyles: ComputedRef<string[]>
  ariaAttrs: ComputedRef<Record<string, string | undefined | boolean>>
}

export function useAria(props: AriaProps): UseAriaMock {
  return {
    ariaStyles: computed(() => [props.error ? 'mock-error' : '']),
    ariaAttrs: computed(() => ({
      'aria-invalid': props.error ? 'true' : undefined,
      'aria-errormessage': props.errorMessage || undefined,
    })),
  }
}
