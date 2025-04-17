import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useFormInput, type FormInputProps } from './useFormInput'

vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    useCssModule: () => ({ input: 'mock-input', error: 'mock-error' }),
  }
})

describe('useFormInput', () => {
  let props: FormInputProps

  beforeEach(() => {
    props = { label: 'Test Label' }
  })

  it('should return base classes without error by default', () => {
    const { classes } = useFormInput(props)

    expect(classes.value).toEqual(['mock-input'])
  })

  it('should add error class when error prop is true', () => {
    props.error = true
    const { classes } = useFormInput(props)

    expect(classes.value).toEqual(['mock-input', 'mock-error'])
  })

  it('should not add error class when error prop is false', () => {
    props.error = false
    const { classes } = useFormInput(props)

    expect(classes.value).toEqual(['mock-input'])
  })

  it('should return appropriate aria attributes when in error state', () => {
    props.error = true
    props.errorMessage = 'Test Error Message'
    const { aria } = useFormInput(props)

    expect(aria.value).toEqual({
      'aria-invalid': true,
      'aria-errormessage': 'Test Error Message',
    })
  })

  it('should return undefined for aria attributes when not in error state', () => {
    props.error = false
    const { aria } = useFormInput(props)

    expect(aria.value).toEqual({
      'aria-invalid': undefined,
      'aria-errormessage': undefined,
    })
  })

  it('should return undefined for aria-errormessage when errorMessage is not provided', () => {
    props.error = true
    const { aria } = useFormInput(props)

    expect(aria.value).toEqual({
      'aria-invalid': true,
      'aria-errormessage': undefined,
    })
  })
})
