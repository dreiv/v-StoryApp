import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaSwitch from './GaSwitch.vue'

vi.mock('@/core/composables/useFormInput')
vi.mock('@/core/constants')

describe('Switch', () => {
  let wrapper: VueWrapper

  const globalOptions = {
    directives: {
      tooltip: vi.fn(), // Mock for v-tooltip
    },
  }

  beforeEach(() => {
    wrapper = shallowMount(GaSwitch, { global: globalOptions })
  })

  it('should render correctly with default props', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with label prop', () => {
    wrapper = shallowMount(GaSwitch, {
      props: { label: 'Toggle feature' },
      global: globalOptions,
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Toggle feature')
  })

  it('should render correctly with default slot', () => {
    wrapper = shallowMount(GaSwitch, {
      slots: { default: 'Custom Label Content' },
      global: globalOptions,
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Custom Label Content')
  })

  it('should render with an error prop', async () => {
    await wrapper.setProps({ error: true, errorMessage: 'Test Error' })
    const label = wrapper.find('label')

    expect(wrapper.html()).toMatchSnapshot()
    expect(label.classes('mock-error')).toBe(true)
    expect(label.attributes('aria-invalid')).toBe('true')
    expect(label.attributes('aria-errormessage')).toBe('Test Error')
  })

  it('should emit update:modelValue event when switch is clicked', async () => {
    const input = wrapper.find('input')
    await input.setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('should toggle the switch state when clicked multiple times', async () => {
    const input = wrapper.find('input')

    await input.setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])

    await input.setValue(false)
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false])
  })

  it('should be disabled when disabled prop is true', async () => {
    await wrapper.setProps({ disabled: true })
    const input = wrapper.find('input')

    expect(input.element.disabled).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
