import type { Meta, StoryObj } from '@storybook/vue3-vite'
import IconGrid from './IconGrid.vue'

const meta: Meta<typeof IconGrid> = {
  title: 'Atoms/Icons',
  component: IconGrid,
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        component:
          'An interactive grid for exploring the Lucide icon library used in the application. Search for icons by name and click to copy the icon name to your clipboard.',
      },
    },
  },
  argTypes: {
    // No props for this component as it's mainly for documentation purposes
  },
}

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default view shows a searchable grid of all available Lucide icons.
 * Users can filter icons by name and click on any icon to copy its name to the clipboard.
 */
export const Default: Story = {
  render: () => ({
    components: { IconGrid },
    template: '<IconGrid />',
  }),
}
