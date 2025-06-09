import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { User, CheckCircle, AlertCircle, PlusCircle, Mail, UserPlus } from 'lucide-vue-next'

import GaBadge from '../ga-badge/GaBadge.vue'
import GaAvatar from './GaAvatar.vue'

const meta = {
  component: GaAvatar,
  title: 'Molecules/Avatar',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['extra-small', 'small', 'medium', 'large'],
      description: 'Size of the avatar',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the avatar is clickable',
    },
    statusInteractive: {
      control: 'boolean',
      description: 'Whether the status is clickable',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the avatar is disabled',
    },
  },
} satisfies Meta<typeof GaAvatar>

export default meta
type Story = StoryObj<typeof GaAvatar>

export const Default: Story = { args: { content: 'AV' } }

export const WithFallback: Story = {
  render: () => ({
    components: { GaAvatar },
    template: `<ga-avatar image="https://invalid-url.com/image.jpg" content="AV" alt="Avatar with fallback" />`,
  }),
}

export const SizeVariations: Story = {
  render: () => ({
    components: { GaAvatar },
    setup: () => ({ User }),
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="width: 120px; font-weight: bold;">Content:</span>

          <ga-avatar size="extra-small" content="XS" />
          <ga-avatar size="small" content="SM" />
          <ga-avatar size="medium" content="MD" />
          <ga-avatar size="large" content="LG" />
        </div>

        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="width: 120px; font-weight: bold;">Icons:</span>

          <ga-avatar size="extra-small" :icon="User" alt="User icon" />
          <ga-avatar size="small" :icon="User" alt="User icon" />
          <ga-avatar size="medium" :icon="User" alt="User icon" />
          <ga-avatar size="large" :icon="User" alt="User icon" />
        </div>

        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="width: 120px; font-weight: bold;">Images:</span>

          <ga-avatar size="extra-small" image="https://i.pravatar.cc/100?img=3" alt="Avatar image" />
          <ga-avatar size="small" image="https://i.pravatar.cc/100?img=8" alt="Avatar image" />
          <ga-avatar size="medium" image="https://i.pravatar.cc/100?img=12" alt="Avatar image" />
          <ga-avatar size="large" image="https://i.pravatar.cc/100?img=20" alt="Avatar image" />
        </div>
      </div>
    `,
  }),
}

export const InteractivityStates: Story = {
  render: () => ({
    components: { GaAvatar },
    setup() {
      return {
        User,
        handleClick: () => alert('Avatar clicked!'),
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="width: 120px; font-weight: bold;">Normal:</span>

          <ga-avatar content="AV" alt="Avatar" />
          <ga-avatar :icon="User" alt="User" />
          <ga-avatar image="https://i.pravatar.cc/100?img=11" alt="Avatar image" />
        </div>

        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="width: 120px; font-weight: bold;">Interactive:</span>

          <ga-avatar content="AV" interactive alt="Avatar" @click="handleClick" />
          <ga-avatar :icon="User" interactive alt="User" @click="handleClick" />
          <ga-avatar image="https://i.pravatar.cc/100?img=22" interactive alt="Avatar image" @click="handleClick" />
        </div>

        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="width: 120px; font-weight: bold;">Disabled:</span>

          <ga-avatar content="AV" interactive disabled alt="Avatar" />
          <ga-avatar :icon="User" interactive disabled alt="User" />
          <ga-avatar image="https://i.pravatar.cc/100?img=33" interactive disabled alt="Avatar image" />
        </div>
      </div>
    `,
  }),
}

