import type { Meta, StoryObj } from '@storybook/vue3'
import { GlobeLock, OctagonAlert, TriangleAlert } from 'lucide-vue-next'

import GaCheckbox, { type CheckboxProps } from './GaCheckbox.vue'
import GaFormDetail from './GaFormDetail.vue'

const meta = {
  component: GaCheckbox,
  title: 'Molecules/Checkbox',
  parameters: { layout: 'centered' },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'8px',padding:'1rem'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaCheckbox>

export default meta
type Story = StoryObj<typeof meta>

interface CheckboxVariation {
  name: 'Default' | 'Checked' | 'Indeterminate' | 'Error' | 'ErrorChecked' | 'ErrorIndeterminate'
  props: CheckboxProps & { default?: string }
}

const variations: CheckboxVariation[] = [
  { name: 'Default', props: {} },
  { name: 'Checked', props: { checked: true } },
  { name: 'Indeterminate', props: { indeterminate: true } },
  { name: 'Error', props: { error: true } },
  { name: 'ErrorChecked', props: { error: true, checked: true } },
  { name: 'ErrorIndeterminate', props: { error: true, indeterminate: true } },
]

const createCheckboxStory = (variation: CheckboxVariation): Story => ({
  args: {},
  render: () => ({
    components: { GaCheckbox },
    template: `
      <ga-checkbox v-bind="variation.props" />
      <ga-checkbox v-bind="variation.props" disabled />
      <ga-checkbox v-bind="variation.props">With Label</ga-checkbox>
    `,
    data: () => ({ variation }),
  }),
})

const stories: { [key: string]: Story } = {}
variations.forEach((variation) => {
  stories[variation.name] = createCheckboxStory(variation)
})

export const Examples: Story = {
  args: {},
  render: () => ({
    components: { GaCheckbox, GaFormDetail, GlobeLock, OctagonAlert, TriangleAlert },
    template: `
    <div :style="{display:'flex',flexDirection:'column',gap:'24px'}">
      <ga-checkbox>I agree to the <a href="#">terms</a> and <a href="#">conditions</a>.</ga-checkbox>
      <ga-checkbox>This checkbox label<br/>wraps on two lines</ga-checkbox>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <ga-checkbox error>I agree to the <a href="#">terms</a> and <a href="#">conditions</a>. (error)</ga-checkbox>
        <ga-form-detail>
          <template #icon><octagon-alert strokeWidth="2.5" color="#CC453E"/></template>
          Error message goes here and is present in two lines in this case<br>but it can be short an concise and show in one line.
        </ga-form-detail>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <ga-checkbox>The checkbox component offers a clear depiction of a binary choice, enabling users to select from several options or toggle a single option on or off.</ga-checkbox>
        <ga-form-detail>This callout ensures that the checkmark is explained in even more detail.</ga-form-detail>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <div>
          <h3>Module selection</h3>
          <p>Select the modules you want to include in your project.</p>
        </div>
        <ga-checkbox checked>Approval</ga-checkbox>
        <ga-checkbox>Expense</ga-checkbox>
        <ga-checkbox disabled indeterminate>
          Payroll
          <template #children>
            <ga-checkbox checked disabled>Absence tracking</ga-checkbox>
            <ga-checkbox disabled>Leave requests</ga-checkbox>
          </template>
        </ga-checkbox>
        <ga-checkbox>Reporting</ga-checkbox>
        <ga-checkbox>Taxation</ga-checkbox>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <ga-checkbox indeterminate>
          Check in all team members
          <template #children>
            <ga-checkbox>Managers</ga-checkbox>
            <ga-checkbox checked>Developers</ga-checkbox>
            <ga-checkbox>QA</ga-checkbox>
            <ga-checkbox>Designers</ga-checkbox>
          </template>
        </ga-checkbox>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <ga-checkbox checked disabled>Receive security updates via email</ga-checkbox>
        <ga-form-detail>Only sent when major security flaws detected on your account.</ga-form-detail>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <div>
          <h3>Email me</h3>
        </div>

        <ga-checkbox indeterminate>
          Daily updates
          <template #children>
            <ga-checkbox>Messages from my inbox</ga-checkbox>
            <ga-checkbox>New invoices</ga-checkbox>
            <ga-checkbox disabled>Comments</ga-checkbox>
          </template>
        </ga-checkbox>

        <ga-checkbox>
          Weekly updates
          <template #children>
            <ga-checkbox>Unpaid totals of invoices</ga-checkbox>
            <ga-checkbox>Summary of amounts payed</ga-checkbox>
          </template>
        </ga-checkbox>

        <ga-form-detail>
          <template #icon><globe-lock/></template>
          All messages are SSL secured.
        </ga-form-detail>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <div>
          <h3>Document types (error)</h3>
          <p>Only future documents will be included in this workflow.</p>
        </div>

         <div :style="{display:'flex',gap:'8px'}">
          <ga-checkbox error>Invoices</ga-checkbox>
          <ga-checkbox error>Credit notes</ga-checkbox>
          <ga-checkbox error>Expense requests</ga-checkbox>
         </div>

         <ga-form-detail>
          <template #icon><octagon-alert strokeWidth="2.5" color="#CC453E"/></template>
          You need to select at least one document type.
        </ga-form-detail>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <div>
          <h3>Document types</h3>
          <p>Only future documents will be included in this workflow.</p>
        </div>

         <div :style="{display:'flex',gap:'8px'}">
          <ga-checkbox>Invoices</ga-checkbox>
          <ga-checkbox checked>Credit notes</ga-checkbox>
          <ga-checkbox>Expense requests</ga-checkbox>
         </div>

         <ga-form-detail>
          <template #icon><triangle-alert strokeWidth="2.5" color="#BB5822"/></template>
          Vodafone ASA did not sent any credit notes so far.
        </ga-form-detail>
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

export const WithDetail: Story = {
  args: {},
  render: () => ({
    components: { GaCheckbox, GaFormDetail },
    template: `
      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <ga-checkbox>I agree to the <a href="#">terms</a> and <a href="#">conditions</a>.</ga-checkbox>
        <ga-form-detail>
          <template #icon><octagon-alert strokeWidth="2.5" color="#CC453E"/></template>
          Error message goes here and is present in two lines in this case<br>but it can be short an concise and show in one line.
        </ga-form-detail>
      </div>
    `,
  }),
}

export const WithChildren: Story = {
  args: {},
  render: () => ({
    components: { GaCheckbox },
    template: `
      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <ga-checkbox indeterminate>
          Check in all team members
          <template #children>
            <ga-checkbox>Managers</ga-checkbox>
            <ga-checkbox checked>Developers</ga-checkbox>
            <ga-checkbox>QA</ga-checkbox>
            <ga-checkbox>Designers</ga-checkbox>
          </template>
        </ga-checkbox>
      </div>
    `,
  }),
}
