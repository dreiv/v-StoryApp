import type { Meta } from '@storybook/vue3-vite'
import GaAvatar from './GaAvatar.vue'
import { User, Settings, CheckCircle } from 'lucide-vue-next'

const meta = {
  component: GaAvatar,
  title: 'Molecules/Avatar',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="display: flex; justify-content: center; gap: 8px;"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaAvatar>

export default meta

const stories = {
  Default: {
    render: () => ({
      components: { GaAvatar },
      template: `<ga-avatar content="AV" />`,
    }),
  },
  Disabled: {
    render: () => ({
      components: { GaAvatar },
      template: `<ga-avatar interactive disabled content="AV" />`,
    }),
  },
  Sizes: {
    render: () => ({
      components: { GaAvatar },
      template: `
        <div style="display: flex; align-items: center; gap: 16px;">
          <ga-avatar size="extra-small" content="s" />
          <ga-avatar size="small" content="S" />
          <ga-avatar size="medium" content="M" />
          <ga-avatar size="large" content="L" />
        </div>
      `,
    }),
  },
  WithContent: {
    render: () => ({
      components: { GaAvatar },
      template: `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <ga-avatar content="AV" />
          <ga-avatar content="JD" />
          <ga-avatar content="UI" />
        </div>
      `,
    }),
  },
  Interactive: {
    render: () => ({
      components: { GaAvatar },
      template: `
        <div style="display: flex; flex-direction: row; gap: 16px;">
          <ga-avatar content="JD" interactive alt="John Doe's profile" @click="handleClick" />
          <ga-avatar content="AV" interactive size="large" alt="Alex Vance's profile" @click="handleClick" />
        </div>
      `,
      methods: {
        handleClick() {
          alert('Avatar clicked!')
        },
      },
    }),
  },
  WithIcons: {
    render: () => ({
      components: { GaAvatar },
      template: `
        <div style="display: flex; flex-direction: row; gap: 16px;">
          <ga-avatar :icon="User" size="extra-small" alt="User icon" />
          <ga-avatar :icon="User" size="small" alt="User icon" />
          <ga-avatar :icon="User" alt="User icon" />
          <ga-avatar :icon="Settings" size="large" alt="Settings" />
        </div>
      `,
      setup: () => ({ User, Settings, CheckCircle }),
    }),
  },
  WithImages: {
    render: () => ({
      components: { GaAvatar },
      template: `
        <div style="display: flex; flex-direction: row; gap: 16px;">
          <ga-avatar image="https://i.pravatar.cc/100?img=3" size="small" alt="Avatar image small" />
          <ga-avatar image="https://i.pravatar.cc/150?img=8" alt="Avatar image medium" />
          <ga-avatar image="https://i.pravatar.cc/200?img=12" size="large" alt="Avatar image large" />
        </div>
      `,
    }),
  },
  WithImageFallback: {
    render: () => ({
      components: { GaAvatar },
      template: `
        <div style="display: flex; flex-direction: row; gap: 16px;">
          <ga-avatar image="https://invalid-url.com/image.jpg" content="AV" alt="Avatar with fallback" />
        </div>
      `,
    }),
  },
  Interactive_WithIconOrImage: {
    render: () => ({
      components: { GaAvatar, CheckCircle },
      template: `
        <div style="display: flex; flex-direction: row; gap: 16px;">
          <ga-avatar
            :icon="CheckCircle"
            interactive
            alt="Complete action"
            @click="handleClick"
          />
          <ga-avatar
            image="https://i.pravatar.cc/150?img=20"
            interactive
            alt="User profile"
            @click="handleClick"
          />
        </div>
      `,
      setup: () => ({ CheckCircle, handleClick: () => alert('Avatar clicked!') }),
    }),
  },
  DisabledWithImages: {
    render: () => ({
      components: { GaAvatar },
      template: `
        <div style="display: flex; flex-direction: row; gap: 16px;">
          <ga-avatar
            content="AV"
            interactive
            disabled
            alt="Disabled text avatar"
          />
          <ga-avatar
            :icon="User"
            interactive
            disabled
            alt="Disabled icon avatar"
          />
          <ga-avatar
            image="https://i.pravatar.cc/150?img=32"
            interactive
            disabled
            alt="Disabled image avatar"
          />
        </div>
      `,
      setup: () => ({ User }),
    }),
  },
}

export const Default = stories.Default
export const Disabled = stories.Disabled
export const Sizes = stories.Sizes
export const WithContent = stories.WithContent
export const Interactive = stories.Interactive
export const WithIcons = stories.WithIcons
export const WithImages = stories.WithImages
export const WithImageFallback = stories.WithImageFallback
export const InteractiveWithIconOrImage = stories.Interactive_WithIconOrImage
export const DisabledWithImages = stories.DisabledWithImages
