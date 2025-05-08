import type { ConcreteComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ChevronDown } from 'lucide-vue-next'

import GaButton from '../ga-button/GaButton.vue'
import GaDropdown from './GaDropdown.vue'
import GaDropdownItem from './GaDropdownItem.vue'

const meta = {
  component: GaDropdown as unknown as ConcreteComponent,
  title: 'Molecules/Dropdown',
  decorators: [
    (story) => ({
      components: { story },
      template: `
      <div
        :style="{
          display:'flex',
          justifyContent:'center',
          gap:'var(--ga-size-spacing-03)',
        }"
      >
        <story />
      </div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaDropdown>

export default meta
type Story = StoryObj<typeof meta>

/**
 *  This component provides a dropdown functionality.
 *
    It is based on the <a href="https://floating-vue.starpad.dev/" target="_blank">floating-vue</a> library,
    which offers advanced positioning and interaction capabilities.

    For detailed configuration options and usage, please refer to the
    <a href="https://floating-vue.starpad.dev/guide/" target="_blank">floating-vue documentation</a>.
 */
export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaButton, GaDropdown, GaDropdownItem, ChevronDown },
    data: () => ({ selected: 6 }),
    template: `
      <div :style="{display:'flex',alignItems:'center',flexDirection:'column',gap:'16px'}">
        <ga-dropdown title='Click me to see options!' v-model='selected'>
          <ga-dropdown-item :value='1' label='Option 1: Basic Item' />
          <ga-dropdown-item :value='2' label='Option 2: Selected Item' />
          <ga-dropdown-item :value='3' label='Option 3: Another Selected Item' key-line />
          <ga-dropdown-item :value='4' label='Option 4: Yet Another Selected Item' />
          <ga-dropdown-item :value='5' label='Option 5: Disabled Item' disabled key-line />
          <ga-dropdown-item :value='6' label='Option 6: A Very Long Disabled and Selected Item for Testing' disabled />
          <ga-dropdown-item :value='7' label='Option 7: Item with Custom Styling' />
          <ga-dropdown-item :value='8' label='Option 8: Special Action Item' />
        </ga-dropdown>
      </div>
    `,
  }),
}
