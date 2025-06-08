import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { GlobeLock, OctagonAlert, TriangleAlert } from 'lucide-vue-next'

import { type FormInputProps } from '@/core/composables/useFormInput'
import GaFormField from '../ga-form-field/GaFormField.vue'
import GaFormInfo from '../GaFormInfo.vue'
import GaFormNest from '../GaFormNest.vue'
import GaCheckbox from './GaCheckbox.vue'

const meta = {
  component: GaCheckbox,
  title: 'Molecules/Checkbox',
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
    modelValue: { control: 'boolean', description: 'The checked state of the checkbox.' },
    label: { control: 'text', description: 'The label text for the checkbox.' },
    error: { control: 'boolean', description: 'Indicates an error state for the checkbox.' },
    errorMessage: {
      control: 'text',
      description: 'The error message to display when the checkbox is in an error state.',
    },
    default: {
      control: 'text',
      description: 'The label text for the checkbox. Overrides label prop.',
    },
  },
} satisfies Meta<typeof GaCheckbox>

export default meta
type Story = StoryObj<typeof meta>

interface CheckboxVariation {
  name:
    | 'Default'
    | 'Checked'
    | 'Indeterminate'
    | 'Error'
    | 'ErrorChecked'
    | 'ErrorIndeterminate'
    | 'WithDetail'
    | 'WithNestedItems'
  props: FormInputProps & { default?: string; modelValue?: boolean }
  customRender?: boolean
}

const variations: CheckboxVariation[] = [
  { name: 'Default', props: {} },
  { name: 'Checked', props: { modelValue: true } },
  { name: 'Indeterminate', props: { indeterminate: true } },
  { name: 'Error', props: { error: true, errorMessage: 'Something happened' } },
  {
    name: 'ErrorChecked',
    props: { error: true, errorMessage: 'Something happened', modelValue: true },
  },
  {
    name: 'ErrorIndeterminate',
    props: { error: true, errorMessage: 'Something happened', indeterminate: true },
  },
  { name: 'WithDetail', props: {}, customRender: true },
  { name: 'WithNestedItems', props: {}, customRender: true },
]

