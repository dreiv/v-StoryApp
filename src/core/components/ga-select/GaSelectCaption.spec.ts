import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaSelectCaption from './GaSelectCaption.vue'

describe('GaSelectCaption', () => {
  let wrapper: VueWrapper

  const createWrapper = (propsData = {}, slots = {}) => {
    return shallowMount(GaSelectCaption, {
      props: propsData,
      slots,
    })
  }

  it('should render correctly with title prop', () => {
    wrapper = createWrapper({ title: 'My Caption Title' })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('My Caption Title')
    expect(wrapper.classes()).toContain('caption')
  })

  it('should render title slot content instead of title prop if provided', () => {
    wrapper = createWrapper(
      { title: 'Prop Title' },
      { title: '<span class="custom-caption-slot">Slot Title</span>' },
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.custom-caption-slot').exists()).toBe(true)
    expect(wrapper.text()).toContain('Slot Title')
    expect(wrapper.text()).not.toContain('Prop Title')
  })

  it('should render with default slot if no title prop or slot is provided', () => {
    wrapper = createWrapper()
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toBe('')
  })
})
