import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaCheckbox from './GaCheckbox.vue'

describe('Checkbox', () => {
  let wrapper: VueWrapper
  beforeAll(() => {
    wrapper = shallowMount(GaCheckbox, { slots: { default: 'mock content' } })
  })

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with an error prop', async () => {
    await wrapper.setProps({ error: true, errorMessage: 'Test Error' })

    const label = wrapper.find('label')

    expect(wrapper.html()).toMatchSnapshot()
    expect(label.classes('error')).toBe(true)
    expect(label.attributes('aria-invalid')).toBe('true')
    expect(label.attributes('aria-errormessage')).toBe('Test Error')
  })

  it('should render with indeterminate prop', async () => {
    await wrapper.setProps({ indeterminate: true })

    const input = wrapper.find('input')

    expect(input.element.indeterminate).toBe(true)
    expect(wrapper.find('.indeterminate').isVisible()).toBe(true)
  })

  it('should render with checked state when modelValue prop is true', async () => {
    await wrapper.setProps({ modelValue: true })

    const input = wrapper.find('input')

    expect(wrapper.find('.checked').isVisible()).toBe(true)
  })
})
