import type { Meta, StoryObj } from '@storybook/vue3'
import GaCheckbox, { type CheckboxProps } from '@/core/components/GaCheckbox.vue'

const meta = {
  component: GaCheckbox,
  title: 'Molecules/Checkbox',
  parameters: { layout: 'centered' },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'8px',padding:'1rem'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { default: 'Checkbox' } }
