import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaCard from './GaCard.vue'

describe('GaCard', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(GaCard)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render correctly with default props', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render title when provided', () => {
    wrapper = shallowMount(GaCard, { props: { title: 'Card Title' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.title').text()).toBe('Card Title')
  })

  it('should render description when provided', () => {
    wrapper = shallowMount(GaCard, { props: { description: 'Card description' } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.description').text()).toBe('Card description')
  })

  it('should render checkbox when selectable is true', () => {
    wrapper = shallowMount(GaCard, { props: { selectable: true } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('should apply disabled class when disabled prop is true', async () => {
    wrapper = shallowMount(GaCard, { props: { disabled: true } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.classes()).toContain('disabled')
  })

  it('should render chevron when expandable is true', () => {
    wrapper = shallowMount(GaCard, { props: { expandable: true } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.chevron').exists()).toBe(true)
  })

  it('should apply rotated class to chevron when expanded is true', () => {
    wrapper = shallowMount(GaCard, { props: { expandable: true, expanded: true } })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.rotated').exists()).toBe(true)
  })

  it('should render top slot when provided', () => {
    wrapper = shallowMount(GaCard, {
      slots: {
        topSlot: '<div class="test-top-slot">Top slot</div>',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.test-top-slot').exists()).toBe(true)
  })

  it('should render bottom slot when provided', () => {
    wrapper = shallowMount(GaCard, {
      slots: {
        bottomSlot: '<div class="test-bottom-slot">Bottom slot</div>',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.test-bottom-slot').exists()).toBe(true)
  })

  it('should render bottom slot when expanded is true', () => {
    wrapper = shallowMount(GaCard, {
      props: { expandable: true, expanded: true },
      slots: {
        bottomSlot: '<div class="test-bottom-slot">Bottom slot</div>',
      },
    })
    expect(wrapper.find('.bottomSlot').exists()).toBe(true)
    expect(wrapper.find('.test-bottom-slot').exists()).toBe(true)
  })

  it('should render interactive icon slot when provided', () => {
    wrapper = shallowMount(GaCard, {
      slots: {
        interactiveIcon: '<div class="test-icon">Icon</div>',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.test-icon').exists()).toBe(true)
  })

  it('should emit select event when checkbox is clicked', async () => {
    wrapper = shallowMount(GaCard, { props: { selectable: true } })
    await wrapper.find('input[type="checkbox"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('select')
    expect(wrapper.emitted('select')?.[0]).toEqual([expect.any(Boolean)])
  })

  it('should emit click event when card is clicked', async () => {
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('should not emit click event when disabled', async () => {
    wrapper = shallowMount(GaCard, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('should emit toggle-expand event when chevron is clicked', async () => {
    wrapper = shallowMount(GaCard, { props: { expandable: true } })
    await wrapper.find('.chevron').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('toggle-expand')
    expect(wrapper.emitted('toggle-expand')?.[0]).toEqual([true])
  })

  it('should prevent event propagation when chevron is clicked', async () => {
    wrapper = shallowMount(GaCard, { props: { expandable: true } })
    const stopPropagationSpy = vi.fn()
    await wrapper.find('.chevron').trigger('click', { stopPropagation: stopPropagationSpy })
    expect(stopPropagationSpy).toHaveBeenCalled()
  })
})
