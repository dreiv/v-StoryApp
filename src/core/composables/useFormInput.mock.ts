import { computed, type ComputedRef } from 'vue'
import { type FormInputProps } from './useFormInput'

export interface UseFormInputMock {
  style: Record<string, string>
  classes: ComputedRef<string[]>
  aria: ComputedRef<Record<string, string | undefined | boolean>>
}

export function useFormInputMock(props: FormInputProps): UseFormInputMock {
  return {
    style: { input: 'mock-input', error: 'mock-error' },
    classes: computed(() => ['mock-input', props.error ? 'mock-error' : '']),
    aria: computed(() => ({
      'aria-invalid': props.error ? 'true' : undefined,
      'aria-errormessage': props.errorMessage || undefined,
    })),
  }
}
