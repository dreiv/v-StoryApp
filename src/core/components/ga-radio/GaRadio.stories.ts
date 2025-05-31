import type { Meta, StoryObj } from '@storybook/vue3'
import { OctagonAlert } from 'lucide-vue-next'

import { type FormInputProps } from '@/core/composables/useFormInput'
import GaFormInfo from '../GaFormInfo.vue'
import GaRadio from './GaRadio.vue'
import GaRadioGroup from './GaRadioGroup.vue'

const meta = {
  component: GaRadio,
  title: 'Molecules/Radio',
  parameters: { layout: 'centered' },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="display: flex; align-items: center; gap: var(--ga-size-spacing-03)"><story /></div>`,
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
          components: { GaRadio, GaRadioGroup, GaFormInfo, OctagonAlert },
          template: `
            <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-03);">
              <ga-radio-group direction="vertical">
                <ga-radio value="option1">I agree to the <a href="#">terms</a> and <a href="#">conditions</a>.</ga-radio>
                <ga-radio value="option2">I disagree with the terms.</ga-radio>
              </ga-radio-group>
              <ga-form-info label="You must agree to the terms to continue.">
                <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)"/></template>
              </ga-form-info>
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

export const Default: Story = stories.Default
export const Checked: Story = stories.Checked
export const Error: Story = stories.Error
export const ErrorChecked: Story = stories.ErrorChecked
export const WithDetail: Story = stories.WithDetail
