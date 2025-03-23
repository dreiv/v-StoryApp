import type { Meta, StoryObj } from '@storybook/vue3'
import { GlobeLock, OctagonAlert, TriangleAlert } from 'lucide-vue-next'

import GaCheckbox, { type CheckboxProps } from './GaCheckbox.vue'
import GaFormDetail from './GaFormDetail.vue'
import GaFormNest from './GaFormNest.vue'

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
  props: CheckboxProps & { default?: string; indeterminate?: boolean; disabled?: boolean }
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
    components: { GaCheckbox, GaFormDetail, GaFormNest, GlobeLock, OctagonAlert, TriangleAlert },
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
        <ga-checkbox label='The checkbox component offers a clear depiction of a binary choice, enabling users to select from several options or toggle a single option on or off.' />
        <ga-form-detail>This callout ensures that the checkmark is explained in even more detail.</ga-form-detail>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <div>
          <h3>Module selection</h3>
          <p>Select the modules you want to include in your project.</p>
        </div>

        <ga-checkbox modelValue='true' label='Approval' />
        <ga-checkbox label='Expense' />
        <ga-form-nest>
          <ga-checkbox disabled indeterminate label='Payroll' />
          <template #nested>
            <ga-checkbox modelValue='true' disabled label='Absence tracking' />
            <ga-checkbox disabled label='Leave requests' />
          </template>
        </ga-form-nest>
        <ga-checkbox label='Reporting' />
        <ga-checkbox label='Taxation' />
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <ga-form-nest>
          <ga-checkbox indeterminate label='Check in all team members' />
          <template #nested>
            <ga-checkbox label='Managers' />
            <ga-checkbox modelValue='true' label='Developers' />
            <ga-checkbox label='QA' />
            <ga-checkbox label='Designers' />
          </template>
        </ga-form-nest>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <ga-checkbox modelValue='true' disabled label='Receive security updates via email' />
        <ga-form-detail label='Only sent when major security flaws detected on your account.' />
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
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

        <ga-form-detail label='All messages are SSL secured.'>
          <template #icon><globe-lock/></template>
        </ga-form-detail>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <div>
          <h3>Document types (error)</h3>
          <p>Only future documents will be included in this workflow.</p>
        </div>

         <div :style="{display:'flex',gap:'8px'}">
          <ga-checkbox error label='Invoices' />
          <ga-checkbox error label='Credit notes' />
          <ga-checkbox error label='Expense requests' />
         </div>

         <ga-form-detail label='You need to select at least one document type.'>
          <template #icon><octagon-alert strokeWidth="2.5" color="#CC453E"/></template>
        </ga-form-detail>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <div>
          <h3>Document types</h3>
          <p>Only future documents will be included in this workflow.</p>
        </div>

        <div :style="{display:'flex',gap:'8px'}">
          <ga-checkbox label='Invoices' />
          <ga-checkbox modelValue='true' label='Credit notes' />
          <ga-checkbox label='Expense requests' />
        </div>

        <ga-form-detail label='Vodafone ASA did not sent any credit notes so far.'>
          <template #icon><triangle-alert strokeWidth="2.5" color="#BB5822"/></template>
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
    components: { GaCheckbox, GaFormDetail, OctagonAlert },
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
    components: { GaCheckbox, GaFormNest },
    template: `
      <div :style="{display:'flex',flexDirection:'column',gap:'8px'}">
        <ga-form-nest>
          <ga-checkbox indeterminate label='Check in all team members' />
          <template #nested>
            <ga-checkbox label='Managers' />
            <ga-checkbox modelValue='true' label='Developers' />
            <ga-checkbox label='QA' />
            <ga-checkbox label='Designers' />
          </template>
        </ga-form-nest>
      </div>
    `,
  }),
}
