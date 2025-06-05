import type { ConcreteComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { ChevronDown } from 'lucide-vue-next'

import GaButton from '../ga-button/GaButton.vue'
import GaTag, { type TagProps } from './GaTag.vue'

const meta = {
  component: GaTag as unknown as ConcreteComponent,
  title: 'Molecules/Tag',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="display: flex; justify-content: center; gap: 8px;"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaTag>

export default meta
type Story = StoryObj<typeof meta>

interface TagVariation {
  name: 'Default' | 'Information' | 'Error' | 'Warning' | 'Success' | 'Disabled'
  props: TagProps & { default?: string }
  customRender?: boolean
}

const variations: TagVariation[] = [
  { name: 'Default', props: {} },
  { name: 'Information', props: { information: true } },
  { name: 'Error', props: { error: true } },
  { name: 'Warning', props: { warning: true } },
  { name: 'Success', props: { success: true } },
  { name: 'Disabled', props: { disabled: true } },
]

const createStory = (variation: TagVariation): Story => ({
  args: variation.props,
  render: (args) => ({
    components: { GaTag },
    template: `
      <ga-tag v-bind="args">
        ${args.default || 'Text'}
      </ga-tag>
    `,
    setup: () => ({ args }),
  }),
})

const stories: { [key: string]: Story } = {}
variations.forEach((variation) => {
  stories[variation.name] = createStory(variation)
})

export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTag, GaButton, ChevronDown },
    template: `
      <ga-tag>Default</ga-tag>
    `,
  }),
}

export const Default: Story = stories.Default
export const Information: Story = stories.Information
export const Error: Story = stories.Error
export const Warning: Story = stories.Warning
export const Success: Story = stories.Success
export const Disabled: Story = stories.Disabled
