import type { Meta, StoryObj } from '@storybook/vue3'
import { CircleCheck, OctagonAlert, TriangleAlert } from 'lucide-vue-next'

import { type FormInputProps } from '@/core/composables/useFormInput'
import GaFormField from '../ga-form-field/GaFormField.vue'
import GaFormInfo from '../GaFormInfo.vue'
import GaSwitch from './GaSwitch.vue'

const meta = {
  component: GaSwitch,
  title: 'Molecules/Switch',
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--ga-size-spacing-03); padding: var(--ga-size-spacing-05);" >
          <story />
        </div>`,
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean', description: 'The checked state of the switch input.' },
    label: { control: 'text', description: 'The label text for the switch input.' },
    error: { control: 'boolean', description: 'Indicates an error state for the switch input.' },
    errorMessage: {
      control: 'text',
      description: 'The error message to display when the switch input is in an error state.',
    },
    default: {
      control: 'text',
      description: 'The label text for the switch input. Overrides label prop.',
    },
  },
} satisfies Meta<typeof GaSwitch>

export default meta
type Story = StoryObj<typeof meta>

interface SwitchVariation {
  name: 'Default' | 'Checked' | 'Error' | 'ErrorChecked'
  props: FormInputProps & { default?: string; modelValue?: boolean }
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
    components: { GaSwitch },
    template: `
      <ga-switch v-bind="args" />
      <ga-switch v-bind="args" disabled />
      <ga-switch v-bind="args">{{ args.default || 'With Label' }}</ga-switch>
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
    components: { GaSwitch, GaFormField, GaFormInfo, CircleCheck, OctagonAlert, TriangleAlert },
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-06);">
        <ga-switch disabled>
          Set invoice date automatically.<br />
          <span style="font-size: var(--ga-text-sm-font-size);">Hint is an accessible way to provide additional information that might help the user.</span>
        </ga-switch>

        <ga-switch disabled modelValue='true'>
          Set invoice date automatically.<br />
          <span style="font-size: var(--ga-text-sm-font-size);">Hint is an accessible way to provide additional information that might help the user.</span>
        </ga-switch>

        <ga-switch>
          Set invoice date automatically.<br />
          <span style="font-size: var(--ga-text-sm-font-size);">Hint is an accessible way to provide <strong>additional information</strong> that might help the user.</span>
        </ga-switch>

        <ga-switch label="Set invoice date automatically" modelValue='true' tooltip="Automatic date" />

        <ga-switch modelValue='true'>
          Daily invoice reminders<br />
          <ga-form-info label='Invoice reminders will be sent daily at 9:00 am.'>
            <template #icon><circle-check color="var(--ga-color-success)"/></template>
          </ga-form-info>
        </ga-switch>

        <ga-switch modelValue='true'>
          Dark mode<br />
          <ga-form-info label='Due to your access rights only partial dark mode is enabled for your account.'>
            <template #icon><triangle-alert color="var(--ga-color-warning)"/></template>
          </ga-form-info>
        </ga-switch>

        <ga-switch modelValue='true'>
          Show admin view<br />
          <ga-form-info>
            <template #icon><triangle-alert color="var(--ga-color-warning)"/></template>
            <span>We detected maintenance mode for one of your modules and this view might be incomplete. <a href='#'>View module status</a></span>
          </ga-form-info>
        </ga-switch>

        <ga-form-field label="Weekly reminders" tooltip="Enabling weekly reminders will send a summary of all pending tasks and upcoming deadlines to your registered email address every Monday at 8:00 AM">
          <ga-switch modelValue='true' label="On" />
        </ga-form-field>

        <ga-switch modelValue='true' error>
          Fraud detection<br />
          <ga-form-info label='There are no documents available to check as this is a demo account.'>
            <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)"/></template>
          </ga-form-info>
        </ga-switch>

        <ga-switch error>
          Show admin view<br />
          <ga-form-info label='Admin view failed to initialize. Try again later.'>
            <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)"/></template>
          </ga-form-info>
        </ga-switch>
      </div>
    `,
  }),
}

export const Default = stories.Default
export const Checked = stories.Checked
export const Error = stories.Error
export const ErrorChecked = stories.ErrorChecked
