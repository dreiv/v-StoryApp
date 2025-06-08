import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import GaLink from './GaLink.vue'

const meta: Meta<typeof GaLink> = {
  title: 'Molecules/Link',
  component: GaLink,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
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

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaLink },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <ga-link size="small">Small Link</ga-link>
          <ga-link size="medium">Medium Link</ga-link>
          <ga-link size="large">Large Link</ga-link>
        </div>
      </div>
    `,
  }),
}

export const WithLeadingIcon: Story = {
  render: (args) => ({
    components: { GaLink, ArrowLeft },
    setup: () => ({ args }),
    template: '<ga-link v-bind="args"><arrow-left /> Leading Icon</ga-link>',
  }),
}

export const WithTrailingIcon: Story = {
  render: (args) => ({
    components: { GaLink, ArrowRight },
    setup: () => ({ args }),
    template: '<ga-link v-bind="args">Trailing Icon <arrow-right /></ga-link>',
  }),
}

export const Disabled: Story = { args: { disabled: true } }
export const Small: Story = { args: { size: 'small' } }
export const Large: Story = { args: { size: 'large' } }
