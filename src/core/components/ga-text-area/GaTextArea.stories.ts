import { ref, type ConcreteComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { GlobeLock, OctagonAlert, TriangleAlert } from 'lucide-vue-next'

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
      <div style="display: flex; flex: 1; flex-direction: column; gap: var(--ga-size-spacing-06);">
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
      OctagonAlert,
      TriangleAlert,
    },
    setup() {
      const text = ref(
        'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the gram. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators.',
      )

      return { text }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; flex: 1">
        <ga-text-area placeholder="Transaction description" />
        <ga-form-field label="Detailed description" style="position: relative">
          <ga-text-area v-model="text" />

          <span style="position: absolute; right: 0; top: 4px; color: var(--ga-color-text-secondary);">
            {{ text.length }} / 1000
          </span>
          <template #info>
            <ga-form-info label='This callout ensures that the check mark is explained in even more detail.'>
              <template #icon><globe-lock /></template>
            </ga-form-info>
          </template>
        </ga-form-field>

        <ga-form-field label="Share your feedback" style="position: relative">
          <ga-text-area modelValue="This is the start of my sentence providing feedback" />

          <span style="position: absolute; right: 0; top: 4px; color: var(--ga-color-text-secondary);">
            51 / 250
          </span>
        </ga-form-field>

        <ga-form-field label="Share your feedback" style="position: relative">
          <ga-text-area modelValue="This is the start of my sentence providing feedback and will probably use this module in the future. My company loves it and this is good news for me and my colleagues for the first time in a long time." />

          <span style="position: absolute; right: 0; top: 4px; color: var(--ga-color-text-secondary);">
            202 / 250
          </span>
        </ga-form-field>

        <ga-text-area disabled modelValue='Invoice processing paused: Access restricted currently. Contact admin for modifications. Ensure all entries are accurate before submitting for approval and avoid duplication. System access resumes after maintenance.' />

        <ga-form-field label="Workflow description" tooltip="Provide a clear and concise description of the workflow. This helps users understand the process and ensures consistency across tasks." style="position: relative">
          <ga-text-area modelValue="Initiate invoice creation, capture and verify all details, obtain necessary approvals, send to client, track payment status, reconcile transactions, and archive. Ensure compliance and streamline with automation for efficiency." />

          <span style="position: absolute; right: 0; top: 4px; color: var(--ga-color-text-secondary);">
            226 / 250
          </span>
          <template #info>
            <ga-form-info label='This callout ensures that the check mark is explained in even more detail.'>
              <template #icon><triangle-alert color="var(--ga-color-warning)"/></template>
            </ga-form-info>
          </template>
        </ga-form-field>

        <ga-form-field label="Short description" state="(error)" style="position: relative">
          <ga-text-area error v-model="text" />

          <span style="position: absolute; right: 0; top: 4px; color: var(--ga-color-text-secondary);">
            {{ text.length }} / 500
          </span>
          <template #info>
            <ga-form-info>
              <strong>{{ text.length }} / 500</strong> character count exceeded. Please be concise.
              <template #icon><octagon-alert color="var(--ga-color-error)"/></template>
            </ga-form-info>
          </template>
        </ga-form-field>
      </div>
    `,
  }),
}

export const Default: Story = stories.Default
export const Disabled: Story = stories.Disabled
export const Error: Story = stories.Error
