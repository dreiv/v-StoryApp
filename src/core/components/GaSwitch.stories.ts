import type { Meta, StoryObj } from '@storybook/vue3'

import GaSwitch from './GaSwitch.vue'

const meta = {
  component: GaSwitch,
  title: 'Molecules/Switch',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'8px',padding:'1rem'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }
export const Error: Story = { args: { error: true } }
