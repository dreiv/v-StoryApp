import type { Meta, StoryObj } from '@storybook/vue3'
import { ChartSpline, OctagonAlert, TriangleAlert } from 'lucide-vue-next'

import GaFormDetail from './GaFormDetail.vue'
import GaFormField from './GaFormField.vue'
import GaRadio from './GaRadio.vue'
import GaRadioGroup from './GaRadioGroup.vue'

const meta = {
  component: GaRadioGroup,
  title: 'Molecules/RadioGroup',
  parameters: { layout: 'centered' },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'var(--ga-size-spacing-03)',padding:'var(--ga-size-spacing-05)'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} as Meta<typeof GaRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Allows users to select a single option from a visible set of mutually exclusive choices.
 */
export const Examples: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => ({
    components: {
      GaFormDetail,
      GaFormField,
      GaRadio,
      GaRadioGroup,
      ChartSpline,
      OctagonAlert,
      TriangleAlert,
    },
    template: `
      <div :style="{display:'flex',flexWrap:'wrap',gap:'var(--ga-size-spacing-06)',maxWidth:'960px'}">
        <ga-radio-group title="Payment frequency">
          <ga-form-field label="Daily">
            <ga-radio value="1" />
          </ga-form-field>
          <ga-form-field label="Weekly">
            <ga-radio value="2" />
          </ga-form-field>
          <ga-form-field label="Monthly">
            <ga-radio value="3" />
          </ga-form-field>
          <ga-form-field label="Annually">
            <ga-radio value="4" />
          </ga-form-field>
        </ga-radio-group>

        <ga-radio-group title="Financial goals setting">
          <ga-form-field label="Retirement planning">
            <ga-radio value="1" checked />
          </ga-form-field>
          <ga-form-field label="Debt reduction">
            <ga-radio value="2" />
          </ga-form-field>
          <ga-form-field label="Company savings">
            <ga-radio value="3" />
          </ga-form-field>
        </ga-radio-group>

        <ga-radio-group title="Account alert notifications">
          <ga-form-field>
            <template #label>
              Push notification<br />
              <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">Linked with Expense mobile application</span>
            </template>
            <ga-radio value="1" disabled />
          </ga-form-field>
          <ga-form-field>
            <template #label>
              Email notification<br />
              <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">To john.smith@mail.com</span>
            </template>
            <ga-radio value="2" />
          </ga-form-field>
          <ga-form-field>
            <template #label>
              SMS notification<br />
              <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">Your phone number +40914 31 914</span>
            </template>
            <ga-radio value="3" />
          </ga-form-field>
        </ga-radio-group>

        <ga-radio-group>
          <template #title>
            Portfolio view filter<br />
            <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">Primary view of this filter</span>
          </template>
          <ga-form-field label="Overall performance">
            <ga-radio value="1" checked disabled />
          </ga-form-field>
          <ga-form-field label="Sector allocation">
            <ga-radio value="2" />
          </ga-form-field>
          <ga-form-field label="Asset allocation">
            <ga-radio value="3" />
          </ga-form-field>
        </ga-radio-group>

        <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-03)'}">
          <ga-radio-group title='Risk tolerance level'>
            <ga-form-field label="Conservative">
              <ga-radio value="1" checked />
            </ga-form-field>
            <ga-form-field label="Moderate">
              <ga-radio value="2" />
            </ga-form-field>
            <ga-form-field label="Aggressive">
              <ga-radio value="3" />
            </ga-form-field>
          </ga-radio-group>
          <ga-form-detail label="Risk factors affect algorithmic payments as well">
            <template #icon><chart-spline /></template>
          </ga-form-detail>
        </div>

        <ga-radio-group direction="horizontal">
          <template #title>
            Portfolio view filter<br />
            <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">Primary view of this filter</span>
          </template>
          <ga-form-field label="Overall performance">
            <ga-radio value="1" checked />
          </ga-form-field>
          <ga-form-field label="Sector allocation">
            <ga-radio value="2" />
          </ga-form-field>
          <ga-form-field label="Asset allocation">
            <ga-radio value="3" />
          </ga-form-field>
        </ga-radio-group>

        <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-03)'}">
          <ga-radio-group title='Risk tolerance level' direction="horizontal">
            <ga-form-field label="Conservative">
              <ga-radio value="1" checked />
            </ga-form-field>
            <ga-form-field label="Moderate">
              <ga-radio value="2" />
            </ga-form-field>
            <ga-form-field label="Aggressive">
              <ga-radio value="3" />
            </ga-form-field>
          </ga-radio-group>
          <ga-form-detail label="Risk factors affect algorithmic payments as well">
            <template #icon><chart-spline /></template>
          </ga-form-detail>
        </div>

        <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-03)'}">
          <ga-radio-group>
            <template #title>
              Document type (error)<br />
              <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">Documents with this workflow applied automatically</span>
            </template>
            <ga-form-field label="Invoices" error>
              <ga-radio value="1" error />
            </ga-form-field>
            <ga-form-field label="Cost requests" error>
              <ga-radio value="2" error />
            </ga-form-field>
            <ga-form-field label="Credit notes" error>
              <ga-radio value="3" error />
            </ga-form-field>
          </ga-radio-group>
          <ga-form-detail label="Please select a document type for this workflow">
            <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)" /></template>
          </ga-form-detail>
        </div>

        <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-03)'}">
          <ga-radio-group direction="horizontal">
            <template #title>
              Document type (error)<br />
              <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">Documents with this workflow applied automatically</span>
            </template>
            <ga-form-field label="Invoices" error>
              <ga-radio value="1" error />
            </ga-form-field>
            <ga-form-field label="Cost requests" error>
              <ga-radio value="2" error />
            </ga-form-field>
            <ga-form-field label="Credit notes" error>
              <ga-radio value="3" error />
            </ga-form-field>
          </ga-radio-group>
          <ga-form-detail label="Please select a document type for this workflow">
            <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)" /></template>
          </ga-form-detail>
        </div>

        <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-03)'}">
          <ga-radio-group>
            <template #title>
              Document type<br />
              <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">Documents with this workflow applied automatically</span>
            </template>
            <ga-form-field label="Invoices">
              <ga-radio value="1" />
            </ga-form-field>
            <ga-form-field label="Cost requests">
              <ga-radio value="2" checked />
            </ga-form-field>
            <ga-form-field label="Credit notes">
              <ga-radio value="3" />
            </ga-form-field>
          </ga-radio-group>
          <ga-form-detail label="Please select a document type for this workflow">
            <template #icon><triangle-alert strokeWidth="2.5" color="var(--ga-color-warning)" /></template>
          </ga-form-detail>
        </div>

        <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-03)'}">
          <ga-radio-group direction="horizontal">
            <template #title>
              Document type<br />
              <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">Documents with this workflow applied automatically</span>
            </template>
            <ga-form-field label="Invoices">
              <ga-radio value="1" />
            </ga-form-field>
            <ga-form-field label="Cost requests">
              <ga-radio value="2" checked />
            </ga-form-field>
            <ga-form-field label="Credit notes">
              <ga-radio value="3" />
            </ga-form-field>
          </ga-radio-group>
          <ga-form-detail label="Please select a document type for this workflow">
            <template #icon><triangle-alert strokeWidth="2.5" color="var(--ga-color-warning)" /></template>
          </ga-form-detail>
        </div>
      </div>
    `,
  }),
}
