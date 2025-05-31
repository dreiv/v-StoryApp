import type { ConcreteComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ChevronDown } from 'lucide-vue-next'

import GaButton from '../ga-button/GaButton.vue'
import GaSegmentedControl from './GaSegmentedControl.vue'

const meta = {
  component: GaSegmentedControl as unknown as ConcreteComponent,
  title: 'Molecules/Segmented Control',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="display: flex; justify-content: center; gap: 8px;"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaSegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaSegmentedControl, GaButton, ChevronDown },
    template: `
      <ga-segmented-control>
        <ga-button value="option1" size="sm">Option 1</ga-button>
        <ga-button value="option2" size="sm">Option 2</ga-button>
        <ga-button value="option3" size="sm">Option 3</ga-button>
      </ga-segmented-control>
    `,
  }),
}
