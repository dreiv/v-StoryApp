import type { Meta, StoryObj } from '@storybook/vue3'
import {
  ArrowLeft,
  ChevronDown,
  DownloadIcon,
  EllipsisIcon,
  FilterX,
  FolderSync,
  MailIcon,
  SquarePlus,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-vue-next'

import GaBadge from './GaBadge.vue'
import GaSpinner from './GaSpinner.vue'
import GaButton, { type ButtonProps } from './GaButton.vue'

const meta = {
  component: GaButton,
  title: 'Molecules/Button',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div
          :style="{
            display: 'flex',
            justifyContent: 'center',
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
  argTypes: {
    default: { control: 'text', description: 'The text or content displayed within the button.' },
    primary: {
      control: 'boolean',
      description: 'Applies the primary button style, typically used for main actions.',
    },
    ghost: {
      control: 'boolean',
      description: 'Applies a ghost button style, with a transparent background and border.',
    },
    transparent: {
      control: 'boolean',
      description: 'Applies a transparent button style, with no background or border.',
    },
    icon: {
      control: 'boolean',
      description:
        'Indicates the button is an icon button, designed to display only an icon or short text.',
    },
  },
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

const createStory = (variation: ButtonVariation): Story => ({
  args: variation.props,
  render: (args) => ({
    components: { GaButton },
    template: `
      <ga-button v-bind="args">
        ${args.default || 'Button'}
      </ga-button>
      <ga-button v-bind="args" disabled>
        ${args.default || 'Button'}
      </ga-button>
    `,
    setup: () => ({ args }),
  }),
})

const stories: { [key: string]: Story } = {}
variations.forEach((variation) => {
  stories[variation.name] = createStory(variation)
})

export const Examples: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => ({
    components: {
      GaBadge,
      GaButton,
      GaSpinner,
      ArrowLeft,
      ChevronDown,
      DownloadIcon,
      EllipsisIcon,
      FilterX,
      FolderSync,
      MailIcon,
      SquarePlus,
      ThumbsDown,
      ThumbsUp,
    },
    template: `
      <div :style="{display:'flex',flexDirection:'column',gap:'24px'}">
        <div :style="{display:'flex',gap:'8px'}">
          <ga-button primary>Upload document</ga-button>
          <ga-button>Cancel</ga-button>
          <ga-button primary>Add more <square-plus /></ga-button>
        </div>

        <div :style="{display:'flex',gap:'8px'}">
          <ga-button primary>Inbox <ga-badge inverted>99</ga-badge></ga-button>
          <ga-button>Inbox <ga-badge inverted>99</ga-badge></ga-button>
          <ga-button ghost>Inbox <ga-badge inverted>99</ga-badge></ga-button>
        </div>

        <div :style="{display:'flex',gap:'8px'}">
          <ga-button primary><mail-icon />Inbox <ga-badge inverted>99</ga-badge></ga-button>
          <ga-button><mail-icon />Inbox <ga-badge inverted>99</ga-badge></ga-button>
          <ga-button ghost><mail-icon />Inbox <ga-badge inverted>99</ga-badge></ga-button>
        </div>

        <div :style="{display:'flex',justifyContent:'space-between',gap:'8px'}">
          <div :style="{display:'flex',gap:'8px'}">
            <ga-button primary icon><download-icon /></ga-button>
            <ga-button icon><ellipsis-icon /></ga-button>
            <ga-button icon ghost><folder-sync /></ga-button>
          </div>
          <ga-button primary><download-icon /> Download as PDF <chevron-down /></ga-button>
        </div>

        <div :style="{display:'flex',justifyContent:'space-between',gap:'8px'}">
        <ga-button disabled>
          <ga-spinner size="sm" label='Uploading file...'/>
        </ga-button>
        </div>

        <div :style="{display:'flex',justifyContent:'space-between',gap:'8px'}">
          <div :style="{display:'flex',gap:'8px'}">
            <ga-button primary>Review estimate</ga-button>
            <ga-button><filter-x />Clear estimate</ga-button>
          </div>
          <div :style="{display:'flex',gap:'8px'}">
            <ga-button><thumbs-up size='16' strokeWidth="2.5"/> 1</ga-button>
            <ga-button><thumbs-down size='16' strokeWidth="2.5"/> 0</ga-button>
          </div>
        </div>

        <div :style="{display:'flex',gap:'8px'}">
          <ga-button primary>Save and attach</ga-button>
          <ga-button ghost><arrow-left />Back</ga-button>
        </div>

        <div :style="{display:'flex',justifyContent:'space-between',gap:'8px',backgroundColor:'var(--ga-color-surface-page)',padding:'24px'}">
        <ga-button ghost>Complete later</ga-button>
        <div :style="{display:'flex',gap:'8px'}">
          <ga-button primary>Next step</ga-button>
          <ga-button><filter-x />Previous step</ga-button>
        </div>
        </div>
      </div>
    `,
  }),
}

export const Primary = stories.Primary
export const Secondary = stories.Secondary
export const Ghost = stories.Ghost
export const Transparent = stories.Transparent

export const Icon = {
  args: {},
  parameters: { controls: { disable: true } },
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
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaButton, DownloadIcon },
    template: `
      <ga-button primary><download-icon /> Button</ga-button>
      <ga-button>Button <download-icon /></ga-button>
      <ga-button disabled><download-icon /> Button</ga-button>
    `,
  }),
}
