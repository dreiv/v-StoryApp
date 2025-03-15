import type { Meta, StoryObj } from '@storybook/vue3'
import { Camera } from 'lucide-vue-next'

const meta = {
  component: Camera,
  tags: ['!dev'],
} satisfies Meta<typeof Camera>

export default meta
type Story = StoryObj<typeof meta>

export const Icon: Story = { args: {} }
