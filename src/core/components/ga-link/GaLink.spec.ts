import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaLink from './GaLink.vue'

describe('GaLink', () => {
  let wrapper: VueWrapper

  it('should render correctly with default props', () => {
    wrapper = shallowMount(GaLink)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with text prop', () => {
    wrapper = shallowMount(GaLink, { props: { text: 'Test Link' } })

    expect(wrapper.text()).toContain('Test Link')
  })

  it('should render correctly with default slot', () => {
    wrapper = shallowMount(GaLink, { slots: { default: 'Slot Link' } })

    expect(wrapper.text()).toContain('Slot Link')
  })

  it.each(['sm', 'lg'])('should apply the %s class when size prop is %s', async (size) => {
    wrapper = shallowMount(GaLink)
    await wrapper.setProps({ size })

    expect(wrapper.classes()).toContain(size)
  })

  it('should apply the inline class when inline prop is true', async () => {
    wrapper = shallowMount(GaLink)
    await wrapper.setProps({ inline: true })

    expect(wrapper.classes()).toContain('inline')
  })

  it('should apply the disabled class and aria-disabled attribute when disabled prop is true', async () => {
    wrapper = shallowMount(GaLink)
    await wrapper.setProps({ disabled: true })

    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.attributes('href')).toBeUndefined()
  })

  it.each(['prefix', 'suffix'])('should render %s slot', (place) => {
    wrapper = shallowMount(GaLink, {
      slots: { [place]: `<span data-test="${place}">${place}</span>` },
    })
    expect(wrapper.find(`[data-test="${place}"]`).exists()).toBe(true)
    expect(wrapper.text()).toContain(place)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should pass href attribute', () => {
    wrapper = shallowMount(GaLink, { attrs: { href: '#test' } })
    expect(wrapper.attributes('href')).toBe('#test')
  })
})
