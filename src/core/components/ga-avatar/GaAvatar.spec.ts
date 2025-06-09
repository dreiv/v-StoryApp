import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaAvatar from './GaAvatar.vue'

describe('GaAvatar', () => {
  let wrapper: VueWrapper

  it('should render correctly with default props', () => {
    wrapper = shallowMount(GaAvatar)
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('Props', () => {
    it('should render with content', () => {
      wrapper = shallowMount(GaAvatar, { props: { content: 'AV' } })
      expect(wrapper.text()).toBe('AV')
    })

    it.each([
      { size: undefined, expectedClass: 'medium' },
      { size: 'small', expectedClass: 'small' },
      { size: 'large', expectedClass: 'large' },
      { size: 'extra-small', expectedClass: 'extra-small' },
    ])('should apply $expectedClass class when size is $size', async ({ size, expectedClass }) => {
      wrapper = shallowMount(GaAvatar, {
        props: { size: size as 'small' | 'medium' | 'large' | 'extra-small' | undefined },
      })
      expect(wrapper.classes()).toContain(expectedClass)
    })

    it('should render as a button when interactive', async () => {
      wrapper = shallowMount(GaAvatar, { props: { interactive: true } })
      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.classes()).toContain('interactive')
    })

    it('should handle disabled prop', async () => {
      wrapper = shallowMount(GaAvatar, { props: { interactive: true, disabled: true } })

      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('should render an image when image prop is provided', () => {
      const imgSrc = 'https://example.com/avatar.jpg'
      wrapper = shallowMount(GaAvatar, { props: { image: imgSrc } })

      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe(imgSrc)
    })

    it('should fall back to content when image errors', async () => {
      wrapper = shallowMount(GaAvatar, {
        props: {
          image: 'invalid-url.jpg',
          content: 'AV',
        },
      })

      await wrapper.find('img').trigger('error')
      expect(wrapper.text()).toBe('AV')
    })
  })

  describe('Slots', () => {
    it('should render default slot content', () => {
      wrapper = shallowMount(GaAvatar, {
        slots: {
          default: 'Custom Content',
        },
      })

      expect(wrapper.text()).toBe('Custom Content')
    })

    it('should render icon slot content', () => {
      wrapper = shallowMount(GaAvatar, {
        slots: {
          icon: '<span class="custom-icon">Icon</span>',
        },
      })

      expect(wrapper.find('.custom-icon').exists()).toBe(true)
    })

    it('should render status slot content', () => {
      wrapper = shallowMount(GaAvatar, {
        slots: {
          status: '<span class="custom-status">Status</span>',
        },
      })

      const statusComponent = wrapper.find('.status')
      expect(statusComponent.exists()).toBe(true)
      expect(statusComponent.find('.custom-status').exists()).toBe(true)
    })
  })

  describe('Status indicator', () => {
    it('should not render status for extra-small size', () => {
      wrapper = shallowMount(GaAvatar, {
        props: {
          size: 'extra-small',
          statusIcon: 'TestIcon',
        },
        slots: {
          status: '<span>Status</span>',
        },
      })

      expect(wrapper.find('.status').exists()).toBe(false)
    })

    it('should render status as button when statusInteractive is true', () => {
      wrapper = shallowMount(GaAvatar, {
        props: {
          statusIcon: 'TestIcon',
          statusInteractive: true,
        },
      })

      const statusEl = wrapper.find('.status')
      expect(statusEl.element.tagName).toBe('BUTTON')
      expect(statusEl.classes()).toContain('statusInteractive')
    })

    it('should render status as div when statusInteractive is false', () => {
      wrapper = shallowMount(GaAvatar, {
        props: {
          statusIcon: 'TestIcon',
          statusInteractive: false,
        },
      })

      const statusEl = wrapper.find('.status')
      expect(statusEl.element.tagName).toBe('DIV')
      expect(statusEl.classes()).not.toContain('statusInteractive')
    })

    it('should emit statusClick event when interactive status is clicked', async () => {
      wrapper = shallowMount(GaAvatar, {
        props: {
          statusIcon: 'TestIcon',
          statusInteractive: true,
        },
      })

      await wrapper.find('.status').trigger('click')
      expect(wrapper.emitted('statusClick')).toBeTruthy()
    })

    it('should not emit statusClick when non-interactive status is clicked', async () => {
      wrapper = shallowMount(GaAvatar, {
        props: {
          statusIcon: 'TestIcon',
          statusInteractive: false,
        },
      })

      await wrapper.find('.status').trigger('click')
      expect(wrapper.emitted('statusClick')).toBeFalsy()
    })
  })
})
