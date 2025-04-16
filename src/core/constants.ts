import type { InjectionKey, Ref } from 'vue'

export interface RadioGroupContext {
  name: string
  model: Ref<string>
}

export interface DropdownContext {
  activeIndex?: Ref<number>
  model?: Ref<string | number>
}
export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('radioGroup')
export const dropdownKey: InjectionKey<DropdownContext> = Symbol('dropdown')
