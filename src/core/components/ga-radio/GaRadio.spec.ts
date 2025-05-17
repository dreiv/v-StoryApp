import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaRadio from './GaRadio.vue'

vi.mock('@/core/composables/useFormInput')
vi.mock('./types', () => ({ radioGroupKey: 'radioGroup' }))

const radioGroup = { name: 'mockName', model: { value: '' } }
describe('Radio', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(GaRadio, { global: { provide: { radioGroup } } })
  })

  it('should render correctly with default props', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with label prop', () => {
    wrapper = shallowMount(GaRadio, {
      props: { label: 'Radio option' },
      global: { provide: { radioGroup } },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Radio option')
  })

  it('should render correctly with default slot', () => {
    wrapper = shallowMount(GaRadio, {
      slots: { default: 'Custom Label Content' },
      global: { provide: { radioGroup } },
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

  it('should be checked when group modelValue matches radio value', () => {
    wrapper = shallowMount(GaRadio, {
      attrs: { value: 'option1' },
      global: { provide: { radioGroup: { name: 'mockName', model: { value: 'option1' } } } },
    })

    const input = wrapper.find('input')
    expect(input.element.checked).toBe(true)
  })

  it('should emit change to update group modelValue when clicked', async () => {
    const mockModel = { value: '' }
    const radioGroup = { name: 'mockName', model: mockModel }

    wrapper = shallowMount(GaRadio, {
      attrs: { value: 'newValue' },
      global: { provide: { radioGroup } },
    })

    await wrapper.find('input').setValue(true)
    expect(mockModel.value).toBe('newValue')
  })

  it('should be disabled when disabled prop is set', async () => {
    await wrapper.setProps({ disabled: true })

    const input = wrapper.find('input')
    expect(input.element.disabled).toBe(true)
  })

  it('should throw an error when not used inside a GaRadioGroup', () => {
    expect(() => {
      shallowMount(GaRadio)
    }).toThrow('GaRadio must be used inside a GaRadioGroup')
  })
})
