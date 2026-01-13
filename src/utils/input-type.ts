export type TInput<T = unknown> = {
  modelValue: T
  nome?: string
  obrigatorio?: boolean
  mask?: string
  valores?: TListOption[]
  maxLength?: number
  options?: any
}

export type TListOption = {
  description: string
  value: string | number | boolean
}
