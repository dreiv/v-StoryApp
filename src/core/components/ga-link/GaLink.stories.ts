import type { Meta, StoryObj } from '@storybook/vue3'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import GaLink from './GaLink.vue'

const meta: Meta<typeof GaLink> = {
  title: 'Molecules/Link',
  component: GaLink,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'lg'],
      description: 'The size of the link.',
    },
    text: {
      control: { type: 'text' },
      description: 'The text content of the link.',
    },
    inline: {
      control: { type: 'boolean' },
      description: 'Whether the link is displayed inline or as a block.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the link is disabled.',
    },
    href: {
      control: { type: 'text' },
      description: 'The URL that the hyperlink points to.',
    },
  },
  args: {
    text: 'Link',
    inline: false,
    disabled: false,
    href: '#',
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="display: flex; justify-content: center; align-items: center; gap: 8px; padding: 1rem;"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: {} }
export const Inline: Story = { args: { inline: true } }

export const WithLeadingIcon: Story = {
  render: (args) => ({
    components: { GaLink, ArrowLeft },
    setup: () => ({ args }),
    template: '<ga-link v-bind="args"><arrow-left /> {{ text }}</ga-link>',
  }),
  args: { text: 'Leading Icon' },
}

export const WithTrailingIcon: Story = {
  render: (args) => ({
    components: { GaLink, ArrowRight },
    setup: () => ({ args }),
    template: '<ga-link v-bind="args">{{ text }} <arrow-right /></ga-link>',
  }),
  args: { text: 'Trailing Icon' },
}

export const Disabled: Story = { args: { disabled: true } }
export const Small: Story = { args: { size: 'sm' } }
export const Large: Story = { args: { size: 'lg' } }
