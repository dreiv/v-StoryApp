import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaBadge from './GaBadge.vue'

describe('Badge', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(GaBadge)
  })

  it('should render correctly with default props', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with label prop', () => {
    wrapper = shallowMount(GaBadge, { props: { label: '99+' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('99+')
  })

  it('should render correctly with default slot', () => {
    wrapper = shallowMount(GaBadge, { slots: { default: 'Mock Label' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Mock Label')
  })

  it('should apply the default class when no variant props are set', () => {
    expect(wrapper.find('.default').exists()).toBe(true)
  })

  it.each(['inverted', 'information', 'error', 'warning', 'success', 'muted', 'disabled'])(
    'should apply the %s class when the corresponding prop is set to true',
    async (variant) => {
      await wrapper.setProps({ [variant]: true })
      expect(wrapper.find(`.${variant}`).exists()).toBe(true)
    },
  )

  it('should override default class when a variant prop is set', async () => {
    expect(wrapper.find('.default').exists()).toBe(true)
    await wrapper.setProps({ error: true })
    expect(wrapper.find('.default').exists()).toBe(false)
    expect(wrapper.find('.error').exists()).toBe(true)
  })

  it('should prioritize the first variant prop when multiple are set', async () => {
    await wrapper.setProps({ error: true, warning: true })
    expect(wrapper.find('.error').exists()).toBe(true)
    expect(wrapper.find('.warning').exists()).toBe(false)
  })
})
