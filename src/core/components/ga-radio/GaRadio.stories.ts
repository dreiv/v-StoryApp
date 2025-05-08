import type { Meta, StoryObj } from '@storybook/vue3'
import { OctagonAlert, TriangleAlert } from 'lucide-vue-next'

import { type FormInputProps } from '@/core/composables/useFormInput'
import GaFormDetail from '../GaFormDetail.vue'
import GaRadio from './GaRadio.vue'
import GaRadioGroup from './GaRadioGroup.vue'

const meta = {
  component: GaRadio,
  title: 'Molecules/Radio',
  parameters: { layout: 'centered' },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div
          :style="{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'var(--ga-size-spacing-03)',
            padding: 'var(--ga-size-spacing-05)'
          }"
        >
          <story />
        </div>`,
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean', description: 'The checked state of the radio input.' },
    label: { control: 'text', description: 'The label text for the radio input.' },
    error: { control: 'boolean', description: 'Indicates an error state for the radio input.' },
    errorMessage: {
      control: 'text',
      description: 'The error message to display when the radio input is in an error state.',
    },
    default: {
      control: 'text',
      description: 'The label text for the radio input. Overrides label prop.',
    },
  },
} as Meta<typeof GaRadio>

export default meta
type Story = StoryObj<typeof meta>

interface RadioVariation {
  name: 'Default' | 'Checked' | 'Error' | 'ErrorChecked' | 'WithDetail'
  props: FormInputProps & { default?: string }
  customRender?: boolean
}

const variations: RadioVariation[] = [
  { name: 'Default', props: {} },
  { name: 'Checked', props: {} },
  { name: 'Error', props: { error: true, errorMessage: 'Something happened' } },
  { name: 'ErrorChecked', props: { error: true, errorMessage: 'Something happened' } },
  { name: 'WithDetail', props: {}, customRender: true },
]

const createStory = (variation: RadioVariation): Story => {
  if (variation.customRender) {
    if (variation.name === 'WithDetail') {
      return {
        args: {},
        render: (args) => ({
          components: { GaRadio, GaRadioGroup, GaFormDetail, OctagonAlert },
          template: `
            <div :style="{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ga-size-spacing-03)'
            }">
              <ga-radio-group direction="vertical">
                <ga-radio value="option1">I agree to the <a href="#">terms</a> and <a href="#">conditions</a>.</ga-radio>
                <ga-radio value="option2">I disagree with the terms.</ga-radio>
              </ga-radio-group>
              <ga-form-detail>
                <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)"/></template>
                You must agree to the terms to continue.
              </ga-form-detail>
            </div>
          `,
          setup: () => ({ args }),
        }),
      }
    }
  }

  const defaultValue =
    variation.name === 'Checked' || variation.name === 'ErrorChecked' ? 'option1' : 'option2'

  return {
    args: variation.props,
    render: (args) => ({
      components: { GaRadio, GaRadioGroup },
      template: `
        <ga-radio-group :modelValue="'${defaultValue}'" direction="horizontal">
          <ga-radio v-bind="args" value="option1">Option 1</ga-radio>
          <ga-radio v-bind="args" value="option2">Option 2</ga-radio>
          <ga-radio v-bind="args" value="option3" disabled>Option 3 (disabled)</ga-radio>
        </ga-radio-group>
      `,
      setup: () => ({ args }),
    }),
  }
}

const stories: { [key: string]: Story } = {}
variations.forEach((variation) => {
  stories[variation.name] = createStory(variation)
})

/**
 * Allows users to select a single option from multiple choices, typically used in forms for mutually exclusive selections.
 */
export const Examples: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaRadio, GaRadioGroup, GaFormDetail, OctagonAlert, TriangleAlert },
    template: `
    <div :style="{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ga-size-spacing-06)'
    }">
      <div :style="{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ga-size-spacing-03)'
      }">
        <h3>Color preference</h3>
        <ga-radio-group modelValue="blue" direction="vertical">
          <ga-radio value="blue">Blue</ga-radio>
          <ga-radio value="red">Red</ga-radio>
          <ga-radio value="green">Green</ga-radio>
        </ga-radio-group>
      </div>

      <div :style="{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ga-size-spacing-03)'
      }">
        <h3>Payment method</h3>
        <ga-radio-group modelValue="cc" direction="vertical">
          <ga-radio value="cc">Credit Card</ga-radio>
          <ga-radio value="pp">PayPal</ga-radio>
          <ga-radio value="bt" disabled>Bank Transfer (unavailable)</ga-radio>
        </ga-radio-group>
      </div>

      <div :style="{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ga-size-spacing-03)'
      }">
        <h3>Notification preference</h3>
        <ga-radio-group direction="vertical">
          <ga-radio value="all">All notifications</ga-radio>
          <ga-radio value="important">Important only</ga-radio>
          <ga-radio value="none">None</ga-radio>
        </ga-radio-group>
        <ga-form-detail label="Choose how you want to be notified about changes." />
      </div>

      <div :style="{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ga-size-spacing-02)'
      }">
        <h3>Priority (Error state)</h3>
        <ga-radio-group direction="horizontal">
          <ga-radio value="low" error>Low</ga-radio>
          <ga-radio value="medium" error>Medium</ga-radio>
          <ga-radio value="high" error>High</ga-radio>
        </ga-radio-group>
        <ga-form-detail label="You must select a priority level.">
          <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)" /></template>
        </ga-form-detail>
      </div>

      <div :style="{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ga-size-spacing-02)'
      }">
        <h3>Delivery options</h3>
        <ga-radio-group modelValue="standard" direction="vertical">
          <ga-radio value="express">Express delivery (2-3 days)</ga-radio>
          <ga-radio value="standard">Standard delivery (5-7 days)</ga-radio>
          <ga-radio value="economy">Economy delivery (7-14 days)</ga-radio>
        </ga-radio-group>
        <ga-form-detail label="Express delivery is not available for your location.">
          <template #icon><triangle-alert strokeWidth="2.5" color="var(--ga-color-warning)" /></template>
        </ga-form-detail>
      </div>
    </div>
    `,
  }),
}

export const Default: Story = stories.Default
export const Checked: Story = stories.Checked
export const Error: Story = stories.Error
export const ErrorChecked: Story = stories.ErrorChecked
export const WithDetail: Story = stories.WithDetail
