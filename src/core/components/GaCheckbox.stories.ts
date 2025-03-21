import type { Meta, StoryObj } from '@storybook/vue3'
import { OctagonAlert } from 'lucide-vue-next'

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

export const Examples: Story = {
  args: {},
  render: () => ({
    components: { GaCheckbox, OctagonAlert },
    template: `
    <div :style="{display:'flex',flexDirection:'column',gap:'24px'}">
      <ga-checkbox>I agree to the <a href="#">terms</a> and <a href="#">conditions</a>.</ga-checkbox>
      <ga-checkbox>This checkbox label<br/>wraps on two lines</ga-checkbox>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <ga-checkbox error>I agree to the <a href="#">terms</a> and <a href="#">conditions</a>. (error)</ga-checkbox>
        <div style="display:flex;gap:4px">
          <octagon-alert size="16" color="#CC453E"/>
          <span style="font-size:12px">
            Error message goes here and is present in two lines in this case<br>but it can be short an concise and show in one line.
          </span>
        </div>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <ga-checkbox>The checkbox component offers a clear depiction of a binary choice, enabling users to select from several options or toggle a single option on or off.</ga-checkbox>
      </div>
    </div>
    `,
  }),
}
