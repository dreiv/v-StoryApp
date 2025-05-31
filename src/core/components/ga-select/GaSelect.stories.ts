import type { ConcreteComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ChevronDown } from 'lucide-vue-next'

import GaButton from '../ga-button/GaButton.vue'
import GaSelect from './GaSelect.vue'
import GaSelectCaption from './GaSelectCaption.vue'
import GaSelectItem from './GaSelectItem.vue'

const meta = {
  component: GaSelect as unknown as ConcreteComponent,
  title: 'Molecules/Select',
  decorators: [
    (story) => ({
      components: { story },
      template: `
      <div
        style="display: flex; justify-content: center; gap: var(--ga-size-spacing-03);"
      >
        <story />
      </div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaSelect>

export default meta
type Story = StoryObj<typeof meta>

/**
 *  This component provides a select functionality.
 *
    It is based on the <a href="https://floating-vue.starpad.dev/" target="_blank">floating-vue</a> library,
    which offers advanced positioning and interaction capabilities.

    For detailed configuration options and usage, please refer to the
    <a href="https://floating-vue.starpad.dev/guide/" target="_blank">floating-vue documentation</a>.
 */
export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaButton, GaSelect, GaSelectCaption, GaSelectItem, ChevronDown },
    data: () => ({ selected: { value: 2, label: 'Option 2: Selected Item' } }),
    template: `
      <div style="display: flex; align-items: center; flex-direction: column; gap: 16px;">
        <ga-select label='Click me to see options!' v-model='selected'>
          <ga-select-caption title='Options' />
          <ga-select-item :value='1' label='Option 1: Basic Item' disabled />
          <ga-select-item :value='2' label='Option 2: Selected Item' />
          <ga-select-item :value='3' label='Option 3: Another Selected Item' key-line />
          <ga-select-item :value='4' label='Option 4: Yet Another Selected Item' />
          <ga-select-item :value='5' label='Option 5: Disabled Item' disabled key-line />
          <ga-select-item :value='6' label='Option 6: A Very Long and Selected Item for Testing, Very Long' />
          <ga-select-item :value='7' label='Option 7: Item with Custom Styling' />
          <ga-select-item :value='8' label='Option 8: Special Action Item' />
        </ga-select>
      </div>
    `,
  }),
}
