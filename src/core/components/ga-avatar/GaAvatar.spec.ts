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

  it('should render an image when image prop is provided', () => {
    const imgSrc = 'https://example.com/avatar.jpg'
    wrapper = shallowMount(GaAvatar, { props: { image: imgSrc } })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(imgSrc)
  })

  it('should fall back to content when image fails to load', async () => {
    wrapper = shallowMount(GaAvatar, {
      props: {
        image: 'invalid-url.jpg',
        content: 'AV',
      },
    })

    // Trigger image error
    await wrapper.find('img').trigger('error')

    // Should show the fallback content
    expect(wrapper.text()).toBe('AV')
  })

  it('should render status button when statusIcon is provided', () => {
    const TestIcon = { template: '<div>Status</div>' }
    wrapper = shallowMount(GaAvatar, {
      props: {
        content: 'AV',
        statusIcon: 'TestIcon',
      },
      global: {
        components: { TestIcon },
      },
    })

    const statusBtn = wrapper.find('button.status')
    expect(statusBtn.exists()).toBe(true)
  })

  it('should emit statusClick event when status button is clicked', async () => {
    wrapper = shallowMount(GaAvatar, {
      props: {
        content: 'AV',
        statusIcon: 'div',
      },
    })

    const statusBtn = wrapper.find('button.status')
    await statusBtn.trigger('click')
    expect(wrapper.emitted('statusClick')).toBeTruthy()
    expect(wrapper.emitted('statusClick')?.length).toBe(1)
  })

  it('should not propagate click event from status to avatar', async () => {
    wrapper = shallowMount(GaAvatar, {
      props: {
        content: 'AV',
        statusIcon: 'div',
        interactive: true,
      },
    })

    const statusBtn = wrapper.find('button.status')
    await statusBtn.trigger('click')
    expect(wrapper.emitted('statusClick')).toBeTruthy()
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