const createStory = (variation: CheckboxVariation): Story => {
  if (variation.customRender) {
    if (variation.name === 'WithDetail') {
      return {
        args: {},
        render: (args) => ({
          components: { GaCheckbox, GaFormInfo, OctagonAlert },
          template: `
            <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-03);">
              <ga-checkbox v-bind="args">I agree to the <a href="#">terms</a> and <a href="#">conditions</a>.</ga-checkbox>
              <ga-form-info label="Error message goes here and is present in two lines in this case<br>but it can be short an concise and show in one line.">
                <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)"/></template>
              </ga-form-info>
            </div>
          `,
          setup: () => ({ args }),
        }),
      }
    } else if (variation.name === 'WithNestedItems') {
      return {
        args: {},
        parameters: { controls: { disable: true } },
        render: () => ({
          components: { GaCheckbox, GaFormNest },
          template: `
            <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-03);">
              <ga-form-nest>
                <ga-checkbox indeterminate label='Check in all team members' />

                <template #nested>
                  <ga-checkbox label='Managers' />
                  <ga-checkbox :modelValue="true" label='Developers' />
                  <ga-checkbox label='QA' />
                  <ga-checkbox label='Designers' />
                </template>
              </ga-form-nest>
            </div>
          `,
        }),
      }
    }
  }

  return {
    args: variation.props,
    render: (args) => ({
      components: { GaCheckbox },
      template: `
        <ga-checkbox v-bind="args" />
        <ga-checkbox v-bind="args" disabled />
        <ga-checkbox v-bind="args">
          {{ args.default || 'With Label' }}
        </ga-checkbox>
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
 * Enable users to select multiple independent options or toggle a single option on/off, with an optional indeterminate state.
 */
export const Examples: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => ({
    components: {
      GaCheckbox,
      GaFormField,
      GaFormInfo,
      GaFormNest,
      GlobeLock,
      OctagonAlert,
      TriangleAlert,
    },
    template: `
    <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-06);">
      <ga-checkbox>I agree to the <a href="#">terms</a> and <a href="#">conditions</a>.</ga-checkbox>

      <ga-checkbox :modelValue="true">This checkbox label<br/>wraps on two lines</ga-checkbox>

      <ga-form-field>
        <ga-checkbox error state="(error)">I agree to the <a href="#">terms</a> and <a href="#">conditions</a>.</ga-checkbox>
        <template #info>
          <ga-form-info>
            <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)"/></template>
            Error message goes here and is present in two lines in this case<br>but it can be short an concise and show in one line.
          </ga-form-info>
        </template>
      </ga-form-field>

      <ga-form-field>
        <ga-checkbox label='The checkbox component offers a clear depiction of a binary choice,enabling users to select from several options or toggle a single option on or off.' />
         <template #info>
          <ga-form-info label='This callout ensures that the check mark is explained in even more detail.'>
            <template #icon> </template>
          </ga-form-info>
        </template>
      </ga-form-field>

      <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-03);">
        <div>
          <h3>Module selection</h3>
          <p style="font-size: var(--ga-text-xs-font-size);">Select the modules you want to include in your project.</p>
        </div>

        <ga-checkbox :modelValue="true" label='Approval' v-tooltip="'Enables approval workflow for documents requiring authorization before processing'" />
        <ga-checkbox label='Expense' v-tooltip="'Manages expense reports and reimbursements'" />
        <ga-form-nest>
          <ga-checkbox disabled indeterminate label='Payroll' v-tooltip="'Manages employee salaries,deductions,and payroll processing'" />
          <template #nested>
            <ga-checkbox :modelValue="true" disabled label='Absence tracking'/>
            <ga-checkbox disabled label='Leave requests' />
          </template>
        </ga-form-nest>
        <ga-checkbox label='Reporting' v-tooltip="'Generates various financial and operational reports'" />
        <ga-checkbox label='Taxation' v-tooltip="'Handles tax calculations and reporting'" />
      </div>

      <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-03);">
        <ga-form-nest>
          <ga-checkbox indeterminate label='Check in all team members' />

          <template #nested>
            <ga-checkbox label='Managers' />
            <ga-checkbox :modelValue="true" label='Developers' />
            <ga-checkbox label='QA' />
            <ga-checkbox label='Designers' />
          </template>
        </ga-form-nest>
      </div>

      <ga-form-field disabled>
        <ga-checkbox disabled :modelValue="true" label='Receive security updates via email' />
        <template #info>
          <ga-form-info label="Only sent when major security flaws detected on your account.">
            <template #icon> </template>
          </ga-form-info>
        </template>
      </ga-form-field>

      <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-03);">
        <h3>Email me</h3>

        <ga-form-nest>
          <ga-checkbox indeterminate label='Daily updates' />

          <template #nested>
            <ga-checkbox label='Messages from my inbox' />
            <ga-checkbox label='New invoices' />
            <ga-checkbox label='Comments' disabled />
          </template>
        </ga-form-nest>

        <ga-form-nest>
          <ga-checkbox label='Weekly updates' />
          <template #nested>
            <ga-checkbox label='Unpaid totals of invoices' />
            <ga-checkbox label='Summary of amounts payed' />
          </template>
        </ga-form-nest>

        <ga-form-info label='All messages are SSL secured.'>
          <template #icon><globe-lock /></template>
        </ga-form-info>
      </div>

      <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-02);">
        <div>
          <h3>Document types (error)</h3>
          <p>Only future documents will be included in this workflow.</p>
        </div>

        <div style="display: flex; gap: var(--ga-size-spacing-03);">
          <ga-checkbox error label='Invoices' />
          <ga-checkbox error label='Credit notes' />
          <ga-checkbox error label='Expense requests' />
        </div>

        <ga-form-info label='You need to select at least one document type.'>
          <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)" /></template>
        </ga-form-info>
      </div>

      <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-02);">
        <div>
          <h3>Document types</h3>
          <p>Only future documents will be included in this workflow.</p>
        </div>

        <div style="display: flex; gap: var(--ga-size-spacing-03);">
          <ga-checkbox label='Invoices' />
          <ga-checkbox :modelValue="true" label='Credit notes' />
          <ga-checkbox label='Expense requests' />
        </div>

        <ga-form-info label='Vodafone ASA did not sent any credit notes so far.'>
          <template #icon><triangle-alert strokeWidth="2.5" color="var(--ga-color-warning)" /></template>
        </ga-form-info>
      </div>
    </div>
    `,
  }),
}

export const Default: Story = stories.Default
export const Checked: Story = stories.Checked
export const Indeterminate: Story = stories.Indeterminate
export const Error: Story = stories.Error
export const ErrorChecked: Story = stories.ErrorChecked
export const ErrorIndeterminate: Story = stories.ErrorIndeterminate
export const WithDetail: Story = stories.WithDetail
export const WithNestedItems: Story = stories.WithNestedItems
