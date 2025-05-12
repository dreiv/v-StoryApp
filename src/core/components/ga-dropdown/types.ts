import type { InjectionKey, Ref } from 'vue'
import type { DropdownItemProps } from './GaDropdownItem.vue'

type valueType = Pick<DropdownItemProps, 'value'>
export interface DropdownContext {
  focusedItem?: Ref<DropdownItemProps>
  model: Ref<DropdownItemProps | undefined>
  onChange: (value: DropdownItemProps) => void
  registerChild: (child: DropdownItemProps) => void
  unregisterChild: (childToRemove: valueType) => void
}

export const dropdownKey: InjectionKey<DropdownContext> = Symbol('dropdown')
