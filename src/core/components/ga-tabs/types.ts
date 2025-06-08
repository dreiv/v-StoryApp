import type { Ref } from 'vue'

export const tabsKey = Symbol('tabs')

export interface TabProps {
  id?: string
  label: string
  disabled?: boolean
  to?: string | object
  icon?: unknown
}

export interface TabsContext {
  model: Ref<string>
  registerTab: (tab: TabProps) => void
  unregisterTab: (id: string) => void
  isOverflowTab: (id: string) => boolean
}
