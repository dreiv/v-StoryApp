import type { Meta, StoryObj } from '@storybook/vue3'
import { ChevronDown } from 'lucide-vue-next'

import GaButtonGroup from './GaButtonGroup.vue'
import GaSegmentButton from './GaSegmentButton.vue'
import { ref } from 'vue'

const meta = {
  component: GaButtonGroup,
  title: 'Molecules/Button Group',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="display: flex; justify-content: center; gap: 8px;"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaButtonGroup, GaSegmentButton, ChevronDown },
    setup() {
      const selected = ref('1')
      return { selected }
    },
    template: `
      <ga-button-group v-model="selected">
        <ga-segment-button value="1">Option 1</ga-segment-button>
        <ga-segment-button value="2">Option 2</ga-segment-button>
        <ga-segment-button value="3">Option 3</ga-segment-button>
      </ga-button-group>
    `,
  }),
}
