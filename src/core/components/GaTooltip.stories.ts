import type { ConcreteComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { vTooltip as tooltip } from 'floating-vue'
import { CircleHelp, PlusIcon } from 'lucide-vue-next'

import GaButton from './ga-button/GaButton.vue'
import GaInput from './ga-input/GaInput.vue'
import GaTooltip from './GaTooltip.vue'

const meta = {
  component: GaTooltip as unknown as ConcreteComponent,
  title: 'Molecules/Tooltip',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display: 'flex',justifyContent: 'center',gap: '8px'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'The content text for the tooltip. Will be used if no content slot is provided.',
    },
    default: {
      control: 'text',
      description: 'The element that triggers the tooltip on hover.',
    },
    header: {
      control: 'text',
      description: 'Optional header content displayed at the top of the tooltip.',
    },
    footer: {
      control: 'text',
      description:
        'Optional footer content displayed at the bottom of the tooltip, typically used for actions.',
    },
  },
} satisfies Meta<typeof GaTooltip>

export default meta
type Story = StoryObj<typeof meta>

/**
 *  This component provides a tooltip functionality.
 *
    It is based on the <a href="https://floating-vue.starpad.dev/" target="_blank">floating-vue</a> library,
    which offers advanced positioning and interaction capabilities.

    For detailed configuration options and usage, please refer to the
    <a href="https://floating-vue.starpad.dev/guide/" target="_blank">floating-vue documentation</a>.
 */
export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTooltip, GaButton, GaInput, CircleHelp, PlusIcon },
    directives: { tooltip },
    template: `
      <div :style="{display:'flex',alignItems:'center',flexDirection:'column',gap:'16px'}">
        <ga-tooltip>
          <ga-input placeholder="Hover me!" />

          <template #header>International Bank Account Number (IBAN)</template>
          <template #content>
            This number represents an internationally agreed upon system of identifying bank accounts
            across national borders to facilitate the communication and processing of cross border
            transactions with a reduced risk of transcription errors.
          </template>
        </ga-tooltip>

        <ga-button label='Send Invoice' disabled v-tooltip="'This feature is currently disabled for your account.'" />

        <ga-button
          primary
          label='Send Invoice'
          v-tooltip="{ content: 'Submit your invoice for approval.<br/>Others might disagree, but not you!', html: true }"
        />

        <ga-button icon v-tooltip="'Add documents in this workspace'"><plus-icon/></ga-button>

        <ga-tooltip>
          <ga-button label='Auto-Process Emails' />

          <template #header>Automatic email expenses</template>
          <template #content>
            Forward mails containing an invoice or receipt to<br/> Expense to use for your expenses!
          </template>
        </ga-tooltip>

        <ga-tooltip :auto-hide="false" :popper-triggers="['hover','focus']">
          <ga-button label='Auto-Process Emails (actions)' />

          <template #header>Automatic email expenses</template>
          <template #content>
            You can now forward mails containing an invoice or<br/> receipt to Expense to use for your expenses!
            <br/> <br/>
            Set it up in the additional services page.
          </template>

          <template #footer>
            <ga-button label='Additional services' />
            <ga-button icon><circle-help /></ga-button>
          </template>
        </ga-tooltip>
      </div>
    `,
  }),
}
