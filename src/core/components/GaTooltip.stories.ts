import type { ConcreteComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import GaTooltip from './GaTooltip.vue'

const meta = {
  component: GaTooltip as unknown as ConcreteComponent,
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

export const Examples: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTooltip },
    template: `
      <div :style="{display:'flex',flexDirection:'column',gap:'24px'}">
        <ga-tooltip>
          <button>Hover me!</button>

          <template #popper> Hello world! </template>
        </ga-tooltip>
      </div>
    `,
  }),
}
