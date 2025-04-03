import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaSpinner from './GaSpinner.vue'

vi.mock('../composables/useFormInput')
vi.stubGlobal('window', { matchMedia: vi.fn(() => ({ matches: false })) })

describe('Spinner', () => {
  let wrapper: VueWrapper
  beforeAll(() => {
    wrapper = shallowMount(GaSpinner, { slots: { default: 'mock content' } })
  })

  afterAll(() => {
    vi.unstubAllGlobals()
  })

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should apply the correct container classes based on direction', async () => {
    expect(wrapper.find('.container').classes()).not.toContain('vertical')

    await wrapper.setProps({ direction: 'vertical' })
    expect(wrapper.find('.container').classes()).toContain('vertical')
  })

  it('should apply the correct size classes', async () => {
    await wrapper.setProps({ size: 'sm' })
    expect(wrapper.find('.icon').classes()).toContain('small')
    expect(wrapper.find('.label').classes()).toContain('small')

    await wrapper.setProps({ size: 'lg' })
    expect(wrapper.find('.icon').classes()).toContain('large')
    expect(wrapper.find('.label').classes()).toContain('large')
  })

  it('should pass aria attributes', async () => {
    await wrapper.setProps({
      label: 'Test Label',
      error: true,
      errorMessage: 'Test Error Message',
    })

    const container = wrapper.find('.container')
    expect(container.attributes('aria-label')).toBe('Test Label')
    expect(container.attributes('aria-invalid')).toBe('true')
    expect(container.attributes('aria-errormessage')).toBe('Test Error Message')
  })
})
