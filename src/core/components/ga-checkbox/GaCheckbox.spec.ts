import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaCheckbox from './GaCheckbox.vue'

vi.mock('@/core/composables/useFormInput')

describe('Checkbox', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(GaCheckbox)
  })

  it('should render correctly with default props', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with label prop', () => {
    wrapper = shallowMount(GaCheckbox, { props: { label: 'Accept terms' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Accept terms')
  })

  it('should render correctly with default slot', () => {
    wrapper = shallowMount(GaCheckbox, { slots: { default: 'Mock Content' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Mock Content')
  })

  it('should render with state prop when provided', async () => {
    await wrapper.setProps({ label: 'Required Label', state: 'Test State' })
    expect(wrapper.text()).toContain('Test State')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with state slot when provided', () => {
    wrapper = shallowMount(GaCheckbox, {
      props: { label: 'Required Label' },
      slots: { state: '<div class="custom-state">Custom State</div>' },
    })
    expect(wrapper.find('.custom-state').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it.each([
    { state: 'checked', props: { modelValue: true }, className: '.checked' },
    { state: 'indeterminate', props: { indeterminate: true }, className: '.indeterminate' },
  ])(
    'should render in $state state when appropriate props are set',
    async ({ props, className }) => {
      await wrapper.setProps(props)
      expect(wrapper.find(className).exists()).toBe(true)
    },
  )

  it('should emit update:modelValue event when checkbox is clicked', async () => {
    const input = wrapper.find('input')
    await input.setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('should toggle the checkbox state when clicked multiple times', async () => {
    const input = wrapper.find('input')

    await input.setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])

    await input.setValue(false)
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false])
  })

  it('should render with error styling when error prop is true', async () => {
    await wrapper.setProps({ error: true, errorMessage: 'Test Error' })
    const label = wrapper.find('label')

    expect(wrapper.html()).toMatchSnapshot()
    expect(label.classes('mock-error')).toBe(true)
    expect(label.attributes('aria-invalid')).toBe('true')
    expect(label.attributes('aria-errormessage')).toBe('Test Error')
  })

  it('should be disabled when disabled prop is true', async () => {
    await wrapper.setProps({ disabled: true })
    const input = wrapper.find('input')

    expect(input.element.disabled).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
