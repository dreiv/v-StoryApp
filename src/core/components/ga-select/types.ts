import type { InjectionKey, Ref } from 'vue'
import type { SelectItemProps } from './GaSelectItem.vue'

type valueType = Pick<SelectItemProps, 'value'>
export interface SelectContext {
  focusedItem?: Ref<SelectItemProps>
  model: Ref<SelectItemProps | undefined>
  onChange: (value: SelectItemProps) => void
  registerChild: (child: SelectItemProps) => void
  unregisterChild: (childToRemove: valueType) => void
}

export const selectKey: InjectionKey<SelectContext> = Symbol('select')
