import type { FunctionalComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { CircleCheck, TriangleAlert, PlusIcon, InfoIcon, XIcon } from 'lucide-vue-next'

import GaTag, { type TagProps } from './GaTag.vue'

const meta = {
  component: GaTag,
  title: 'Molecules/Tag',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;"><story /></div>`,
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
  { name: 'Default', props: { beforeIcon: PlusIcon } },
  { name: 'Information', props: { beforeIcon: InfoIcon, information: true } },
  { name: 'Error', props: { beforeIcon: InfoIcon, error: true } },
  { name: 'Warning', props: { beforeIcon: TriangleAlert, warning: true } },
  { name: 'Success', props: { beforeIcon: CircleCheck, success: true } },
  { name: 'Disabled', props: { beforeIcon: CircleCheck, disabled: true } },
]

const createStory = (variation: TagVariation): Story => ({
  args: variation.props,
  render: (args) => ({
    components: { GaTag },
    template: `
      <ga-tag v-bind="args">
        ${args.default || variation.name}
      </ga-tag>
      <ga-tag v-bind="args" :beforeIcon="" :afterIcon="xIcon">
        ${args.default || variation.name}
      </ga-tag>

      <ga-tag v-bind="args" separator :afterIcon="xIcon">
        ${args.default || variation.name}
      </ga-tag>
    `,
    setup: () => ({ args, xIcon: XIcon }),
  }),
})

const stories: { [key: string]: Story } = {}
variations.forEach((variation) => {
  stories[variation.name] = createStory(variation)
})

export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTag },
    template: `
      <ga-tag>Default</ga-tag>
    `,
  }),
}

export const Default: Story = stories.Default
export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTag, XIcon },
    template: `
      <ga-tag interactive :beforeIcon="plus">Default</ga-tag>
      <ga-tag interactive separator :afterIcon="xIcon">With Separator</ga-tag>
      <ga-tag interactive :beforeIcon="plus" disabled>Disabled</ga-tag>
      <ga-tag interactive :beforeIcon="plus" selected>Selected</ga-tag>
      <ga-tag interactive :beforeIcon="plus" selected disabled>Selected Disabled</ga-tag>
    `,
    setup: () => ({ xIcon: XIcon, plus: PlusIcon }),
  }),
}
export const Information: Story = stories.Information
export const Error: Story = stories.Error
export const Warning: Story = stories.Warning
export const Success: Story = stories.Success
export const Disabled: Story = stories.Disabled
