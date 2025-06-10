import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ArrowRight, ChevronDown } from 'lucide-vue-next'

import GaButton from '../ga-button/GaButton.vue'
import GaCheckbox from '../ga-checkbox/GaCheckbox.vue'
import GaCard from './GaCard.vue'

const meta = {
  component: GaCard,
  title: 'Molecules/Card',
  parameters: { layout: 'centered' },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="width: 400px; max-width: 100%;">
          <story />
        </div>
      `,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => ({
    components: { GaCard, GaButton, GaCheckbox, ArrowRight, ChevronDown },
    setup: () => ({ args }),
    template: `
      <ga-card v-bind="args" title="Card Title">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

        <template #actions>
          <ga-checkbox />
          <chevron-down />
        </template>

        <template #interactive>
          <ga-button icon ghost><arrow-right /></ga-button>
        </template>
      </ga-card>
    `,
  }),
}
