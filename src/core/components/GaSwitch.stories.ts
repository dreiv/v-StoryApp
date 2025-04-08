import type { Meta, StoryObj } from '@storybook/vue3'
import { CircleCheck, OctagonAlert, TriangleAlert } from 'lucide-vue-next'

import { type FormInputProps } from '../composables/useFormInput'
import GaSwitch from './GaSwitch.vue'
import GaFormDetail from './GaFormDetail.vue'

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
  argTypes: {
    modelValue: { control: 'boolean', description: 'The checked state of the switch input.' },
    error: { control: 'boolean', description: 'Indicates an error state for the switch input.' },
    errorMessage: {
      control: 'text',
      description: 'The error message to display when the switch input is in an error state.',
    },
    default: { control: 'text', description: 'The label text for the switch input.' },
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
      <ga-switch v-bind="args">
        {{ args.default || 'With Label' }}
      </ga-switch>
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
    components: { GaSwitch, GaFormDetail, CircleCheck, OctagonAlert, TriangleAlert },
    template: `
      <div :style="{display:'flex',flexDirection:'column',gap:'24px'}">
        <ga-switch disabled>
          Set invoice date automatically.<br />
          <span :style="{fontSize:'11px'}">Hint is an accessible way to provide additional information that might help the user.</span>
        </ga-switch>

        <ga-switch disabled modelValue='true'>
          Set invoice date automatically.<br />
          <span :style="{fontSize:'11px'}">Hint is an accessible way to provide additional information that might help the user.</span>
        </ga-switch>

        <ga-switch>
          Set invoice date automatically.<br />
          <span :style="{fontSize:'11px'}">Hint is an accessible way to provide <strong>additional information</strong> that might help the user.</span>
        </ga-switch>

        <ga-switch label="Set invoice date automatically" modelValue='true' v-tooltip="'Automatic date'" />

        <ga-switch modelValue='true'>
          Daily invoice reminders<br />
          <ga-form-detail label='Invoice reminders will be sent daily at 9:00 am.'>
            <template #icon><circle-check color="#448548"/></template>
          </ga-form-detail>
        </ga-switch>

        <ga-switch modelValue='true'>
          Dark mode<br />
          <ga-form-detail label='Due to your access rights only partial dark mode is enabled for your account.'>
            <template #icon><triangle-alert color="#BB5822"/></template>
          </ga-form-detail>
        </ga-switch>

        <ga-switch modelValue='true'>
          Show admin view<br />
          <ga-form-detail>
            <template #icon><triangle-alert color="#BB5822"/></template>
            <span>We detected maintenance mode for one of your modules and this view might be incomplete. <a href='#'>View module status</a></span>
          </ga-form-detail>
        </ga-switch>

        <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
          <h3 :style="{textDecoration:'underline wavy'}">Weekly reminders</h3>
           <ga-switch modelValue='true' label="On">
        </div>

        <ga-switch modelValue='true' error>
          Fraud detection<br />
          <ga-form-detail label='There are no documents available to check as this is a demo account.'>
            <template #icon><octagon-alert strokeWidth="2.5" color="#CC453E"/></template>
          </ga-form-detail>
        </ga-switch>

        <ga-switch error>
          Show admin view<br />
          <ga-form-detail label='Admin view failed to initialize. Try again later.'>
            <template #icon><octagon-alert strokeWidth="2.5" color="#CC453E"/></template>
          </ga-form-detail>
        </ga-switch>
      </div>
    `,
  }),
}

export const Default = stories.Default
export const Checked = stories.Checked
export const Error = stories.Error
export const ErrorChecked = stories.ErrorChecked
