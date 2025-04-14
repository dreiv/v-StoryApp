import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaTooltip from './GaTooltip.vue'

vi.mock('floating-vue', () => ({ Tooltip: 'tooltip' }))

describe('Tooltip', () => {
  let wrapper: VueWrapper
  beforeAll(() => {
    wrapper = shallowMount(GaTooltip, { slots: { default: 'mock content' } })
  })

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