export const StatusVariations: Story = {
  render: () => ({
    components: { GaAvatar, GaBadge },
    setup() {
      const handleStatusClick = () => alert('Status clicked!')
      const handleClick = () => alert('Avatar clicked!')

      return {
        User,
        AlertCircle,
        PlusCircle,
        Mail,
        CheckCircle,
        handleStatusClick,
        handleClick,
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="width: 180px; font-weight: bold;">Interactive Status:</span>

          <ga-avatar content="AV" :statusIcon="AlertCircle" statusInteractive @statusClick="handleStatusClick" />
          <ga-avatar :icon="User" :statusIcon="PlusCircle" statusInteractive @statusClick="handleStatusClick" />
          <ga-avatar image="https://i.pravatar.cc/100?img=7" :statusIcon="Mail" statusInteractive @statusClick="handleStatusClick" />
        </div>

        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="width: 180px; font-weight: bold;">Both Interactive:</span>

          <ga-avatar content="AV" interactive :statusIcon="AlertCircle" statusInteractive @click="handleClick" @statusClick="handleStatusClick" />
          <ga-avatar :icon="User" interactive :statusIcon="PlusCircle" statusInteractive @click="handleClick" @statusClick="handleStatusClick" />
          <ga-avatar image="https://i.pravatar.cc/100?img=18" interactive :statusIcon="Mail" statusInteractive @click="handleClick" @statusClick="handleStatusClick" />
        </div>

        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="width: 180px; font-weight: bold;">Non-interactive Status:</span>

          <ga-avatar content="AV" :statusIcon="CheckCircle" />
          <ga-avatar :icon="User" :statusIcon="CheckCircle" />
          <ga-avatar image="https://i.pravatar.cc/100?img=15" :statusIcon="CheckCircle" />
        </div>

        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="width: 180px; font-weight: bold;">Disabled Status:</span>

          <ga-avatar content="AV" :statusIcon="AlertCircle" statusInteractive disabled />
          <ga-avatar :icon="User" :statusIcon="PlusCircle" statusInteractive disabled />
          <ga-avatar image="https://i.pravatar.cc/100?img=25" :statusIcon="Mail" statusInteractive disabled />
        </div>

        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="width: 180px; font-weight: bold;">Custom Status Content:</span>

          <ga-avatar content="AV">
            <template #status>
              <span style="font-size: 9px; font-weight: bold;">99+</span>
            </template>
          </ga-avatar>
          <ga-avatar :icon="User">
            <template #status><ga-badge success /></template>
          </ga-avatar>
          <ga-avatar image="https://i.pravatar.cc/100?img=30">
            <template #status>
              <span style="font-size: 9px; color: #f44336;">5</span>
            </template>
          </ga-avatar>
        </div>

        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="width: 180px; font-weight: bold;">Size Variations:</span>

          <ga-avatar size="small" content="S" :statusIcon="PlusCircle" statusInteractive @statusClick="handleStatusClick" />
          <ga-avatar size="medium" content="M" :statusIcon="PlusCircle" statusInteractive @statusClick="handleStatusClick" />
          <ga-avatar size="large" content="L" :statusIcon="PlusCircle" statusInteractive @statusClick="handleStatusClick" />
        </div>
      </div>
    `,
  }),
}

// Comprehensive showcase with real-world examples
export const UseCaseExamples: Story = {
  render: () => ({
    components: { GaAvatar },
    setup() {
      return {
        User,
        UserPlus,
        CheckCircle,
        handleClick: () => alert('Avatar clicked!'),
        handleStatusClick: () => alert('Status clicked!'),
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div style="border: 1px solid #eee; border-radius: 8px; padding: 16px;">
          <h3 style="margin-top: 0; margin-bottom: 16px;">Message Conversation</h3>
          <div style="display: flex; align-items: center; gap: 12px;">
            <ga-avatar
              image="https://i.pravatar.cc/100?img=36"
              interactive
              alt="Jane Smith"
              @click="handleClick"
            >
              <template #status>
                <div style="width: 8px; height: 8px; background-color: #44b700; border-radius: 50%;"></div>
              </template>
            </ga-avatar>
            <div>
              <div style="font-weight: bold;">Jane Smith</div>
              <div style="font-size: 0.9em; color: #666;">Online</div>
            </div>
          </div>
        </div>

        <div style="border: 1px solid #eee; border-radius: 8px; padding: 16px;">
          <h3 style="margin-top: 0; margin-bottom: 16px;">Team Members</h3>
          <div style="display: flex; align-items: center; gap: 12px; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <ga-avatar content="JS" size="small" alt="John Smith" />
              <ga-avatar content="AM" size="small" alt="Alice Miller" />
              <ga-avatar content="RJ" size="small" alt="Robert Johnson" />
              <ga-avatar content="EW" size="small" alt="Emma Wilson" />
            </div>
            <ga-avatar
              :icon="UserPlus"
              size="small"
              interactive
              alt="Add team member"
              @click="handleClick"
            />
          </div>
        </div>

        <div style="border: 1px solid #eee; border-radius: 8px; padding: 16px;">
          <h3 style="margin-top: 0; margin-bottom: 16px;">Notification Center</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <ga-avatar
                image="https://i.pravatar.cc/100?img=42"
                size="small"
                :statusIcon="Mail"
                statusInteractive
                alt="New message from Tom"
                @statusClick="handleStatusClick"
              />
              <div>Tom Wright sent you a message</div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <ga-avatar
                :icon="User"
                size="small"
                :statusIcon="AlertCircle"
                statusInteractive
                alt="Friend request"
                @statusClick="handleStatusClick"
              />
              <div>New friend request</div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
