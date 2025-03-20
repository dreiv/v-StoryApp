import type { Meta, StoryObj } from '@storybook/vue3'
import { DownloadIcon } from 'lucide-vue-next'

import GaButton, { type ButtonProps } from '@/core/components/GaButton.vue'

const meta = {
  component: GaButton,
  title: 'Molecules/Button',
  parameters: { layout: 'centered' },
  decorators: [
    (story) => ({
      components: { story },
      template: `
      <div
        :style="{
          display: 'flex',
          gap: '8px',
          padding: '1rem',
          background: 'repeating-linear-gradient(45deg, #eee 0px, #eee 10px, #fff 10px, #fff 20px)'
        }"
      >
        <story />
      </div>
    `,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaButton>

export default meta
type Story = StoryObj<typeof meta>

interface ButtonVariation {
  name: 'Primary' | 'Secondary' | 'Ghost' | 'Transparent' | 'Icon'
  props: ButtonProps & { default?: string }
}

const variations: ButtonVariation[] = [
  { name: 'Primary', props: { primary: true } },
  { name: 'Secondary', props: {} },
  { name: 'Ghost', props: { ghost: true } },
  { name: 'Transparent', props: { transparent: true } },
  { name: 'Icon', props: { icon: true, default: '✅' } },
]

const createButtonStory = (variation: ButtonVariation): Story => ({
  args: {},
  render: () => ({
    components: { GaButton },
    template: `
      <ga-button v-bind="variation.props">Button</ga-button>
      <ga-button v-bind="variation.props" disabled>Button</ga-button>
    `,
    data: () => ({ variation }),
  }),
})

const stories: { [key: string]: Story } = {}
variations.forEach((variation) => {
  stories[variation.name] = createButtonStory(variation)
})

export const Primary = stories.Primary
export const Secondary = stories.Secondary
export const Ghost = stories.Ghost
export const Transparent = stories.Transparent

export const Icon = {
  args: {},
  render: () => ({
    components: { GaButton, DownloadIcon },
    template: `
      <ga-button icon primary><download-icon /></ga-button>
      <ga-button icon><download-icon /></ga-button>
      <ga-button icon ghost><download-icon /></ga-button>
      <ga-button icon transparent><download-icon /></ga-button>
      <ga-button icon disabled><download-icon /></ga-button>
    `,
  }),
}

export const IconAndText = {
  args: {},
  render: () => ({
    components: { GaButton, DownloadIcon },
    template: `
      <ga-button primary><download-icon /> Button</ga-button>
      <ga-button>Button <download-icon /></ga-button>
      <ga-button disabled><download-icon /> Button</ga-button>
    `,
  }),
}
