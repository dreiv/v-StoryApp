import type { InjectionKey, Ref } from 'vue'

export interface ButtonGroupContext {
  model?: Ref<string | number>
}

export const buttonGroupKey: InjectionKey<ButtonGroupContext> = Symbol('buttonGroup')
