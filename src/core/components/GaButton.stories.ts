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

export const Examples: Story = {
  args: {},
  render: () => ({
    components: {
      GaBadge,
      GaButton,
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
          <div :style="{display:'flex',gap:'8px'}">
            <ga-button primary>Review estimate</ga-button>
            <ga-button><filter-x />Clear estimate</ga-button>
          </div>
          <div :style="{display:'flex',gap:'8px'}">
            <ga-button><thumbs-up width='16'/> 1</ga-button>
            <ga-button><thumbs-down width='16'/> 0</ga-button>
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
