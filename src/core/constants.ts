import type { InjectionKey, Ref } from 'vue'
import type { DropdownItemProps } from './components/ga-dropdown/GaDropdownItem.vue'

export interface RadioGroupContext {
  name: string
  model: Ref<string>
}

export interface DropdownContext {
  onChange: (value: string | number) => void
  registerChild: (child: Partial<DropdownItemProps>) => void
  unregisterChild: (childToRemove: Partial<DropdownItemProps>) => void
  focusedValue?: Ref<string | number | undefined>
  model?: Ref<string | number>
}
export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('radioGroup')
export const dropdownKey: InjectionKey<DropdownContext> = Symbol('dropdown')
