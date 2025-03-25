import type { InjectionKey } from 'vue'

export const radioGroupKey: InjectionKey<{ name: string }> = Symbol('radioGroup')
