import type { ConcreteComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ChevronDown } from 'lucide-vue-next'

import GaTextArea, { type GaTextAreaProps } from './GaTextArea.vue'

const meta = {
  component: GaTextArea as unknown as ConcreteComponent,
  title: 'Molecules/TextArea',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="display: flex; justify-content: center; gap: 8px;"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
      description: 'Indicates an error state for the text area.',
    },
  },
} satisfies Meta<typeof GaTextArea>

export default meta
type Story = StoryObj<typeof meta>

interface TextAreaVariation {
  name: 'Default' | 'Disabled' | 'Error'
  props: GaTextAreaProps & { default?: string }
}

const variations: TextAreaVariation[] = [
  { name: 'Default', props: {} },
  { name: 'Disabled', props: { disabled: true } },
  { name: 'Error', props: { error: true } },
]

const createStory = (variation: TextAreaVariation): Story => ({
  args: variation.props,
  render: (args) => ({
    components: { GaTextArea },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; flex: 1">
        <ga-text-area v-bind="args" />
        <ga-text-area v-bind="args" placeholder="Placeholder" />
      </div>
    `,
    setup: () => ({ args }),
  }),
})

const stories: { [key: string]: Story } = {}
variations.forEach((variation) => {
  stories[variation.name] = createStory(variation)
})

export const Default: Story = stories.Default
export const Disabled: Story = stories.Disabled
export const Error: Story = stories.Error
