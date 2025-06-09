import { mount, shallowMount, type VueWrapper } from '@vue/test-utils'
import GaAvatarGroup from './GaAvatarGroup.vue'
import GaAvatar from '../ga-avatar/GaAvatar.vue'

describe('GaAvatarGroup', () => {
  let wrapper: VueWrapper

  it('should render correctly with default props', () => {
    wrapper = shallowMount(GaAvatarGroup)
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('Props', () => {
    it('should apply correct CSS variables based on size', () => {
      wrapper = mount(GaAvatarGroup, { props: { size: 'medium' } })
      const style = wrapper.attributes('style')
      expect(style).toContain('--border-thickness: 2px')
    })

    it('should display overflow label when provided', () => {
      wrapper = mount(GaAvatarGroup, {
        props: {
          overflowLabel: '+3',
          size: 'medium',
        },
      })

      // Check if GaAvatar is rendered with the overflow label
      const avatars = wrapper.findAllComponents(GaAvatar)
      expect(avatars.length).toBe(1)
      expect(avatars[0].props('content')).toBe('+3')
    })
  })

  describe('Slot handling', () => {
    it('should render child avatars', () => {
      wrapper = mount(GaAvatarGroup, {
        slots: {
          default: `
            <GaAvatar content="AV" />
            <GaAvatar content="BN" />
          `,
        },
        global: {
          components: {
            GaAvatar,
          },
        },
      })

      const avatars = wrapper.findAllComponents(GaAvatar)
      expect(avatars.length).toBe(2)
    })

    it('should apply size prop to overflow label avatar', () => {
      wrapper = mount(GaAvatarGroup, {
        props: {
          overflowLabel: '+3',
          size: 'small',
        },
      })

      const avatar = wrapper.findComponent(GaAvatar)
      expect(avatar.props('size')).toBe('small')
    })
  })
})
