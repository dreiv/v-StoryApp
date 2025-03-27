import { defineComponent, inject } from 'vue'
import { mount, VueWrapper } from '@vue/test-utils'
import GaRadioGroup from './GaRadioGroup.vue'

vi.mock('../constants', () => ({ radioGroupKey: 'radioGroup' }))

const MockRadioConsumer = defineComponent({
  template: '<div>{{ injectedName }} - {{ injectedModel }}</div>',
  setup() {
    const group = inject<{ name: string; model: { value: string } }>('radioGroup')

    return {
      injectedName: group?.name,
      injectedModel: group?.model.value,
    }
  },
})

describe('GaRadioGroup', () => {
  let wrapper: VueWrapper
  beforeAll(() => {
    wrapper = mount(GaRadioGroup, { slots: { default: MockRadioConsumer } })
  })

  it('should render correctly', async () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with horizontal direction', async () => {
    await wrapper.setProps({ direction: 'horizontal' })

    expect(wrapper.find('.horizontal')).toBeTruthy()
  })
})
