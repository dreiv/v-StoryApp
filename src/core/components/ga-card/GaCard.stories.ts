import type { Meta, StoryObj } from '@storybook/vue3-vite'
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
    components: { GaCard },
    setup: () => ({ args }),
    template: `
      <ga-card v-bind="args" title="Card Title">
        card content
      </ga-card>
    `,
  }),
}
