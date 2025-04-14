import type { ConcreteComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ChevronDown } from 'lucide-vue-next'

import GaButton from './GaButton.vue'
import GaMenu from './GaMenu.vue'

const meta = {
  component: GaMenu as unknown as ConcreteComponent,
  title: 'Molecules/Menu',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display: 'flex',justifyContent: 'center',gap: '8px'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaMenu>

export default meta
type Story = StoryObj<typeof meta>

/**
 *  This component provides a menu functionality.
 *
    It is based on the <a href="https://floating-vue.starpad.dev/" target="_blank">floating-vue</a> library,
    which offers advanced positioning and interaction capabilities.

    For detailed configuration options and usage, please refer to the
    <a href="https://floating-vue.starpad.dev/guide/" target="_blank">floating-vue documentation</a>.
 */
export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaMenu, GaButton, ChevronDown },
    template: `
      <div :style="{display:'flex',alignItems:'center',flexDirection:'column',gap:'16px'}">
        <ga-menu>
          <ga-button>Menu <chevron-down /></ga-button>
        </ga-menu>
      </div>
    `,
  }),
}
