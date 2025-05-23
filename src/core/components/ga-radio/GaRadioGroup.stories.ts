import type { Meta, StoryObj } from '@storybook/vue3'
import { ChartSpline, OctagonAlert, TriangleAlert } from 'lucide-vue-next'

import GaFormDetail from '../GaFormDetail.vue'
import GaRadio from './GaRadio.vue'
import GaRadioGroup from './GaRadioGroup.vue'

const meta = {
  component: GaRadioGroup,
  title: 'Molecules/RadioGroup',
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
    modelValue: { control: 'text', description: 'The selected radio value.' },
    title: { control: 'text', description: 'The title of the radio group.' },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'The layout direction of the radio buttons.',
    },
  },
} satisfies Meta<typeof GaRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Allows users to select a single option from a visible set of mutually exclusive choices.
 */
export const Examples: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaFormDetail, GaRadio, GaRadioGroup, ChartSpline, OctagonAlert, TriangleAlert },
    template: `
      <div :style="{display:'flex',flexWrap:'wrap',gap:'var(--ga-size-spacing-06)',maxWidth:'960px'}">
        <ga-radio-group title="Payment frequency">
          <ga-radio value="1" label='Daily' />
          <ga-radio value="2" label='Weekly' />
          <ga-radio value="3" label='Monthly' />
          <ga-radio value="4" label='Annually' />
        </ga-radio-group>

        <ga-radio-group title="Financial goals setting">
          <ga-radio value="1" label='Retirement planning' checked />
          <ga-radio value="2" label='Debt reduction' />
          <ga-radio value="3" label='Company savings' />
        </ga-radio-group>

        <ga-radio-group title="Account alert notifications">
          <ga-radio value="1" disabled>
            Push notification<br/>
            <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">Linked with Expense mobile application</span>
          </ga-radio>
          <ga-radio value="2">
            Email notification<br/>
            <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">To john.smith@mail.com</span>
          </ga-radio>
          <ga-radio value="3">
            SMS notification<br/>
            <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">Your phone number +40914 31 914</span>
          </ga-radio>
        </ga-radio-group>

        <ga-radio-group>
          <template #title>
            Portfolio view filter<br />
            <span :style="{fontSize:'var(--ga-text-sm-font-size)'}">Primary view of this filter</span>
          </template>

          <ga-radio value="1" label='Overall performance' checked disabled />
          <ga-radio value="2" label='Sector allocation' />
          <ga-radio value="3" label='Asset allocation' />
        </ga-radio-group>

        <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-03)'}">
          <ga-radio-group title='Risk tolerance level'>
            <ga-radio value="1" label='Conservative' checked />
            <ga-radio value="2" label='Moderate' />
            <ga-radio value="3" label='Aggressive' />
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

          <ga-radio value="1" label='Overall performance' checked />
          <ga-radio value="2" label='Sector allocation' />
          <ga-radio value="3" label='Asset allocation' />
        </ga-radio-group>

        <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-03)'}">
          <ga-radio-group title='Risk tolerance level' direction="horizontal">
            <ga-radio value="1" label='Conservative' checked />
            <ga-radio value="2" label='Moderate' />
            <ga-radio value="3" label='Aggressive' />
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

            <ga-radio value="1" label='Invoices' error />
            <ga-radio value="2" label='Cost requests' error />
            <ga-radio value="3" label='Credit notes' error />
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

            <ga-radio value="1" label='Invoices' error />
            <ga-radio value="2" label='Cost requests' error />
            <ga-radio value="3" label='Credit notes' error />
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

            <ga-radio value="1" label='Invoices' />
            <ga-radio value="2" label='Cost requests' checked />
            <ga-radio value="3" label='Credit notes' />
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

            <ga-radio value="1" label='Invoices' />
            <ga-radio value="2" label='Cost requests' checked />
            <ga-radio value="3" label='Credit notes' />
          </ga-radio-group>

          <ga-form-detail label="Please select a document type for this workflow">
            <template #icon><triangle-alert strokeWidth="2.5" color="var(--ga-color-warning)" /></template>
          </ga-form-detail>
        </div>
      </div>
    `,
  }),
}
