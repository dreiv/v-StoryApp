import { computed, useCssModule } from 'vue'

export interface FormInputProps {
  label?: string
  error?: boolean
  errorMessage?: string
}

export function useFormInput(props: FormInputProps) {
  const style = useCssModule()
  const classes = computed(() => [style.input, { [style.error]: props.error }])

  const aria = computed(() => ({
    'aria-invalid': props.error ? true : undefined,
    'aria-errormessage': props.errorMessage ?? undefined,
  }))

  return { style, classes, aria }
}
