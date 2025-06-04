import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaButtonGroup from './GaButtonGroup.vue'

vi.mock('./types', () => ({ buttonGroupKey: 'buttonGroupKey' }))

const buttonGroup = { name: 'mockName', model: { value: '' } }
describe('ButtonGroup', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(GaButtonGroup, { global: { provide: { buttonGroup } } })
  })

  it('should render correctly with default props', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render children in the default slot', () => {
    wrapper = shallowMount(GaButtonGroup, {
      slots: { default: '<div class="test-button">Button</div>' },
    })
    expect(wrapper.find('.test-button').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
