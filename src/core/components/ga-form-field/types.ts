import type { InjectionKey } from 'vue'

export interface FormFieldContext {
  id?: string
  disabled?: boolean
  error?: boolean
}

export const formFieldKey: InjectionKey<FormFieldContext> = Symbol('formField')
