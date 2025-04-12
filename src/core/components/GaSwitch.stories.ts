import type { Meta, StoryObj } from '@storybook/vue3'
import { CircleCheck, OctagonAlert, TriangleAlert } from 'lucide-vue-next'

import { type AriaProps } from '../composables/useAria'
import GaFormDetail from './GaFormDetail.vue'
import GaFormField from './GaFormField.vue'
import GaSwitch from './GaSwitch.vue'

const meta = {
  component: GaSwitch,
  title: 'Molecules/Switch',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'var(--ga-size-spacing-03)',padding:'var(--ga-size-spacing-05)'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean', description: 'The checked state of the switch input.' },
    error: { control: 'boolean', description: 'Indicates an error state for the switch input.' },
    errorMessage: {
      control: 'text',
      description: 'The error message to display when the switch input is in an error state.',
    },
  },
} satisfies Meta<typeof GaSwitch>

export default meta
type Story = StoryObj<typeof meta>

interface SwitchVariation {
  name: 'Default' | 'Checked' | 'Error' | 'ErrorChecked'
  props: AriaProps & { default?: string; modelValue?: boolean }
}

const variations: SwitchVariation[] = [
  { name: 'Default', props: {} },
  { name: 'Checked', props: { modelValue: true } },
  { name: 'Error', props: { error: true, errorMessage: 'Something happened' } },
  {
    name: 'ErrorChecked',
    props: { error: true, errorMessage: 'Something happened', modelValue: true },
  },
]

const createStory = (variation: SwitchVariation): Story => ({
  args: variation.props,
  render: (args) => ({
    components: { GaSwitch, GaFormField },
    template: `
      <ga-form-field>
        <ga-switch v-bind="args" />
      </ga-form-field>
      <ga-form-field>
        <ga-switch v-bind="args" disabled />
      </ga-form-field>
      <ga-form-field :label="args.default || 'Switch Label'">
        <ga-switch v-bind="args" />
      </ga-form-field>
    `,
    setup: () => ({ args }),
  }),
})

const stories: { [key: string]: Story } = {}
variations.forEach((variation) => {
  stories[variation.name] = createStory(variation)
})

/**
 * A Switch component toggles a single option on or off, ideal for binary settings. It provides immediate, visible feedback and is touch-friendly, enhancing clear and efficient user experiences.
 */
export const Examples: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaSwitch, GaFormDetail, GaFormField, CircleCheck, OctagonAlert, TriangleAlert },
    template: `
      <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-06)'}">
        <ga-form-field>
          <ga-switch disabled />

          <template #label>
            Set invoice date automatically.<br />
            <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">Hint is an accessible way to provide additional information that might help the user.</span>
          </template>
        </ga-form-field>

        <ga-form-field>
          <ga-switch disabled :modelValue='true' />
          <template #label>
            Set invoice date automatically.<br />
            <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">Hint is an accessible way to provide additional information that might help the user.</span>
          </template>
        </ga-form-field>

        <ga-form-field>
          <ga-switch />
          <template #label>
            Set invoice date automatically.<br />
            <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">Hint is an accessible way to provide <strong>additional information</strong> that might help the user.</span>
          </template>
        </ga-form-field>

        <ga-form-field label="Set invoice date automatically">
          <ga-switch :modelValue='true' v-tooltip="'Automatic date'" />
        </ga-form-field>

        <ga-form-field>
          <ga-switch :modelValue='true' />
          <template #label>
            Daily invoice reminders<br />
            <ga-form-detail label='Invoice reminders will be sent daily at 9:00 am.'>
              <template #icon><circle-check color="#448548" /></template>
            </ga-form-detail>
          </template>
        </ga-form-field>

        <ga-form-field>
          <ga-switch :modelValue='true' />
          <template #label>
            Dark mode<br />
            <ga-form-detail label='Due to your access rights only partial dark mode is enabled for your account.'>
              <template #icon><triangle-alert color="var(--ga-color-warning)" /></template>
            </ga-form-detail>
          </template>
        </ga-form-field>

        <ga-form-field>
          <ga-switch :modelValue='true' />
          <template #label>
            Show admin view<br />
            <ga-form-detail>
              <template #icon><triangle-alert color="var(--ga-color-warning)" /></template>
              <span>We detected maintenance mode for one of your modules and this view might be incomplete. <a href='#'>View module status</a></span>
            </ga-form-detail>
          </template>
        </ga-form-field>

        <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-03)'}">
          <h3 :style="{textDecoration:'underline wavy'}">Weekly reminders</h3>
          <ga-form-field label="On">
            <ga-switch :modelValue='true' />
          </ga-form-field>
        </div>

        <ga-form-field>
          <ga-switch :modelValue='true' error />
          <template #label>
            Fraud detection<br />
            <ga-form-detail label='There are no documents available to check as this is a demo account.'>
              <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)" /></template>
            </ga-form-detail>
          </template>
        </ga-form-field>

        <ga-form-field>
          <ga-switch error />
          <template #label>
            Show admin view<br />
            <ga-form-detail label='Admin view failed to initialize. Try again later.'>
              <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)" /></template>
            </ga-form-detail>
          </template>
        </ga-form-field>
      </div>
    `,
  }),
}

export const Default = stories.Default
export const Checked = stories.Checked
export const Error = stories.Error
export const ErrorChecked = stories.ErrorChecked
