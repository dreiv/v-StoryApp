import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaRadio from './GaRadio.vue'

vi.mock('../constants', () => ({ radioGroupKey: 'radioGroup' }))

describe('Radio', () => {
  let wrapper: VueWrapper
  beforeAll(() => {
    wrapper = shallowMount(GaRadio, {
      slots: { default: 'mock content' },
      global: { provide: { radioGroup: { name: 'mockName', model: { value: '' } } } },
    })
  })

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with an error prop', async () => {
    await wrapper.setProps({ error: true, errorMessage: 'Test Error' })

    const label = wrapper.find('label')

    expect(wrapper.html()).toMatchSnapshot()
    expect(label.classes('error')).toBe(true)
    expect(label.attributes('aria-invalid')).toBe('true')
    expect(label.attributes('aria-errormessage')).toBe('Test Error')
  })
})
