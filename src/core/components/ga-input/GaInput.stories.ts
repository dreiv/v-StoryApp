import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Search } from 'lucide-vue-next'

import GaInput, { type GaInputProps } from './GaInput.vue'

const meta = {
  component: GaInput,
  title: 'Molecules/Input',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display: 'flex',justifyContent: 'center',gap: '8px'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
      description: 'Indicates an error state for the input field.',
    },
    success: {
      control: 'boolean',
      description: 'Indicates a success state for the input field.',
    },
    prefix: {
      control: 'text',
      description: 'Content to display before the input field, typically an icon.',
    },
    suffix: {
      control: 'text',
      description: 'Content to display after the input field, typically an icon or action button.',
    },
  },
} satisfies Meta<typeof GaInput>

export default meta
type Story = StoryObj<typeof meta>

interface InputVariation {
  name: 'Default' | 'Disabled' | 'Error' | 'Success'
  props: GaInputProps & { default?: string }
}

const variations: InputVariation[] = [
  { name: 'Default', props: {} },
  { name: 'Disabled', props: { disabled: true } },
  { name: 'Error', props: { error: true } },
  { name: 'Success', props: { success: true } },
]

const createStory = (variation: InputVariation): Story => ({
  args: variation.props,
  render: (args) => ({
    components: { GaInput },
    template: `
      <ga-input v-bind="args" />
      <ga-input v-bind="args" placeholder="Placeholder" />
    `,
    setup: () => ({ args }),
  }),
})

const stories: { [key: string]: Story } = {}
variations.forEach((variation) => {
  stories[variation.name] = createStory(variation)
})

/**
 *  This component is used to create a text input field.
 */
export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaInput, Search },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
        <ga-input placeholder="Basic input" />

        <ga-input placeholder="With prefix icon">
          <template #prefix>
            <Search size="16" />
          </template>
        </ga-input>

        <ga-input placeholder="With suffix icon">
          <template #suffix>
            <Search size="16" />
          </template>
        </ga-input>

        <ga-input placeholder="With both icons">
          <template #prefix>
            <Search size="16" />
          </template>
          <template #suffix>
            <span style="cursor:pointer">✕</span>
          </template>
        </ga-input>

        <ga-input placeholder="Error state" error />
        <ga-input placeholder="Success state" success />
        <ga-input placeholder="Disabled state" disabled />
      </div>
    `,
  }),
}

export const Default: Story = stories.Default
export const Disabled: Story = stories.Disabled
export const Error: Story = stories.Error
export const Success: Story = stories.Success
