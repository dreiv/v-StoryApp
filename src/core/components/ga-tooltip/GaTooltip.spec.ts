import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaTooltip from './GaTooltip.vue'

vi.mock('floating-vue', () => ({ Tooltip: 'tooltip' }))

describe('Tooltip', () => {
  let wrapper: VueWrapper

  it('should render correctly with default slot', () => {
    wrapper = shallowMount(GaTooltip, {
      slots: { default: 'trigger content' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with content prop', () => {
    wrapper = shallowMount(GaTooltip, {
      props: { content: 'tooltip content' },
      slots: { default: 'trigger content' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with header, content, and footer slots', () => {
    wrapper = shallowMount(GaTooltip, {
      slots: {
        default: 'trigger content',
        header: 'header content',
        content: 'tooltip content',
        footer: 'footer content',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
