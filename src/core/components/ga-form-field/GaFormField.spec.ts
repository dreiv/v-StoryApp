import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaFormField from './GaFormField.vue'

describe('GaFormField', () => {
  let wrapper: VueWrapper

  it('should render correctly with default props and slot', () => {
    wrapper = shallowMount(GaFormField, {
      slots: { default: '<input type="text" />' },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('should render label via prop', () => {
    wrapper = shallowMount(GaFormField, {
      props: { label: 'Test Label' },
      slots: { default: '<input type="text" />' },
    })
    expect(wrapper.text()).toContain('Test Label')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render label via slot', () => {
    wrapper = shallowMount(GaFormField, {
      slots: {
        default: '<input type="text" />',
        label: '<span class="custom-label">Custom Label</span>',
      },
    })
    expect(wrapper.find('.custom-label').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render info via prop', () => {
    wrapper = shallowMount(GaFormField, {
      props: { info: 'Test Info' },
      slots: { default: '<input type="text" />' },
    })
    expect(wrapper.text()).toContain('Test Info')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render info via slot', () => {
    wrapper = shallowMount(GaFormField, {
      slots: {
        default: '<input type="text" />',
        info: '<span class="custom-info">Custom Info</span>',
      },
    })
    expect(wrapper.find('.custom-info').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render state via prop', () => {
    wrapper = shallowMount(GaFormField, {
      props: { label: 'Test Label', state: 'Optional' },
      slots: { default: '<input type="text" />' },
    })
    expect(wrapper.text()).toContain('Optional')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render state via slot', () => {
    wrapper = shallowMount(GaFormField, {
      props: { label: 'Test Label' },
      slots: {
        default: '<input type="text" />',
        state: '<span class="custom-state">Custom State</span>',
      },
    })
    expect(wrapper.find('.custom-state').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should apply disabled class when disabled prop is true', () => {
    wrapper = shallowMount(GaFormField, {
      props: { disabled: true },
      slots: { default: '<input type="text" />' },
    })
    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
