let counter = 1

export function uniqueId(prefix: string) {
  return `${prefix}-${counter++}`
}
