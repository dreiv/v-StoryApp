import type { Meta, StoryObj } from '@storybook/vue3-vite'
import GaAvatarGroup from './GaAvatarGroup.vue'
import GaAvatar from '../ga-avatar/GaAvatar.vue'
import { User } from 'lucide-vue-next'

const meta = {
  component: GaAvatarGroup,
  title: 'Molecules/AvatarGroup 🚧',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['extra-small', 'small', 'medium', 'large'],
      description: 'Size of all avatars in the group',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    overlap: {
      control: 'number',
      description: 'Amount of overlap between avatars (in pixels)',
    },
    max: {
      control: 'number',
      description: 'Maximum number of avatars to display',
    },
    overflowLabel: {
      control: 'text',
      description: 'Text for the excess avatar count',
    },
  },
} satisfies Meta<typeof GaAvatarGroup>

export default meta
type Story = StoryObj<typeof GaAvatarGroup>

// Helper function to generate avatar items
const generateAvatars = (count: number, type: 'image' | 'content' | 'icon' = 'image') => {
  return Array.from({ length: count })
    .map((_, index) => {
      if (type === 'image') {
        return `<ga-avatar image="https://i.pravatar.cc/100?img=${index + 1}" alt="Avatar ${index + 1}" />`
      } else if (type === 'content') {
        // Generate initials from random letters
        const initials =
          String.fromCharCode(65 + (index % 26)) + String.fromCharCode(65 + ((index + 1) % 26))
        return `<ga-avatar content="${initials}" />`
      } else {
        return `<ga-avatar :icon="User" />`
      }
    })
    .join('\n      ')
}

// Small Avatar Group
export const SmallAvatarGroup: Story = {
  render: () => ({
    components: { GaAvatarGroup, GaAvatar },
    setup() {
      return { User }
    },
    template: `
    <div>
      <h3>Small Avatars with Images (8 items)</h3>
      <ga-avatar-group size="small" :overlap="10">
      ${generateAvatars(8)}
      </ga-avatar-group>

      <h3 style="margin-top: 24px">Small Avatars with Content (8 items)</h3>
      <ga-avatar-group size="small" :overlap="10">
      ${generateAvatars(8, 'content')}
      </ga-avatar-group>

      <h3 style="margin-top: 24px">Small Avatars with Icons (8 items)</h3>
      <ga-avatar-group size="small" :overlap="10">
      ${generateAvatars(8, 'icon')}
      </ga-avatar-group>
    </div>
    `,
  }),
}

// Medium Avatar Group
export const MediumAvatarGroup: Story = {
  render: () => ({
    components: { GaAvatarGroup, GaAvatar },
    setup() {
      return { User }
    },
    template: `
    <div>
      <h3>Medium Avatars with Images (8 items)</h3>
      <ga-avatar-group size="medium">
      ${generateAvatars(8)}
      </ga-avatar-group>

      <h3 style="margin-top: 24px">Medium Avatars with Content (8 items)</h3>
      <ga-avatar-group size="medium">
      ${generateAvatars(8, 'content')}
      </ga-avatar-group>

      <h3 style="margin-top: 24px">Medium Avatars with Icons (8 items)</h3>
      <ga-avatar-group size="medium">
      ${generateAvatars(8, 'icon')}
      </ga-avatar-group>
    </div>
    `,
  }),
}

// Large Avatar Group
export const LargeAvatarGroup: Story = {
  render: () => ({
    components: { GaAvatarGroup, GaAvatar },
    setup() {
      return { User }
    },
    template: `
    <div>
      <h3>Large Avatars with Images (8 items)</h3>
      <ga-avatar-group size="large" :overlap="24">
      ${generateAvatars(8)}
      </ga-avatar-group>

      <h3 style="margin-top: 36px">Large Avatars with Content (8 items)</h3>
      <ga-avatar-group size="large" :overlap="24">
      ${generateAvatars(8, 'content')}
      </ga-avatar-group>

      <h3 style="margin-top: 36px">Large Avatars with Icons (8 items)</h3>
      <ga-avatar-group size="large" :overlap="24">
      ${generateAvatars(8, 'icon')}
      </ga-avatar-group>
    </div>
    `,
  }),
}

