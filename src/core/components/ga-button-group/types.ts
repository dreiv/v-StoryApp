import type { InjectionKey, Ref } from 'vue'

export interface ButtonGroupContext {
  name: string
  model: Ref<string | number>
}

export const buttonGroupKey: InjectionKey<ButtonGroupContext> = Symbol('buttonGroup')
