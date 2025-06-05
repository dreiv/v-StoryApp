import type { Meta, StoryObj } from '@storybook/vue3'
import { BellIcon, BellDot, MailIcon } from 'lucide-vue-next'

import GaBadge, { type BadgeProps } from './GaBadge.vue'

const meta = {
  component: GaBadge,
  title: 'Molecules/Badge',
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
    default: {
      control: 'text',
      description: 'The text displayed within the badge. Leave empty for a simple indicator.',
    },
    inverted: {
      control: 'boolean',
      description:
        'Applies an inverted color scheme, typically used on darker backgrounds for better visibility.',
    },
    muted: {
      control: 'boolean',
      description:
        'Applies a muted, less prominent color scheme, suitable for secondary information.',
    },
    information: {
      control: 'boolean',
      description:
        'Styles the badge to indicate informational content, often with a blue or similar color.',
    },
    error: {
      control: 'boolean',
      description:
        'Styles the badge to indicate an error or negative state, commonly using a red color.',
    },
    warning: {
      control: 'boolean',
      description:
        'Styles the badge to indicate a warning or potential issue, often using a yellow or orange color.',
    },
    success: {
      control: 'boolean',
      description:
        'Styles the badge to indicate a successful or positive state, typically using a green color.',
    },
    disabled: {
      control: 'boolean',
      description:
        'Applies a disabled appearance, indicating the badge is inactive or not applicable.',
    },
  },
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

const createStory = (variation: BadgeVariation): Story => ({
  args: variation.props,
  render: (args) => ({
    components: { GaBadge },
    template: `
      <ga-badge v-bind="args">
        ${args.default || '99'}
      </ga-badge>
      <ga-badge v-bind="args" v-if="!args.default"/>
    `,
    setup: () => ({ args }),
  }),
})

const stories: { [key: string]: Story } = {}
variations.forEach((variation) => {
  stories[variation.name] = createStory(variation)
})

/**
 * Conveys status, counts, or labels via small, often overlaid elements, highlighting updates or categorizing items at a glance.
 */
export const Examples: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaBadge, BellIcon, BellDot, MailIcon },
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-06);">
        <div style="display: flex; gap: 16px;">
          <ga-badge>25</ga-badge>
          <ga-badge inverted>99</ga-badge>
          <ga-badge muted>7</ga-badge>
          <ga-badge information>+25</ga-badge>
          <ga-badge error>-369%</ga-badge>
          <ga-badge warning>9</ga-badge>
          <ga-badge success>+25K</ga-badge>
        </div>

        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px;">
          <div><ga-badge success /> User online</div>
          <div><ga-badge disabled /> User offline</div>
          <div><ga-badge information /> Last sync was <a href='#'>13 minutes ago</a></div>
          <div><ga-badge error /> Retrieval error (timeout)</div>
        </div>

        <div style="display: flex; gap: 16px;">
          <div style="position: relative;">
            <bell-dot />
            <ga-badge success style="position: absolute; top: 4px; right: 2px;" />
          </div>
          <div style="position: relative;">
            <bell-dot />
            <ga-badge warning style="position: absolute; top: 4px; right: 2px;" />
          </div>
          <div style="position: relative;">
            <bell-dot />
            <ga-badge information style="position: absolute; top: 4px; right: 2px;" />
          </div>
          <div style="position: relative;">
            <bell-dot />
            <ga-badge error style="position: absolute; top: 4px; right: 2px;" />
          </div>
        </div>

        <div style="display: flex; gap: 16px;">
          <div style="display: flex; align-items: center; gap: var(--ga-size-spacing-03);">
            <bell-icon /><ga-badge>99+</ga-badge>
          </div>
          <div style="display: flex; align-items: center; gap: var(--ga-size-spacing-03);">
            <bell-icon /><ga-badge inverted>99+</ga-badge>
          </div>
          <div style="display: flex; align-items: center; gap: var(--ga-size-spacing-03);">
            <mail-icon /><ga-badge>123456</ga-badge>
          </div>
          <div style="display: flex; align-items: center; gap: var(--ga-size-spacing-03);">
            <mail-icon /><ga-badge inverted>123456</ga-badge>
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          <div style="display: flex; align-items: center; gap: var(--ga-size-spacing-03);">
            <span>12 new incidents detected</span><ga-badge error>12 ↓</ga-badge>
          </div>
          <div style="display: flex; align-items: center; gap: var(--ga-size-spacing-03);">
            <span>New sales</span><ga-badge success>4.2K ↑</ga-badge>
          </div>
          <div style="display: flex; align-items: center; gap: var(--ga-size-spacing-03);">
            <span>Missing payments</span><ga-badge warning>9</ga-badge>
          </div>
          <div style="display: flex; align-items: center; gap: var(--ga-size-spacing-03);">
            <span>Revenue increased by <a href='#'>789.00 NOK</a></span><ga-badge information>5.4%</ga-badge>
          </div>
        </div>

        <div style="display: flex; gap: 16px; width: 96px; background-color: var(--ga-color-surface-action); padding: 16px; border-radius: var(--ga-radius);">
          <ga-badge inverted>99</ga-badge>
          <ga-badge muted>99</ga-badge>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-03); width: 240px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>Personal Inbox</span><ga-badge inverted>32</ga-badge>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>Invoices</span><ga-badge muted>32</ga-badge>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>Credit notes</span><ga-badge disabled inverted>32</ga-badge>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>Leave requests</span><ga-badge>32</ga-badge>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>Expense claim</span><ga-badge disabled>0</ga-badge>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Default: Story = stories.Default
export const Inverted: Story = stories.Inverted
export const Muted: Story = stories.Muted
export const Information: Story = stories.Information
export const Error: Story = stories.Error
export const Warning: Story = stories.Warning
export const Success: Story = stories.Success
export const Disabled: Story = stories.Disabled
export const DisabledInverted: Story = stories.DisabledInverted
