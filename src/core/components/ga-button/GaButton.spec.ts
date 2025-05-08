import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaButton from './GaButton.vue'

describe('Button', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(GaButton)
  })

  it('should render correctly with default props', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with label prop', () => {
    wrapper = shallowMount(GaButton, { props: { label: 'Submit' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Submit')
  })

  it('should render correctly with default slot', () => {
    wrapper = shallowMount(GaButton, { slots: { default: 'Mock Content' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Mock Content')
  })

  it('should apply the secondary class when no variant props are set', () => {
    expect(wrapper.find('.secondary').exists()).toBe(true)
  })

  it.each(['primary', 'ghost', 'transparent', 'icon'])(
    'should apply the %s class when the corresponding prop is set to true',
    async (variant) => {
      await wrapper.setProps({ [variant]: true })
      expect(wrapper.find(`.${variant}`).exists()).toBe(true)
    },
  )

  it('should override secondary class when a variant prop is set', async () => {
    expect(wrapper.find('.secondary').exists()).toBe(true)
    await wrapper.setProps({ primary: true })
    expect(wrapper.find('.secondary').exists()).toBe(false)
    expect(wrapper.find('.primary').exists()).toBe(true)
  })

  it('should prioritize the first variant prop when multiple are set', async () => {
    await wrapper.setProps({ primary: true, ghost: true })
    expect(wrapper.find('.primary').exists()).toBe(true)
    expect(wrapper.find('.ghost').exists()).toBe(false)
  })

  it('should allow the icon class to be combined with variant classes', async () => {
    await wrapper.setProps({ primary: true, icon: true })
    expect(wrapper.find('.primary').exists()).toBe(true)
    expect(wrapper.find('.icon').exists()).toBe(true)
  })
})
