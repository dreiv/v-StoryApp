import type { InjectionKey, Ref } from 'vue'
import type { DropdownItemProps } from './components/GaDropdownItem.vue'

export interface RadioGroupContext {
  name: string
  model: Ref<string>
}

export interface DropdownContext {
  onChange: (value: string | number) => void
  registerChild: (child: Partial<DropdownItemProps>) => void
  unregisterChild: (childToRemove: Partial<DropdownItemProps>) => void
  activeChild?: Ref<string | number>
  model?: Ref<string | number>
}
export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('radioGroup')
export const dropdownKey: InjectionKey<DropdownContext> = Symbol('dropdown')
