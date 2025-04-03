import type { Meta, StoryObj } from '@storybook/vue3'
import GaTooltip from './GaTooltip.vue'

const meta = {
  component: GaTooltip,
  title: 'Molecules/Tooltip',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'8px',padding:'1rem'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { default: 'hello' } }
