import type { InjectionKey } from 'vue'

export interface FormFieldContext {
  id: string
}

export const formFieldKey: InjectionKey<FormFieldContext> = Symbol('formField')
