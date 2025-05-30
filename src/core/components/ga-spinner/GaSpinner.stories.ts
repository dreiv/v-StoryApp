import type { Meta, StoryObj } from '@storybook/vue3'
import { CircleCheck, OctagonAlert } from 'lucide-vue-next'
import GaSpinner, { type SpinnerProps } from './GaSpinner.vue'

const meta = {
  component: GaSpinner,
  title: 'Molecules/Spinner',
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
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'The size of the spinner.',
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'The direction of the spinner.',
    },
    error: { control: 'boolean', description: 'Indicates an error state for the spinner.' },
    errorMessage: {
      control: 'text',
      description: 'The error message to display when the spinner is in an error state.',
    },
    default: { control: 'text', description: 'The label text for the spinner.' },
  },
} satisfies Meta<typeof GaSpinner>

export default meta
type Story = StoryObj<typeof meta>

interface SpinnerVariation {
  name: 'Default' | 'Small' | 'Large' | 'Label' | 'LabelVertical'
  props: SpinnerProps & { default?: string }
}

const variations: SpinnerVariation[] = [
  { name: 'Default', props: {} },
  { name: 'Small', props: { size: 'sm' } },
  { name: 'Large', props: { size: 'lg' } },
  { name: 'Label', props: { label: 'with Label' } },
  { name: 'LabelVertical', props: { label: 'with Label', direction: 'vertical' } },
]

const createStory = (variation: SpinnerVariation): Story => ({
  args: variation.props,
  render: (args) => ({
    components: { GaSpinner },
    template: `
      <ga-spinner v-bind="args" />
    `,
    setup: () => ({ args }),
  }),
})

const stories: { [key: string]: Story } = {}
variations.forEach((variation) => {
  stories[variation.name] = createStory(variation)
})

/**
 * Signals an ongoing, indeterminate operation, assuring users that a process is underway during loading or processing.
 */
export const Examples: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaSpinner, CircleCheck, OctagonAlert },
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-06);">
        <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-03);">
          <ga-spinner size='sm' label='Fetching dashboard data' />
          <ga-spinner label='File loaded successfully.'>
            <template #icon><circle-check size="16" color="var(--ga-color-icon-success)" /></template>
          </ga-spinner>
          <ga-spinner label='Error while loading file. Please try again.' errorMessage='Error while loading file. Please try again.' error>
            <template #icon><octagon-alert size="16" color="var(--ga-color-error)"/></template>
          </ga-spinner>
        </div>

        <div style="display: flex; gap: var(--ga-size-spacing-03);">
          <ga-spinner size="lg" label="Loading..." direction="vertical" />
          <ga-spinner label="Loading..." direction="vertical" />
          <ga-spinner size="sm" label="Loading..." direction="vertical" />
        </div>

        <div style="display: flex; justify-content: center; padding: 32px; background: var(--ga-color-surface-page);">
          <ga-spinner size="lg" direction="vertical" />
        </div>

        <div style="display: flex; justify-content: center; padding: 32px; background: #6F768791;">
          <ga-spinner size="lg" direction="vertical" />
        </div>
      </div>
    `,
  }),
}

export const Default: Story = stories.Default
export const Small: Story = stories.Small
export const Large: Story = stories.Large
export const Label: Story = stories.Label
export const LabelVertical: Story = stories.LabelVertical
