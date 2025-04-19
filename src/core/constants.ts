import type { InjectionKey, Ref } from 'vue'

export interface RadioGroupContext {
  name: string
  model: Ref<string>
}

export interface DropdownContext {
  onChange: (value: string | number) => void
  registerChild: (child: HTMLElement) => void
  unregisterChild: (childToRemove: HTMLElement) => void
  model?: Ref<string | number>
}
export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('radioGroup')
export const dropdownKey: InjectionKey<DropdownContext> = Symbol('dropdown')
