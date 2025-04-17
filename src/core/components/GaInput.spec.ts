import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaInput from './GaInput.vue'

describe('GaInput', () => {
  let wrapper: VueWrapper

  it('should render correctly', () => {
    wrapper = shallowMount(GaInput)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render prefix slot content', () => {
    wrapper = shallowMount(GaInput, {
      slots: { prefix: '<span data-test="prefix">prefix</span>' },
    })
    expect(wrapper.find('[data-test="prefix"]').exists()).toBe(true)
  })

  it('should render suffix slot content', () => {
    wrapper = shallowMount(GaInput, {
      slots: { suffix: '<span data-test="suffix">suffix</span>' },
    })
    expect(wrapper.find('[data-test="suffix"]').exists()).toBe(true)
  })

  it.each([
    { propName: 'invalid', className: 'invalid' },
    { propName: 'success', className: 'success' },
  ])('should apply $className class when $propName prop is true', ({ propName, className }) => {
    wrapper = shallowMount(GaInput, { props: { [propName]: true } })
    expect(wrapper.find('div').classes()).toContain(className)
  })

  it('should bind value with v-model', async () => {
    wrapper = shallowMount(GaInput, {
      props: { modelValue: 'initial' },
    })

    const input = wrapper.find('input')
    await input.setValue('updated')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['updated'])
  })
})
