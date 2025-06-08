import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaGroupButton from './GaGroupButton.vue'

vi.mock('./types', () => ({ buttonGroupKey: 'buttonGroup' }))

const buttonGroup = { name: 'mockName', model: { value: '' } }
describe('GroupButton', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(GaGroupButton, { global: { provide: { buttonGroup } } })
  })

  it('should render correctly with default props', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with label prop', () => {
    wrapper = shallowMount(GaGroupButton, {
      props: { label: 'Button option' },
      global: { provide: { buttonGroup } },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Button option')
  })

  it('should render correctly with default slot', () => {
    wrapper = shallowMount(GaGroupButton, {
      slots: { default: 'Custom Button Content' },
      global: { provide: { buttonGroup } },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Custom Button Content')
  })

  it('should render with icon style when icon prop is true', async () => {
    await wrapper.setProps({ icon: true })

    const label = wrapper.find('label')
    expect(label.classes()).toContain('icon')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be checked when group modelValue matches button value', () => {
    wrapper = shallowMount(GaGroupButton, {
      attrs: { value: 'option1' },
      global: { provide: { buttonGroup: { name: 'mockName', model: { value: 'option1' } } } },
    })

    const input = wrapper.find('input')
    expect(input.element.checked).toBe(true)
  })

  it('should emit change to update group modelValue when clicked', async () => {
    const mockModel = { value: '' }
    const buttonGroup = { name: 'mockName', model: mockModel }

    wrapper = shallowMount(GaGroupButton, {
      attrs: { value: 'newValue' },
      global: { provide: { buttonGroup } },
    })

    await wrapper.find('input').setValue(true)
    expect(mockModel.value).toBe('newValue')
  })

  it('should be disabled when disabled prop is true', async () => {
    await wrapper.setProps({ disabled: true })

    const input = wrapper.find('input')
    expect(input.element.disabled).toBe(true)
  })

  it('should throw an error when not used inside a GaButtonGroup', () => {
    expect(() => {
      shallowMount(GaGroupButton)
    }).toThrow('GaSegmentButton must be used inside a GaButtonGroup')
  })
})
