import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ChevronDown } from 'lucide-vue-next'

import GaAvatarGroup from './GaAvatarGroup.vue'

const meta = {
  component: GaAvatarGroup,
  title: 'Molecules/Avatar Group',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="display: flex; justify-content: center; gap: 8px;"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaAvatarGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaAvatarGroup, ChevronDown },
    template: `
      <ga-avatar />
    `,
  }),
}
