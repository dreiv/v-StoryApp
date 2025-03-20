import type { Meta, StoryObj } from '@storybook/vue3'
import GaBadge, { type BadgeProps } from '@/core/components/GaBadge.vue'

const meta = {
  component: GaBadge,
  title: 'Molecules/Badge',
  parameters: { layout: 'centered' },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div :style="{display:'flex',alignItems:'center',gap:'8px',padding:'1rem'}"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaBadge>

export default meta
type Story = StoryObj<typeof meta>

interface BadgeVariation {
  name:
    | 'Default'
    | 'Inverted'
    | 'Muted'
    | 'Information'
    | 'Error'
    | 'Warning'
    | 'Success'
    | 'Disabled'
    | 'DisabledInverted'
  props: BadgeProps & { default?: string }
}

const variations: BadgeVariation[] = [
  { name: 'Default', props: {} },
  { name: 'Inverted', props: { inverted: true } },
  { name: 'Muted', props: { muted: true } },
  { name: 'Information', props: { information: true } },
  { name: 'Error', props: { error: true } },
  { name: 'Warning', props: { warning: true } },
  { name: 'Success', props: { success: true } },
  { name: 'Disabled', props: { disabled: true } },
  { name: 'DisabledInverted', props: { disabled: true, inverted: true } },
]

const createBadgeStory = (variation: BadgeVariation): Story => ({
  args: {},
  render: () => ({
    components: { GaBadge },
    template: `
      <ga-badge v-bind="variation.props">99</ga-badge>
      <ga-badge v-bind="variation.props" />
    `,
    data: () => ({ variation }),
  }),
})

const stories: { [key: string]: Story } = {}
variations.forEach((variation) => {
  stories[variation.name] = createBadgeStory(variation)
})

export const Default: Story = stories.Default
export const Inverted: Story = stories.Inverted
export const Muted: Story = stories.Muted
export const Information: Story = stories.Information
export const Error: Story = stories.Error
export const Warning: Story = stories.Warning
export const Success: Story = stories.Success
export const Disabled: Story = stories.Disabled
export const DisabledInverted: Story = stories.DisabledInverted
