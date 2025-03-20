import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaBadge from './GaBadge.vue'

describe('Badge', () => {
  let wrapper: VueWrapper
  beforeAll(() => {
    wrapper = shallowMount(GaBadge, { slots: { default: 'mock content' } })
  })

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should apply the default class when no props are set', () => {
    expect(wrapper.find('.default').exists()).toBe(true)
  })

  it.each(['inverted', 'information', 'error', 'warning', 'success', 'muted', 'disabled'])(
    'should apply the correct class when the %s prop is set to true',
    async (prop) => {
      await wrapper.setProps({ [prop]: true })
      expect(wrapper.find(`.${prop}`).exists()).toBe(true)
    },
  )
})
