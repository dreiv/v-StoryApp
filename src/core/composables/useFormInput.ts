import { computed, useCssModule, type InputHTMLAttributes } from 'vue'

export interface FormInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  label?: string
  error?: boolean
  errorMessage?: string
}

export function useFormInput(props: FormInputProps) {
  const style = useCssModule()

  const classes = computed(() => {
    const classList = [style.input]

    if (props.error) {
      classList.push(style.error)
    }

    return classList
  })

  const aria = computed(() => ({
    'aria-invalid': props.error ? true : undefined,
    'aria-errormessage': props.errorMessage || undefined,
  }))

  return { style, classes, aria }
}
