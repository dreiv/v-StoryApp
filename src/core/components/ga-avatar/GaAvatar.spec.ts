import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaAvatar from './GaAvatar.vue'

describe('GaAvatar', () => {
  let wrapper: VueWrapper

  it('should render correctly', () => {
    wrapper = shallowMount(GaAvatar)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('should render with content', () => {
    wrapper = shallowMount(GaAvatar, { props: { content: 'AV' } })
    expect(wrapper.text()).toBe('AV')
  })

  it('should apply size classes when size prop is provided', async () => {
    wrapper = shallowMount(GaAvatar)
    expect(wrapper.classes()).toContain('medium')

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.classes()).toContain('small')

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.classes()).toContain('large')
  })

  it('should render as a button when interactive prop is true', async () => {
    wrapper = shallowMount(GaAvatar, { props: { interactive: true } })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.classes()).toContain('interactive')
  })
})
