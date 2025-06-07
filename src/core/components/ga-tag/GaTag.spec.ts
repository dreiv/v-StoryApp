import { mount, shallowMount, type VueWrapper } from '@vue/test-utils'
import GaTag from './GaTag.vue'

const MockIcon = {
  template: '<div class="mock-icon">Icon</div>',
  props: ['size'],
}

describe('GaTag', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(GaTag)
  })

  it('should render correctly with default props', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with label prop', () => {
    wrapper = shallowMount(GaTag, { props: { label: 'Test Tag' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Test Tag')
  })

  it('should render correctly with default slot content', () => {
    wrapper = shallowMount(GaTag, { slots: { default: 'Custom Label' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Custom Label')
  })

  it('should render beforeIcon when prop is provided', () => {
    wrapper = shallowMount(GaTag, { props: { beforeIcon: MockIcon } })
    expect(wrapper.find('.beforeIcon').exists()).toBe(true)
  })

  it('should render custom before-icon slot', () => {
    wrapper = shallowMount(GaTag, {
      slots: { 'before-icon': '<div class="custom-before-icon">Before</div>' },
    })
    expect(wrapper.find('.custom-before-icon').exists()).toBe(true)
  })

  it('should render afterIcon when prop is provided', () => {
    wrapper = shallowMount(GaTag, { props: { afterIcon: MockIcon } })
    expect(wrapper.find('.afterIcon').exists()).toBe(true)
  })

  it('should render custom after-icon slot', () => {
    wrapper = shallowMount(GaTag, {
      slots: { 'after-icon': '<div class="custom-after-icon">After</div>' },
    })
    expect(wrapper.find('.custom-after-icon').exists()).toBe(true)
  })

  it('should apply the default class when no variant props are set', () => {
    expect(wrapper.find('.default').exists()).toBe(true)
  })

  it.each(['information', 'error', 'warning', 'success', 'disabled'])(
    'should apply the %s class when the corresponding prop is set to true',
    async (variant) => {
      await wrapper.setProps({ [variant]: true })

      expect(wrapper.find(`.${variant}`).exists()).toBe(true)
      expect(wrapper.find('.default').exists()).toBe(false)
    },
  )

  it('should apply interactive class when interactive prop is true', async () => {
    await wrapper.setProps({ interactive: true })
    expect(wrapper.find('.interactive').exists()).toBe(true)
  })

  it('should apply selected class when interactive and selected props are true', async () => {
    await wrapper.setProps({ interactive: true, selected: true })

    expect(wrapper.find('.interactive').exists()).toBe(true)
    expect(wrapper.find('.selected').exists()).toBe(true)
  })

  it.each([
    'grey',
    'indigo',
    'teal',
    'lime',
    'purple',
    'pink',
    'rose',
    'yellow',
    'blue',
    'green',
    'orange',
  ])('should apply the utility and %s classes when utility prop is set to true', async (color) => {
    await wrapper.setProps({ utility: color })
    expect(wrapper.find('.utility').exists()).toBe(true)
    expect(wrapper.find(`.${color}`).exists()).toBe(true)
  })

  it('should render separator when separator prop is true', async () => {
    await wrapper.setProps({ separator: true })
    expect(wrapper.find('.separator').exists()).toBe(true)
  })

  it('should not render separator when separator prop is false', () => {
    expect(wrapper.find('.separator').exists()).toBe(false)
  })

  it.each([
    ['disabled', 'error'],
    ['disabled', 'warning'],
    ['disabled', 'success'],
    ['disabled', 'information'],
    ['information', 'error'],
    ['information', 'warning'],
    ['information', 'success'],
    ['error', 'warning'],
    ['error', 'success'],
    ['warning', 'success'],
  ])(
    'should prioritize %s over %s when both are set',
    async (priorityVariant, secondaryVariant) => {
      await wrapper.setProps({
        [priorityVariant]: true,
        [secondaryVariant]: true,
      })
      expect(wrapper.find(`.${priorityVariant}`).exists()).toBe(true)
      expect(wrapper.find(`.${secondaryVariant}`).exists()).toBe(false)
    },
  )

  it('should render as a button when interactive is true', async () => {
    await wrapper.setProps({ interactive: true })
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('should render as a button when afterIcon is provided', async () => {
    await wrapper.setProps({ afterIcon: MockIcon })
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('should render as a span by default', () => {
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  // Event tests
  it('should emit onDelete event when afterIcon is clicked', async () => {
    wrapper = mount(GaTag, { props: { afterIcon: MockIcon } })
    await wrapper.findComponent('.afterIcon').trigger('click')
    expect(wrapper.emitted('onDelete')).toBeTruthy()
    expect(wrapper.emitted('onDelete')?.length).toBe(1)
  })

  it('should emit onDelete event when Delete key is pressed', async () => {
    await wrapper.trigger('keyup', { key: 'Delete' })
    expect(wrapper.emitted('onDelete')).toBeTruthy()
    expect(wrapper.emitted('onDelete')?.length).toBe(1)
  })

  it('should emit onDelete event when Backspace key is pressed', async () => {
    await wrapper.trigger('keyup', { key: 'Backspace' })
    expect(wrapper.emitted('onDelete')).toBeTruthy()
    expect(wrapper.emitted('onDelete')?.length).toBe(1)
  })

  it('should not emit onDelete event when other keys are pressed', async () => {
    await wrapper.trigger('keyup', { key: 'Enter' })
    expect(wrapper.emitted('onDelete')).toBeFalsy()
  })

  it('should not emit onDelete event when disabled', async () => {
    await wrapper.setProps({ disabled: true })
    await wrapper.trigger('keyup', { key: 'Delete' })
    expect(wrapper.emitted('onDelete')).toBeFalsy()
  })

  it('should call blur on Escape key', async () => {
    const blurSpy = vi.spyOn(HTMLElement.prototype, 'blur').mockImplementation(() => {})
    const mountedWrapper = mount(GaTag)

    mountedWrapper.vm.$refs.componentRef = mountedWrapper.element

    await mountedWrapper.trigger('keyup', { key: 'Escape' })
    expect(blurSpy).toHaveBeenCalled()

    blurSpy.mockRestore()
  })
})
