import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ChartSpline, LayoutList, MonitorIcon, SmartphoneIcon, TableIcon } from 'lucide-vue-next'

import GaButtonGroup from './GaButtonGroup.vue'
import GaGroupButton from './GaGroupButton.vue'
import { ref } from 'vue'

const meta = {
  component: GaButtonGroup,
  title: 'Molecules/Button Group',
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div
          :style="{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--ga-size-spacing-04)',
            padding: 'var(--ga-size-spacing-05)',
            background: 'repeating-linear-gradient(45deg, #eee 0px, #eee 10px, #fff 10px, #fff 20px)'
          }"
        >
          <story />
        </div>
      `,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: {
      GaButtonGroup,
      GaGroupButton,
      ChartSpline,
      LayoutList,
      MonitorIcon,
      SmartphoneIcon,
      TableIcon,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-06); align-items: start;">
        <ga-button-group modelValue="all">
          <ga-group-button value="all">All tasks</ga-group-button>
          <ga-group-button value="mine">My tasks</ga-group-button>
          <ga-group-button value="high">High priority</ga-group-button>
          <ga-group-button value="critical">Critical</ga-group-button>
        </ga-button-group>

        <ga-button-group modelValue="all">
          <ga-group-button value="all">All</ga-group-button>
          <ga-group-button value="read">Read</ga-group-button>
          <ga-group-button value="unread">Unread</ga-group-button>
        </ga-button-group>

        <ga-button-group modelValue="recent">
          <ga-group-button value="recent">Recent</ga-group-button>
          <ga-group-button value="recommended">Recommended</ga-group-button>
        </ga-button-group>

        <ga-button-group modelValue="table">
          <ga-group-button value="table">Table view</ga-group-button>
          <ga-group-button value="grid">Grid view</ga-group-button>
        </ga-button-group>

        <ga-button-group modelValue="table">
          <ga-group-button icon value="table"><table-icon /></ga-group-button>
          <ga-group-button icon value="list"><layout-list /></ga-group-button>
          <ga-group-button icon value="chart"><chart-spline /></ga-group-button>
        </ga-button-group>

        <ga-button-group modelValue="pc">
          <ga-group-button icon value="pc"><monitor-icon /></ga-group-button>
          <ga-group-button icon value="phone"><smartphone-icon /></ga-group-button>
        </ga-button-group>

        <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-03); align-items: start; background-color: var(--ga-color-surface-page); padding: 24px;">
          <ga-button-group modelValue="all">
            <ga-group-button value="all">All tasks</ga-group-button>
            <ga-group-button value="mine">My tasks</ga-group-button>
            <ga-group-button value="high">High priority</ga-group-button>
            <ga-group-button value="critical">Critical</ga-group-button>
          </ga-button-group>

          <ga-button-group modelValue="all">
            <ga-group-button value="all">All</ga-group-button>
            <ga-group-button value="read">Read</ga-group-button>
            <ga-group-button value="unread">Unread</ga-group-button>
          </ga-button-group>

          <ga-button-group modelValue="recent">
            <ga-group-button value="recent">Recent</ga-group-button>
            <ga-group-button value="recommended">Recommended</ga-group-button>
          </ga-button-group>

          <ga-button-group modelValue="table">
            <ga-group-button value="table">Table view</ga-group-button>
            <ga-group-button value="grid">Grid view</ga-group-button>
          </ga-button-group>

          <ga-button-group modelValue="table">
            <ga-group-button icon value="table"><table-icon /></ga-group-button>
            <ga-group-button icon value="list"><layout-list /></ga-group-button>
            <ga-group-button icon value="chart"><chart-spline /></ga-group-button>
          </ga-button-group>

          <ga-button-group modelValue="pc">
            <ga-group-button icon value="pc"><monitor-icon /></ga-group-button>
            <ga-group-button icon value="phone"><smartphone-icon /></ga-group-button>
          </ga-button-group>
        </div>
      </div>
    `,
  }),
}

export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaButtonGroup, GaGroupButton },
    setup() {
      const selected = ref('2')
      return { selected }
    },
    template: `
      <ga-button-group v-model="selected">
        <ga-group-button value="1">Option 1</ga-group-button>
        <ga-group-button value="2">Option 2</ga-group-button>
        <ga-group-button value="3" disabled>Option 3</ga-group-button>
        <ga-group-button value="4">Option 4</ga-group-button>
      </ga-button-group>
    `,
  }),
}
