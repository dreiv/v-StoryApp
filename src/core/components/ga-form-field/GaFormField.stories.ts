import type { ConcreteComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

import { TriangleAlert } from 'lucide-vue-next'

import GaButton from '../ga-button/GaButton.vue'
import GaFormInfo from '../GaFormInfo.vue'
import GaInput from '../ga-input/GaInput.vue'
import GaFormField from './GaFormField.vue'

const meta = {
  component: GaFormField as unknown as ConcreteComponent,
  title: 'Molecules/FormField',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display: 'flex',justifyContent: 'center',gap: '8px'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaFormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaFormField, GaButton, GaInput },
    template: `
      <ga-form-field label="Label">
        <ga-input placeholder="Placeholder" />
      </ga-form-field>
    `,
  }),
}

export const WithInfo: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaFormField, GaButton, GaInput, GaFormInfo, TriangleAlert },
    template: `
      <ga-form-field label="Label">
        <ga-input placeholder="Placeholder" />

        <template #info>
          <ga-form-info label="Use special characters if available."><template #icon><triangle-alert /></template></ga-form-info>
        </template>
      </ga-form-field>
    `,
  }),
}
