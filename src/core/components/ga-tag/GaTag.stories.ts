import type { FunctionalComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { CircleCheck, TriangleAlert, PlusIcon, InfoIcon } from 'lucide-vue-next'

import GaButton from '../ga-button/GaButton.vue'
import GaTag, { type TagProps } from './GaTag.vue'

const meta = {
  component: GaTag,
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
  icon?: FunctionalComponent
  props: TagProps & { default?: string }
}

const variations: TagVariation[] = [
  { name: 'Default', props: { icon: PlusIcon } },
  { name: 'Information', props: { icon: InfoIcon, information: true } },
  { name: 'Error', props: { icon: InfoIcon, error: true } },
  { name: 'Warning', props: { icon: TriangleAlert, warning: true } },
  { name: 'Success', props: { icon: CircleCheck, success: true } },
  { name: 'Disabled', props: { icon: CircleCheck, disabled: true } },
]

const createStory = (variation: TagVariation): Story => ({
  args: variation.props,
  render: (args) => ({
    components: { GaTag },
    template: `
      <ga-tag v-bind="args">
        ${args.default || variation.name}
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
    components: { GaTag, GaButton },
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
