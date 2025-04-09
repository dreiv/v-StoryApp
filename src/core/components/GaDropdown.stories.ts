import type { ConcreteComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import GaDropdown from './GaDropdown.vue'

const meta = {
  component: GaDropdown as unknown as ConcreteComponent,
  title: 'Molecules/Dropdown',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display: 'flex',justifyContent: 'center',gap: '8px'}"><story /></div>`,
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
    components: { GaDropdown },
    template: `
      <div :style="{display:'flex',alignItems:'center',flexDirection:'column',gap:'16px'}">
        <ga-dropdown>
          <button>Dropdown</button>
        </ga-dropdown>
      </div>
    `,
  }),
}
