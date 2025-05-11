import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaRadioGroup from './GaRadioGroup.vue'

vi.mock('./types', () => ({ radioGroupKey: 'radioGroup' }))

describe('RadioGroup', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(GaRadioGroup)
  })

  it('should render correctly with default props', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with title when provided', async () => {
    await wrapper.setProps({ title: 'Test Title' })
    expect(wrapper.text()).toContain('Test Title')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with title slot when provided', () => {
    wrapper = shallowMount(GaRadioGroup, {
      slots: { title: '<div class="custom-title">Custom Title</div>' },
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with horizontal direction when specified', async () => {
    await wrapper.setProps({ direction: 'horizontal' })
    expect(wrapper.find('.horizontal').exists()).toBe(true)
  })
})
