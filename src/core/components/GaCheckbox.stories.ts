import type { Meta, StoryObj } from '@storybook/vue3'
import { GlobeLock, OctagonAlert, TriangleAlert } from 'lucide-vue-next'

import { type AriaProps } from '../composables/useAria'
import GaCheckbox from './GaCheckbox.vue'
import GaFormField from './GaFormField.vue'
import GaFormDetail from './GaFormDetail.vue'
import GaFormNest from './GaFormNest.vue'

const meta = {
  component: GaCheckbox,
  title: 'Molecules/Checkbox',
  parameters: { layout: 'centered' },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'var(--ga-size-spacing-03)',padding:'var(--ga-size-spacing-05)'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean', description: 'The checked state of the checkbox.' },
    error: { control: 'boolean', description: 'Indicates an error state for the checkbox.' },
    errorMessage: {
      control: 'text',
      description: 'The error message to display when the checkbox is in an error state.',
    },
  },
} satisfies Meta<typeof GaCheckbox>

export default meta
type Story = StoryObj<typeof meta>

interface CheckboxVariation {
  name: 'Default' | 'Checked' | 'Indeterminate' | 'Error' | 'ErrorChecked' | 'ErrorIndeterminate'
  props: AriaProps & { default?: string; modelValue?: boolean }
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

const createStory = (variation: CheckboxVariation): Story => ({
  args: variation.props,
  render: (args) => ({
    components: { GaCheckbox, GaFormField },
    template: `
      <ga-form-field>
        <ga-checkbox v-bind="args" />
      </ga-form-field>

      <ga-form-field>
        <ga-checkbox v-bind="args" disabled />
      </ga-form-field>

      <ga-form-field :label="args.default || 'Checkbox Label'">
        <ga-checkbox v-bind="args" />
      </ga-form-field>
    `,
    setup: () => ({ args }),
  }),
})

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
      GaFormDetail,
      GaFormField,
      GaFormNest,
      GlobeLock,
      OctagonAlert,
      TriangleAlert,
    },
    template: `
    <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-06)'}">
      <ga-form-field>
        <ga-checkbox />
        <template #label>I agree to the <a href="#">terms</a> and <a href="#">conditions</a>.</template>
      </ga-form-field>

      <ga-form-field>
        <ga-checkbox />
        <template #label>This checkbox label<br/>wraps on two lines</template>
      </ga-form-field>


      <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-02)'}">
        <ga-form-field>
          <ga-checkbox error />
          <template #label>I agree to the <a href="#">terms</a> and <a href="#">conditions</a>. (error)</template>
        </ga-form-field>

        <ga-form-detail>
          <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)"/></template>
          Error message goes here and is present in two lines in this case<br>but it can be short an concise and show in one line.
        </ga-form-detail>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-02)'}">
        <ga-form-field label='The checkbox component offers a clear depiction of a binary choice, enabling users to select from several options or toggle a single option on or off.'>
          <ga-checkbox />
        </ga-form-field>
        <ga-form-detail>This callout ensures that the check mark is explained in even more detail.</ga-form-detail>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-03)'}">
        <div>
          <h3>Module selection</h3>
          <p :style="{fontSize:'var(--ga-text-xs-font-size)'}">Select the modules you want to include in your project.</p>
        </div>

        <ga-form-field>
          <ga-checkbox modelValue='true' />
          <template #label><span :style="{textDecoration:'underline dashed'}">Approval</span></template>
        </ga-form-field>

        <ga-form-field>
          <ga-checkbox />
          <template #label><span :style="{textDecoration:'underline dashed'}">Expense</span></template>
        </ga-form-field>

        <ga-form-nest>
          <ga-form-field>
            <ga-checkbox disabled indeterminate />
            <template #label><span :style="{textDecoration:'underline dashed'}">Payroll</span></template>
          </ga-form-field>

           <template #nested>
            <ga-form-field label='Absence tracking'>
              <ga-checkbox modelValue='true' disabled />
            </ga-form-field>

            <ga-form-field label='Leave requests'>
              <ga-checkbox disabled />
            </ga-form-field>
           </template>
        </ga-form-nest>

        <ga-form-field>
          <ga-checkbox />
          <template #label><span :style="{textDecoration:'underline dashed'}">Reporting</span></template>
        </ga-form-field>

        <ga-form-field>
          <ga-checkbox />
          <template #label><span :style="{textDecoration:'underline dashed'}">Taxation</span></template>
        </ga-form-field>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-03)'}">
        <ga-form-nest>
          <ga-form-field label='Check in all team members'>
            <ga-checkbox indeterminate />
          </ga-form-field>

          <template #nested>
            <ga-form-field label='Managers'>
              <ga-checkbox/>
            </ga-form-field>
            <ga-form-field label='Developers'>
              <ga-checkbox modelValue='true'/>
            </ga-form-field>
            <ga-form-field label='QA'>
              <ga-checkbox/>
            </ga-form-field>
            <ga-form-field label='Designers'>
              <ga-checkbox/>
            </ga-form-field>
          </template>
        </ga-form-nest>
      </div>

      <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-02)'}">
  <ga-form-field label='Receive security updates via email'>
    <ga-checkbox modelValue='true' disabled />
  </ga-form-field>
  <ga-form-detail label='Only sent when major security flaws detected on your account.' />
</div>

<div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-03)'}">
  <h3>Email me</h3>

  <ga-form-nest>
    <ga-form-field label='Daily updates' indeterminate>
      <ga-checkbox indeterminate />
    </ga-form-field>
    <template #nested>
      <ga-form-field label='Messages from my inbox'>
        <ga-checkbox />
      </ga-form-field>
      <ga-form-field label='New invoices'>
        <ga-checkbox />
      </ga-form-field>
      <ga-form-field label='Comments'>
        <ga-checkbox disabled />
      </ga-form-field>
    </template>
  </ga-form-nest>

  <ga-form-nest>
    <ga-form-field label='Weekly updates'>
      <ga-checkbox />
    </ga-form-field>
    <template #nested>
      <ga-form-field label='Unpaid totals of invoices'>
        <ga-checkbox />
      </ga-form-field>
      <ga-form-field label='Summary of amounts payed'>
        <ga-checkbox />
      </ga-form-field>
    </template>
  </ga-form-nest>

  <ga-form-detail label='All messages are SSL secured.'>
    <template #icon><globe-lock /></template>
  </ga-form-detail>
</div>

<div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-02)'}">
  <div>
    <h3>Document types (error)</h3>
    <p>Only future documents will be included in this workflow.</p>
  </div>

  <div :style="{display:'flex',gap:'var(--ga-size-spacing-03)'}">
    <ga-form-field label='Invoices' error>
      <ga-checkbox error />
    </ga-form-field>
    <ga-form-field label='Credit notes' error>
      <ga-checkbox error />
    </ga-form-field>
    <ga-form-field label='Expense requests' error>
      <ga-checkbox error />
    </ga-form-field>
  </div>

  <ga-form-detail label='You need to select at least one document type.'>
    <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)" /></template>
  </ga-form-detail>
</div>

<div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-02)'}">
  <div>
    <h3>Document types</h3>
    <p>Only future documents will be included in this workflow.</p>
  </div>

  <div :style="{display:'flex',gap:'var(--ga-size-spacing-03)'}">
    <ga-form-field label='Invoices'>
      <ga-checkbox />
    </ga-form-field>
    <ga-form-field label='Credit notes'>
      <ga-checkbox modelValue='true' />
    </ga-form-field>
    <ga-form-field label='Expense requests'>
      <ga-checkbox />
    </ga-form-field>
  </div>

  <ga-form-detail label='Vodafone ASA did not sent any credit notes so far.'>
    <template #icon><triangle-alert strokeWidth="2.5" color="var(--ga-color-warning)" /></template>
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
  render: (args) => ({
    components: { GaCheckbox, GaFormDetail, OctagonAlert },
    template: `
      <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-03)'}">
        <ga-checkbox v-bind="args">I agree to the <a href="#">terms</a> and <a href="#">conditions</a>.</ga-checkbox>
        <ga-form-detail>
          <template #icon><octagon-alert strokeWidth="2.5" color="var(--ga-color-error)"/></template>
          Error message goes here and is present in two lines in this case<br>but it can be short an concise and show in one line.
        </ga-form-detail>
      </div>
    `,
    setup: () => ({ args }),
  }),
}

export const WithNestedItems: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaCheckbox, GaFormNest },
    template: `
      <div :style="{display:'flex',flexDirection:'column',gap:'var(--ga-size-spacing-03)'}">
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
