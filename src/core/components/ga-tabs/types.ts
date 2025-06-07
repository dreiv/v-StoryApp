export const tabsKey = Symbol('tabs')

export interface TabProps {
  id?: string
  label: string
  disabled?: boolean
  to?: string | object
  icon?: unknown
}

export interface TabsContext {
  activeTab: string
  setActiveTab: (id: string) => void
  registerTab: (tab: TabProps) => void
  unregisterTab: (id: string) => void
  isOverflowTab: (id: string) => boolean
}
