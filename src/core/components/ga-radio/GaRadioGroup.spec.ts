import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaRadioGroup from './GaRadioGroup.vue'

vi.mock('./types', () => ({ radioGroupKey: 'radioGroup' }))

describe('RadioGroup', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(GaRadioGroup)
  })

  it('should render correctly with default props', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with label when provided', async () => {
    await wrapper.setProps({ label: 'Test Label' })
    expect(wrapper.text()).toContain('Test Label')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with label slot when provided', () => {
    wrapper = shallowMount(GaRadioGroup, {
      slots: { label: '<div class="custom-label">Custom Label</div>' },
    })
    expect(wrapper.find('.custom-label').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with callout when provided', async () => {
    await wrapper.setProps({ callout: 'Test Callout' })
    expect(wrapper.text()).toContain('Test Callout')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with callout slot when provided', () => {
    wrapper = shallowMount(GaRadioGroup, {
      slots: { callout: '<div class="custom-callout">Custom Callout</div>' },
    })
    expect(wrapper.find('.custom-callout').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with state when provided', async () => {
    await wrapper.setProps({ state: 'Test State' })
    expect(wrapper.text()).toContain('Test State')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with state slot when provided', () => {
    wrapper = shallowMount(GaRadioGroup, {
      slots: { state: '<div class="custom-state">Custom State</div>' },
    })
    expect(wrapper.find('.custom-state').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with horizontal direction when specified', async () => {
    await wrapper.setProps({ direction: 'horizontal' })
    expect(wrapper.find('.horizontal').exists()).toBe(true)
  })
})
