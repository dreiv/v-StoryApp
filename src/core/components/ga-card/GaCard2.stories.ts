import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ChevronRight, Settings, Star, Plus, Info } from 'lucide-vue-next'

import GaCard from './GaCard2.vue'

const meta = {
  component: GaCard,
  title: 'Molecules/Card',
  parameters: { layout: 'centered' },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="width: 400px; max-width: 100%;">
          <story />
        </div>
      `,
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed in the card.',
    },
    description: {
      control: 'text',
      description: 'The description displayed in the card.',
    },
    selectable: {
      control: 'boolean',
      description: 'Makes card selectable with a checkbox.',
    },
    disabled: {
      control: 'boolean',
      description: 'Shows the card in disabled state.',
    },
    expandable: {
      control: 'boolean',
      description: 'Shows an expandable chevron.',
    },
    expanded: {
      control: 'boolean',
      description: 'Controls whether the card is expanded (when expandable is true).',
    },
    onClick: {
      action: 'click',
      description: 'Emitted when the card is clicked',
    },
    onSelect: {
      action: 'select',
      description: 'Emitted when the card is selected via checkbox',
    },
  },
} satisfies Meta<typeof GaCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    title: 'Card Title',
    description: 'Card description text goes here.',
  },
  render: (args) => ({
    components: { GaCard },
    setup() {
      return { args }
    },
    template: `<GaCard v-bind="args" />`,
  }),
}

export const WithInteractiveIcon: Story = {
  args: {
    title: 'Card with Interactive Icon',
    description: 'This card has an interactive icon on the right side.',
  },
  render: (args) => ({
    components: { GaCard, ChevronRight },
    setup() {
      return { args }
    },
    template: `
      <GaCard v-bind="args">
        <template #interactiveIcon>
          <ChevronRight size="16" />
        </template>
      </GaCard>
    `,
  }),
}

export const Selectable: Story = {
  args: {
    title: 'Selectable Card',
    description: 'This card can be selected with a checkbox.',
    selectable: true,
  },
  render: (args) => ({
    components: { GaCard },
    setup() {
      return { args }
    },
    template: `<GaCard v-bind="args" />`,
  }),
}

export const Expandable: Story = {
  args: {
    title: 'Expandable Card',
    description: 'Click the chevron to expand this card.',
    expandable: true,
    expanded: false,
  },
  render: (args) => ({
    components: { GaCard },
    setup() {
      return { args }
    },
    template: `<GaCard v-bind="args" />`,
  }),
}

export const ExpandedWithContent: Story = {
  args: {
    title: 'Expanded Card',
    description: 'This card is already expanded with content.',
    expandable: true,
    expanded: true,
  },
  render: (args) => ({
    components: { GaCard },
    setup() {
      return { args }
    },
    template: `
      <GaCard v-bind="args">
        <template #bottomSlot>
          <div style="padding: 8px 0;">
            <p>This is the expanded content of the card.</p>
            <p>You can add any content here that should appear when the card is expanded.</p>
          </div>
        </template>
      </GaCard>
    `,
  }),
}

export const WithTopSlot: Story = {
  args: {
    title: 'Card with Top Slot',
    description: 'This card has content in the top slot.',
  },
  render: (args) => ({
    components: { GaCard, Info },
    setup() {
      return { args }
    },
    template: `
      <GaCard v-bind="args">
        <template #topSlot>
          <div style="display: flex; align-items: center; gap: 8px;">
            <Info size="16" />
            <span style="font-size: 12px;">Important information</span>
          </div>
        </template>
      </GaCard>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    title: 'Disabled Card',
    description: 'This card is in disabled state.',
    disabled: true,
  },
  render: (args) => ({
    components: { GaCard },
    setup() {
      return { args }
    },
    template: `<GaCard v-bind="args" />`,
  }),
}

export const ComplexCard: Story = {
  args: {
    title: 'Complex Card Example',
    description: 'This card shows multiple features combined.',
    expandable: true,
    expanded: true,
    selectable: true,
  },
  render: (args) => ({
    components: { GaCard, Settings },
    setup() {
      return { args }
    },
    template: `
      <GaCard v-bind="args">
        <template #interactiveIcon>
          <Settings size="16" />
        </template>
        <template #bottomSlot>
          <div style="padding: 8px 0;">
            <p>This is the expanded content with custom styling.</p>
            <div style="margin-top: 16px; display: flex; gap: 8px;">
              <button style="padding: 4px 8px; border-radius: 4px; background: var(--ga-color-blue-60); color: white; border: none;">Action 1</button>
              <button style="padding: 4px 8px; border-radius: 4px; border: 1px solid var(--ga-color-border-secondary); background: white;">Action 2</button>
            </div>
          </div>
        </template>
      </GaCard>
    `,
  }),
}

export const CustomContent: Story = {
  args: {},
  render: (args) => ({
    components: { GaCard, Star },
    setup() {
      return { args }
    },
    template: `
      <GaCard v-bind="args">
        <template #title>
          <div style="display: flex; align-items: center; gap: 4px;">
            <Star size="16" fill="gold" stroke="gold" />
            <span>Custom Title with Icon</span>
          </div>
        </template>
        <template #description>
          <div style="display: flex; align-items: center; gap: 4px; color: var(--ga-color-text-secondary);">
            <span>Custom styled description</span>
          </div>
        </template>
        <div style="margin-top: 12px; padding: 8px; background: var(--ga-color-blue-10); border-radius: 4px;">
          This is custom content in the default slot
        </div>
      </GaCard>
    `,
  }),
}

export const CardGrid: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaCard, Plus },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; width: 100%;">
        <GaCard
          title="First Card"
          description="Description for card 1."
          selectable
        />
        <GaCard
          title="Second Card"
          description="Description for card 2."
          expandable
        >
          <template #interactiveIcon>
            <Plus size="16" />
          </template>
        </GaCard>
        <GaCard
          title="Third Card"
          description="Description for card 3."
          disabled
        />
        <GaCard
          title="Fourth Card"
          description="Description for card 4."
          selectable
          expandable
          expanded
        >
          <template #bottomSlot>
            <div style="padding: 8px 0;">Expanded content</div>
          </template>
        </GaCard>
      </div>
    `,
  }),
}
