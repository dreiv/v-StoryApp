import { shallowMount, type VueWrapper } from '@vue/test-utils'
import GaTextArea from './GaTextArea.vue'

describe('GaTextArea', () => {
  let wrapper: VueWrapper

  it('should render correctly', () => {
    wrapper = shallowMount(GaTextArea)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should apply $className class when $propName prop is true', () => {
    wrapper = shallowMount(GaTextArea, { props: { error: true } })
    expect(wrapper.find('textarea').classes()).toContain('error')
  })

  it('should bind value with v-model', async () => {
    wrapper = shallowMount(GaTextArea, {
      props: { modelValue: 'initial text' },
    })

    const textarea = wrapper.find('textarea')
    await textarea.setValue('updated text')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['updated text'])
  })

  it('should set disabled attribute when disabled prop is true', async () => {
    wrapper = shallowMount(GaTextArea, {
      props: { disabled: true },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.element.disabled).toBe(true)
  })

  it('should pass attributes to the textarea element', () => {
    wrapper = shallowMount(GaTextArea, {
      attrs: {
        placeholder: 'Enter description',
        maxlength: '100',
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('placeholder')).toBe('Enter description')
    expect(textarea.attributes('maxlength')).toBe('100')
  })
})
