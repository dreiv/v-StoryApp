import { computed, useCssModule, type InputHTMLAttributes } from 'vue'

export interface AriaProps extends /* @vue-ignore */ InputHTMLAttributes {
  error?: boolean
  errorMessage?: string
}

export function useAria(props: AriaProps) {
  const style = useCssModule()
  const ariaStyles = computed(() => [{ [style.error]: props?.error }])

  const ariaAttrs = computed(() => ({
    'aria-invalid': props?.error ? true : undefined,
    'aria-errormessage': props?.errorMessage ?? undefined,
  }))

  return { ariaStyles, ariaAttrs }
}
