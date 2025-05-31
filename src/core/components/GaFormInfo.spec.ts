import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaFormInfo from './GaFormInfo.vue'

describe('GaFormInfo', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(GaFormInfo)
  })

  it('should render correctly with default props', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with label prop', () => {
    wrapper = shallowMount(GaFormInfo, { props: { label: 'Test Label' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Test Label')
  })

  it('should render correctly with default slot', () => {
    wrapper = shallowMount(GaFormInfo, { slots: { default: 'Default Slot Content' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Default Slot Content')
  })

  it('should render correctly with icon slot', () => {
    wrapper = shallowMount(GaFormInfo, { slots: { icon: '<svg></svg>' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
