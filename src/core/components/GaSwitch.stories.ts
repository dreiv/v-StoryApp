import type { Meta, StoryObj } from '@storybook/vue3'

import GaSwitch, { type SwitchProps } from './GaSwitch.vue'

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
      description: 'The error message to display when the switch input is in error state.',
    },
    default: { control: 'text', description: 'The label text for the switch input.' },
  },
} satisfies Meta<typeof GaSwitch>

export default meta
type Story = StoryObj<typeof meta>

interface SwitchVariation {
  name: 'Default' | 'Checked' | 'Error' | 'ErrorChecked'
  props: SwitchProps & { default?: string; modelValue?: boolean; disabled?: boolean }
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

export const Examples: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaSwitch },
    template: `
      <div :style="{display:'flex',flexDirection:'column',gap:'24px'}">
        <ga-switch v-bind="args" disabled>
          Set invoice date automatically.<br />
          <span :style="{fontSize:'11px'}">Hint is an accessible way to provide additional information that might help the user.</span>
        </ga-switch>

        <ga-switch v-bind="args" disabled checked>
          Set invoice date automatically.<br />
          <span :style="{fontSize:'11px'}">Hint is an accessible way to provide additional information that might help the user.</span>
        </ga-switch>

        <ga-switch v-bind="args">
          Set invoice date automatically.<br />
          <span :style="{fontSize:'11px'}">Hint is an accessible way to provide <strong>additional information</strong> that might help the user.</span>
        </ga-switch>
      </div>
    `,
  }),
}

export const Default = stories.Default
export const Checked = stories.Checked
export const Error = stories.Error
export const ErrorChecked = stories.ErrorChecked