// With Overflow Label
export const WithOverflowLabel: Story = {
  render: () => ({
    components: { GaAvatarGroup, GaAvatar },
    setup() {
      return { User }
    },
    template: `
    <div>
      <h3>With Overflow Label</h3>
      <ga-avatar-group size="medium" overflowLabel="+3">
      ${generateAvatars(5)}
      </ga-avatar-group>

      <h3 style="margin-top: 24px">With Different Overlap</h3>
      <ga-avatar-group size="medium" overflowLabel="+5" :overlap="8">
      ${generateAvatars(5)}
      </ga-avatar-group>

      <h3 style="margin-top: 24px">Small Size with Overflow</h3>
      <ga-avatar-group size="small" overflowLabel="+7">
      ${generateAvatars(5)}
      </ga-avatar-group>

      <h3 style="margin-top: 24px">Large Size with Overflow</h3>
      <ga-avatar-group size="large" overflowLabel="+2">
      ${generateAvatars(5)}
      </ga-avatar-group>
    </div>
    `,
  }),
}

// Interactive Example
export const InteractiveExample: Story = {
  render: () => ({
    components: { GaAvatarGroup, GaAvatar },
    setup() {
      return {
        User,
        handleClick: (name: string) => alert(`Clicked on ${name}!`),
      }
    },
    template: `
    <div>
      <h3>Interactive Avatars</h3>
      <ga-avatar-group size="medium">
        <ga-avatar
          v-for="i in 8"
          :key="i"
          :image="'https://i.pravatar.cc/100?img=' + i"
          :alt="'User ' + i"
          interactive
          @click="() => handleClick('User ' + i)"
        />
      </ga-avatar-group>
    </div>
    `,
  }),
}

// Mixed Example (Real-world use case)
export const MixedExample: Story = {
  render: () => ({
    components: { GaAvatarGroup, GaAvatar },
    setup() {
      const users = [
        { type: 'image', src: 'https://i.pravatar.cc/100?img=1', alt: 'Team Lead' },
        { type: 'image', src: 'https://i.pravatar.cc/100?img=2', alt: 'Designer' },
        { type: 'content', text: 'JD', title: 'John Doe' },
        { type: 'content', text: 'AS', title: 'Alice Smith' },
        { type: 'icon', title: 'Anonymous User' },
      ]

      return { User, users }
    },
    template: `
    <div>
      <h3>Real-world Team Example</h3>
      <p>Hover over avatars to see elevation effect</p>

      <ga-avatar-group size="medium" overflowLabel="+3">
        <!-- Image Avatars -->
        <ga-avatar
          v-for="(user, i) in users.filter(u => u.type === 'image')"
          :key="'img-' + i"
          :image="user.src"
          :alt="user.alt"
          interactive
        />

        <!-- Text Avatars -->
        <ga-avatar
          v-for="(user, i) in users.filter(u => u.type === 'content')"
          :key="'txt-' + i"
          :content="user.text"
          interactive
        />

        <!-- Icon Avatars -->
        <ga-avatar
          v-for="(user, i) in users.filter(u => u.type === 'icon')"
          :key="'icon-' + i"
          :icon="User"
          interactive
        />
      </ga-avatar-group>

      <h3 style="margin-top: 24px">Different Sizes in Same Example</h3>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <ga-avatar-group size="small" overflowLabel="+3">
          <ga-avatar v-for="(user, i) in users.slice(0, 3)" :key="i"
            :image="user.type === 'image' ? user.src : undefined"
            :content="user.type === 'content' ? user.text : undefined"
            :icon="user.type === 'icon' ? User : undefined"
            interactive
          />
        </ga-avatar-group>

        <ga-avatar-group size="medium" overflowLabel="+3">
          <ga-avatar v-for="(user, i) in users.slice(0, 3)" :key="i"
            :image="user.type === 'image' ? user.src : undefined"
            :content="user.type === 'content' ? user.text : undefined"
            :icon="user.type === 'icon' ? User : undefined"
            interactive
          />
        </ga-avatar-group>

        <ga-avatar-group size="large" overflowLabel="+3">
          <ga-avatar v-for="(user, i) in users.slice(0, 3)" :key="i"
            :image="user.type === 'image' ? user.src : undefined"
            :content="user.type === 'content' ? user.text : undefined"
            :icon="user.type === 'icon' ? User : undefined"
            interactive
          />
        </ga-avatar-group>
      </div>
    </div>
    `,
  }),
}
