import type { Meta, StoryObj } from '@storybook/vue3'

import GaRadioGroup from './GaRadioGroup.vue'
import GaRadio from './GaRadio.vue'

const meta = {
  component: GaRadioGroup,
  title: 'Molecules/RadioGroup',
  parameters: { layout: 'centered' },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'8px',padding:'1rem'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} as Meta<typeof GaRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  args: {},
  render: () => ({
    components: { GaRadioGroup, GaRadio },
    template: `
      <div :style="{display:'flex',flexWrap:'wrap',gap:'24px'}">
        <ga-radio-group title="Payment frequency">
          <ga-radio value="1" label='Daily' />
          <ga-radio value="2" label='Weekly' />
          <ga-radio value="3" label='Monthly' />
          <ga-radio value="4" label='Annually' />
        </ga-radio-group>

        <ga-radio-group title="Financial goals setting">
          <ga-radio value="1" label='Retirement planning' checked />
          <ga-radio value="2" label='Debt reduction' />
          <ga-radio value="3" label='Company savings' />
        </ga-radio-group>

        <ga-radio-group title="Account alert notifications">
          <ga-radio value="1" label='Push notification' checked />
          <ga-radio value="2" label='Email notification' />
          <ga-radio value="3" label='SMS notification' />
        </ga-radio-group>
      </div>
    `,
  }),
}
