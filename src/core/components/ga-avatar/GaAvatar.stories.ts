import type { Meta } from '@storybook/vue3-vite'
import GaAvatar from './GaAvatar.vue'

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
  Sizes: {
    render: () => ({
      components: { GaAvatar },
      template: `
        <div style="display: flex; align-items: center; gap: 16px;">
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
}

export const Default = stories.Default
export const Sizes = stories.Sizes
export const WithContent = stories.WithContent
export const Interactive = stories.Interactive
