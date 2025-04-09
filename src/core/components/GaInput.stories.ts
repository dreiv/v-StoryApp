import type { Meta, StoryObj } from '@storybook/vue3'

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
} satisfies Meta<typeof GaInput>

export default meta
type Story = StoryObj<typeof meta>

interface InputVariation {
  name: 'Default' | 'Disabled' | 'invalid' | 'Success'
  props: GaInputProps & { default?: string }
}

const variations: InputVariation[] = [
  { name: 'Default', props: {} },
  { name: 'Disabled', props: { disabled: true } },
  { name: 'invalid', props: { invalid: true } },
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
    components: { GaInput },
    template: `
      <div :style="{display:'flex',alignItems:'center',flexDirection:'column',gap:'16px'}">
        <ga-input />
      </div>
    `,
  }),
}

export const Default: Story = stories.Default
export const Disabled: Story = stories.Disabled
export const Invalid: Story = stories.invalid
export const Success: Story = stories.Success
