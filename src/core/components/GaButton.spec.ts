import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaButton from './GaButton.vue'

describe('BaseButton', () => {
  let wrapper: VueWrapper
  beforeAll(() => {
    wrapper = shallowMount(GaButton, { slots: { default: 'mock content' } })
  })

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should apply the default class when no props are set', () => {
    expect(wrapper.find('.default').exists()).toBe(true)
  })

  it.each(['primary', 'transparent', 'icon'])(
    'should apply the correct class when the %s prop is set to true',
    async (prop) => {
      await wrapper.setProps({ [prop]: true })
      expect(wrapper.find(`.${prop}`).exists()).toBe(true)
    },
  )
})
