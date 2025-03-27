import type { InjectionKey, Ref } from 'vue'

export interface RadioGroupContext {
  name: string
  model: Ref<string>
}
export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('radioGroup')
