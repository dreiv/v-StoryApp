import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaFormNest from './GaFormNest.vue'

describe('GaFormNest', () => {
  let wrapper: VueWrapper

  it('should render correctly with only the default slot', () => {
    wrapper = shallowMount(GaFormNest, { slots: { default: 'Default Slot Content' } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with both default and nested slots', () => {
    wrapper = shallowMount(GaFormNest, {
      slots: {
        default: 'Default Slot Content',
        nested: 'Nested Slot Content',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
