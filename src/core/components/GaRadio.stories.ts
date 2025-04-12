import type { Meta, StoryObj } from '@storybook/vue3'

import { type AriaProps } from '../composables/useAria'
import GaRadio from './GaRadio.vue'
import GaFormField from './GaFormField.vue'
import GaRadioGroup from './GaRadioGroup.vue'

const meta = {
  component: GaRadio,
  title: 'Molecules/Radio',
  parameters: { layout: 'centered' },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'var(--ga-size-spacing-03)',padding:'var(--ga-size-spacing-05)'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean', description: 'The checked state of the radio input.' },
    error: { control: 'boolean', description: 'Indicates an error state for the radio input.' },
    errorMessage: {
      control: 'text',
      description: 'The error message to display when the radio input is in an error state.',
    },
    default: { control: 'text', description: 'The label text for the radio input.' },
  },
} as Meta<typeof GaRadio>

export default meta
type Story = StoryObj<typeof meta>

interface RadioVariation {
  name: 'Default' | 'Checked' | 'Indeterminate' | 'Error' | 'ErrorChecked' | 'ErrorIndeterminate'
  props: AriaProps & { default?: string }
}

const variations: RadioVariation[] = [
  { name: 'Default', props: { checked: false } },
  { name: 'Checked', props: { checked: true } },
  { name: 'Error', props: { error: true, errorMessage: 'Something happened', checked: false } },
  {
    name: 'ErrorChecked',
    props: { error: true, errorMessage: 'Something happened', checked: true },
  },
]

const createStory = (variation: RadioVariation): Story => ({
  args: variation.props,
  render: (args) => ({
    components: { GaRadio, GaRadioGroup, GaFormField },
    template: `
      <ga-radio-group direction='horizontal'>
        <ga-form-field>
          <ga-radio v-bind="args" />
        </ga-form-field>

        <ga-form-field>
          <ga-radio v-bind="args" disabled />
        </ga-form-field>

        <ga-form-field :label="args.default || 'Radio Label'">
          <ga-radio v-bind="args" />
        </ga-form-field>
      </ga-radio-group>
    `,
    setup: () => ({ args }),
  }),
})

const stories: { [key: string]: Story } = {}
variations.forEach((variation) => {
  stories[variation.name] = createStory(variation)
})

export const Default: Story = stories.Default
export const Checked: Story = stories.Checked
export const Error: Story = stories.Error
export const ErrorChecked: Story = stories.ErrorChecked
