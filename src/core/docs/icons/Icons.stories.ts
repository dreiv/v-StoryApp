import type { Meta, StoryObj } from '@storybook/vue3'
import IconGrid from './IconGrid.vue'

const meta: Meta<typeof IconGrid> = {
  title: 'Documentation/Icons',
  component: IconGrid,
  tags: ['!dev'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { IconGrid },
    template: '<IconGrid />',
  }),
}
