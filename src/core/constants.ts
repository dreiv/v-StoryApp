import type { InjectionKey, Ref } from 'vue'

export interface RadioGroupContext {
  name: string
  model: Ref<string>
}

export interface DropdownChildPayload {
  id: string // ID is essential for aria-activedescendant
  value?: string | number
  disabled?: boolean
}

export interface DropdownContext {
  onChange: (value: string | number) => void
  registerChild: (child: DropdownChildPayload) => void
  unregisterChild: (childToRemove: { value?: string | number }) => void
  focusedValue?: Ref<string | number | undefined>
  model?: Ref<string | number | undefined>
}

export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('radioGroup')
export const dropdownKey: InjectionKey<DropdownContext> = Symbol('dropdown')
