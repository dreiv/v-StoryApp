import type { ConcreteComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import GaTabs from './GaTabs.vue'

const meta = {
  component: GaTabs as unknown as ConcreteComponent,
  title: 'Molecules/Tabs',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="display: flex; justify-content: center; gap: 8px;"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTabs },
    template: `
      <ga-tabs />
    `,
  }),
}
