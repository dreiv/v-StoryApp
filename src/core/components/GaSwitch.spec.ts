import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaSwitch from './GaSwitch.vue'

vi.mock('../composables/useAria')
vi.mock('../constants')

describe('Switch', () => {
  let wrapper: VueWrapper
  beforeAll(() => {
    wrapper = shallowMount(GaSwitch, {
      slots: { default: 'mock content' },
      global: { provide: { radioGroup: { name: 'mockName', model: { value: '' } } } },
    })
  })

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with an error prop', async () => {
    await wrapper.setProps({ error: true, errorMessage: 'Test Error' })
    const input = wrapper.find('input')

    expect(wrapper.html()).toMatchSnapshot()
    expect(input.classes('mock-error')).toBe(true)
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-errormessage')).toBe('Test Error')
  })
})
