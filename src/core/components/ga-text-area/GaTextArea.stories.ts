import type { ConcreteComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { GlobeLock } from 'lucide-vue-next'

import GaFormField from '../ga-form-field/GaFormField.vue'
import GaFormInfo from '../GaFormInfo.vue'
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
      <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-06);">
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

export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: {
      GaTextArea,
      GaFormField,
      GaFormInfo,
      GlobeLock,
    },
    setup() {
      const text =
        'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the gram. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the gram.'
      return { text }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; flex: 1">
        <ga-text-area placeholder="Transaction description" />
        <ga-form-field label="Detailed description">
          <ga-text-area :modelValue="text" />

          <template #info>
            <ga-form-info label='This callout ensures that the check mark is explained in even more detail.'>
              <template #icon><globe-lock /></template>
            </ga-form-info>
          </template>
        </ga-form-field>

        <ga-text-area placeholder="With icon" iconLeft="chevron-down" />
        <ga-text-area placeholder="Disabled text area" disabled />
        <ga-text-area placeholder="Error text area" error />
      </div>
    `,
  }),
}

export const Default: Story = stories.Default
export const Disabled: Story = stories.Disabled
export const Error: Story = stories.Error
