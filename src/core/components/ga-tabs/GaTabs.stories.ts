import type { ConcreteComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { Home, Settings, User, Mail, Bell, FileText } from 'lucide-vue-next'

import GaTabs from './GaTabs.vue'
import GaTab from './GaTab.vue'

const meta = {
  component: GaTabs as unknown as ConcreteComponent,
  title: 'Molecules/Tabs',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="display: flex; flex-direction: column; width: 100%; max-width: 900px;"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaTabs>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Example of tabs with basic usage.
 * The tabs component manages the active tab state and renders the appropriate content.
 */
export const Basic: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTabs },
    data() {
      return {
        tabs: [
          { id: 'tab1', label: 'Home' },
          { id: 'tab2', label: 'Profile' },
          { id: 'tab3', label: 'Settings' },
        ],
        activeTab: 'tab1',
      }
    },
    template: `
      <ga-tabs :tabs="tabs" v-model="activeTab">
        <div v-if="activeTab === 'tab1'">Home content</div>
        <div v-if="activeTab === 'tab2'">Profile content</div>
        <div v-if="activeTab === 'tab3'">Settings content</div>
      </ga-tabs>
    `,
  }),
}

/**
 * Example of tabs with array props usage.
 * The tabs can be defined as an array of objects.
 */
export const UsingArrayProps: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTabs },
    data() {
      return {
        tabs: [
          { id: 'tab1', label: 'Home' },
          { id: 'tab2', label: 'Profile' },
          { id: 'tab3', label: 'Settings' },
          { id: 'tab4', label: 'Messages', disabled: true },
        ],
        activeTab: 'tab1',
      }
    },
    template: `
      <ga-tabs :tabs="tabs" v-model="activeTab">
        <div v-if="activeTab === 'tab1'">Home content</div>
        <div v-if="activeTab === 'tab2'">Profile content</div>
        <div v-if="activeTab === 'tab3'">Settings content</div>
        <div v-if="activeTab === 'tab4'">Messages content</div>
      </ga-tabs>
    `,
  }),
}

/**
 * Example with icons in tabs
 */
export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTabs },
    setup() {
      return { Home, User, Settings, Mail, Bell }
    },
    data() {
      return {
        tabs: [
          { id: 'tab1', label: 'Home', icon: Home },
          { id: 'tab2', label: 'Profile', icon: User },
          { id: 'tab3', label: 'Settings', icon: Settings },
          { id: 'tab4', label: 'Messages', icon: Mail },
          { id: 'tab5', label: 'Notifications', icon: Bell, disabled: true },
        ],
        activeTab: 'tab1',
      }
    },
    template: `
      <ga-tabs :tabs="tabs" v-model="activeTab">
        <div v-if="activeTab === 'tab1'">Home content</div>
        <div v-if="activeTab === 'tab2'">Profile content</div>
        <div v-if="activeTab === 'tab3'">Settings content</div>
        <div v-if="activeTab === 'tab4'">Messages content</div>
        <div v-if="activeTab === 'tab5'">Notifications content</div>
      </ga-tabs>
    `,
  }),
}

/**
 * Example with many tabs to demonstrate the overflow behavior
 */
export const WithOverflow: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTabs },
    data() {
      return {
        tabs: [
          { id: 'tab1', label: 'Home' },
          { id: 'tab2', label: 'Profile' },
          { id: 'tab3', label: 'Settings' },
          { id: 'tab4', label: 'Messages' },
          { id: 'tab5', label: 'Notifications' },
          { id: 'tab6', label: 'Dashboard' },
          { id: 'tab7', label: 'Analytics' },
          { id: 'tab8', label: 'Reports' },
          { id: 'tab9', label: 'Documents' },
          { id: 'tab10', label: 'Archive' },
        ],
        activeTab: 'tab1',
      }
    },
    template: `
      <div>
        <p>Resize the browser to see overflow behavior</p>
        <ga-tabs :tabs="tabs" v-model="activeTab">
          <div v-if="activeTab === 'tab1'">Home content</div>
          <div v-if="activeTab === 'tab2'">Profile content</div>
          <div v-if="activeTab === 'tab3'">Settings content</div>
          <div v-if="activeTab === 'tab4'">Messages content</div>
          <div v-if="activeTab === 'tab5'">Notifications content</div>
          <div v-if="activeTab === 'tab6'">Dashboard content</div>
          <div v-if="activeTab === 'tab7'">Analytics content</div>
          <div v-if="activeTab === 'tab8'">Reports content</div>
          <div v-if="activeTab === 'tab9'">Documents content</div>
          <div v-if="activeTab === 'tab10'">Archive content</div>
        </ga-tabs>
      </div>
    `,
  }),
}

/**
 * Example with different alignment options
 */
export const Alignment: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTabs },
    setup() {
      return { Home, User, Settings }
    },
    data() {
      return {
        tabs: [
          { id: 'tab1', label: 'Left', icon: Home },
          { id: 'tab2', label: 'Center', icon: User },
          { id: 'tab3', label: 'Right', icon: Settings },
        ],
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin-bottom: 8px;">Default (start)</h4>
          <ga-tabs :tabs="tabs" align="start" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px;">Center</h4>
          <ga-tabs :tabs="tabs" align="center" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px;">End</h4>
          <ga-tabs :tabs="tabs" align="end" />
        </div>
      </div>
    `,
  }),
}

/**
 * Example with router integration (mock)
 * In a real application, this would use actual router-link components
 */
export const RouterExample: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTabs },
    setup() {
      return { FileText }
    },
    data() {
      return {
        tabs: [
          { id: 'tab1', label: 'Home', to: '/home' },
          { id: 'tab2', label: 'About', to: '/about' },
          { id: 'tab3', label: 'Contact', to: '/contact' },
          { id: 'tab4', label: 'Documentation', to: '/docs', icon: FileText },
        ],
      }
    },
    template: `
      <div>
        <p>This example shows how tabs would work with router integration</p>
        <ga-tabs :tabs="tabs" useRouterLinks>
          <div style="padding: 16px; background-color: #f5f5f5; border-radius: 4px;">
            <p>Router view would render here based on the current route</p>
            <p>In an actual application, you would use &lt;router-view&gt;</p>
          </div>
        </ga-tabs>
      </div>
    `,
  }),
}

/**
 * Example of tabs using GaTab components as children.
 * This approach gives more flexibility for customizing individual tabs.
 */
export const WithGaTabComponents: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTabs, GaTab },
    setup: () => ({ Home, User, Settings }),
    data: () => ({ activeTab: 'tab1' }),
    template: `
      <div>
        <p>This example shows how to use GaTab components as children of GaTabs</p>
        <ga-tabs v-model="activeTab">
          <template #tabs>
            <ga-tab id="tab1" label="Home" :icon="Home"></ga-tab>
            <ga-tab id="tab2" label="Profile" :icon="User"></ga-tab>
            <ga-tab id="tab3" label="Settings" :icon="Settings"></ga-tab>
          </template>

          <div v-if="activeTab === 'tab1'">
            <h3>Home Content</h3>
            <p>This is the content for the Home tab.</p>
          </div>
          <div v-if="activeTab === 'tab2'">
            <h3>Profile Content</h3>
            <p>This is the content for the Profile tab.</p>
          </div>
          <div v-if="activeTab === 'tab3'">
            <h3>Settings Content</h3>
            <p>This is the content for the Settings tab.</p>
          </div>
        </ga-tabs>
      </div>
    `,
  }),
}
