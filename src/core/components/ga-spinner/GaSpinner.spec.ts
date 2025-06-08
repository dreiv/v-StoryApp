import { shallowMount, type VueWrapper } from '@vue/test-utils'

import GaSpinner from './GaSpinner.vue'

vi.mock('lucide-vue-next', () => ({ Hourglass: () => '<div class="mock-hourglass" />' }))
vi.mock('@/core/composables/useFormInput')

describe('Spinner', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    vi.stubGlobal('window', {
      matchMedia: vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
      })),
    })
    wrapper = shallowMount(GaSpinner)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should render correctly with default props', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with label prop', () => {
    wrapper = shallowMount(GaSpinner, { props: { label: 'Loading data' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Loading data')
  })

  it('should render correctly with default slot content', () => {
    wrapper = shallowMount(GaSpinner, { slots: { default: 'Custom loading message' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Custom loading message')
  })

  it('should render correctly with icon slot content', () => {
    wrapper = shallowMount(GaSpinner, {
      slots: {
        icon: '<div class="custom-icon">⚙️</div>',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  it('should apply the correct container classes based on direction', async () => {
    expect(wrapper.find('.container').classes()).not.toContain('vertical')

    await wrapper.setProps({ direction: 'vertical' })
    expect(wrapper.find('.container').classes()).toContain('vertical')
  })

  it.each(['small', 'large'])('should apply the correct size classes for %s size', async (size) => {
    await wrapper.setProps({ size })
    expect(wrapper.find('.icon').classes()).toContain(size)
    expect(wrapper.find('.label').classes()).toContain(size)
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
