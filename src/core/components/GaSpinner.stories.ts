import type { Meta, StoryObj } from '@storybook/vue3'
import GaSpinner from './GaSpinner.vue'

const meta = {
  component: GaSpinner,
  title: 'Molecules/Spinner',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'8px',padding:'1rem'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = { args: { size: 'sm' } }
export const Default: Story = { args: {} }
export const Large: Story = { args: { size: 'lg' } }
