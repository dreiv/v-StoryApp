import type { FunctionalComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import {
  ChevronsUpDown,
  CircleCheck,
  CircleUserRound,
  EyeIcon,
  InfoIcon,
  OctagonAlert,
  PlusIcon,
  TriangleAlert,
  TruckIcon,
  WandSparkles,
  XIcon,
} from 'lucide-vue-next'

import GaTag, { type TagProps } from './GaTag.vue'

const meta = {
  component: GaTag,
  title: 'Molecules/Tag',
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;"><story /></div>`,
    }),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GaTag>

export default meta
type Story = StoryObj<typeof meta>

interface TagVariation {
  name: 'Default' | 'Information' | 'Error' | 'Warning' | 'Success' | 'Disabled'
  icon?: FunctionalComponent
  props: TagProps & { default?: string }
}

const variations: TagVariation[] = [
  { name: 'Default', props: { beforeIcon: PlusIcon } },
  { name: 'Information', props: { beforeIcon: InfoIcon, information: true } },
  { name: 'Error', props: { beforeIcon: OctagonAlert, error: true } },
  { name: 'Warning', props: { beforeIcon: TriangleAlert, warning: true } },
  { name: 'Success', props: { beforeIcon: CircleCheck, success: true } },
  { name: 'Disabled', props: { beforeIcon: CircleCheck, disabled: true } },
]

const createStory = (variation: TagVariation): Story => ({
  args: variation.props,
  render: (args) => ({
    components: { GaTag },
    template: `
      <ga-tag v-bind="args">
        ${args.default || variation.name}
      </ga-tag>
      <ga-tag v-bind="args" :beforeIcon="" :afterIcon="xIcon">
        ${args.default || variation.name}
      </ga-tag>

      <ga-tag v-bind="args" separator :afterIcon="xIcon">
        ${args.default || variation.name}
      </ga-tag>
    `,
    setup: () => ({ args, xIcon: XIcon }),
  }),
})

const stories: { [key: string]: Story } = {}
variations.forEach((variation) => {
  stories[variation.name] = createStory(variation)
})

export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTag, TriangleAlert },
    setup: () => {
      return {
        alert: TriangleAlert,
        check: CircleCheck,
        error: OctagonAlert,
        eye: EyeIcon,
        info: InfoIcon,
        plus: PlusIcon,
        truck: TruckIcon,
        upDown: ChevronsUpDown,
        user: CircleUserRound,
        wand: WandSparkles,
        xIcon: XIcon,
      }
    },
    template: `
    <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-06);">
      <div style="display: flex; gap: var(--ga-size-spacing-03);">
        <ga-tag :beforeIcon="plus" interactive>Add skill</ga-tag>
        <ga-tag interactive>Add skill</ga-tag>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: var(--ga-size-spacing-03);">
        <ga-tag :beforeIcon="user" interactive>Bart Simpson</ga-tag>
        <ga-tag :beforeIcon="user" :afterIcon="xIcon" interactive selected separator>Bart Simpson</ga-tag>
        <ga-tag :beforeIcon="user" interactive selected>Bart Simpson</ga-tag>
        <ga-tag interactive selected>Bart Simpson</ga-tag>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: var(--ga-size-spacing-03);">
        <ga-tag interactive>Equinor</ga-tag>
        <ga-tag interactive>Norsk Hydro asa</ga-tag>
        <ga-tag interactive selected :afterIcon="xIcon">Telenor asa</ga-tag>
        <ga-tag interactive selected separator :afterIcon="xIcon">Aker asa</ga-tag>
        <ga-tag interactive warning :beforeIcon="alert" :afterIcon="xIcon">Orkla asa</ga-tag>
        <ga-tag interactive>Aker Kværner asa</ga-tag>
        <ga-tag interactive selected separator :afterIcon="xIcon">Total E&P Norge as</ga-tag>
        <ga-tag disabled>Visma Software AS</ga-tag>
        <ga-tag interactive>ExxonMobil Exploration and Production Norway as</ga-tag>
      </div>

      <div style="display: flex; gap: var(--ga-size-spacing-03);">
        <ga-tag disabled>Fraud detection</ga-tag>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: var(--ga-size-spacing-03);">
        <ga-tag information :beforeIcon="info">Administration only</ga-tag>
        <ga-tag error :beforeIcon="error">Credit notes</ga-tag>
        <ga-tag success :beforeIcon="check">Compliance passed</ga-tag>
        <ga-tag warning :beforeIcon="alert">4-eyes approval</ga-tag>
      </div>

      <div style="display: flex; gap: var(--ga-size-spacing-03);">
        <ga-tag interactive selected disabled>Read-only</ga-tag>
        <ga-tag interactive selected disabled :beforeIcon="eye">Read-only</ga-tag>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: var(--ga-size-spacing-03);">
        <ga-tag information :beforeIcon="info">Pending approval</ga-tag>
        <ga-tag error :beforeIcon="error">Approved</ga-tag>
        <ga-tag success :beforeIcon="check">Rejected</ga-tag>
        <ga-tag warning :beforeIcon="alert">Overdue</ga-tag>
        <ga-tag utility="grey" :beforeIcon="truck" :afterIcon="upDown">Wrong address</ga-tag>
      </div>

       <div style="display: flex; flex-direction: column; align-items: start; gap: var(--ga-size-spacing-03);">
        <ga-tag utility="grey" :beforeIcon="truck">Shipment wrong address</ga-tag>
        <ga-tag utility="grey" :afterIcon="upDown">Wholesale</ga-tag>
        <ga-tag utility="grey" :beforeIcon="wand" :afterIcon="upDown">Wholesale</ga-tag>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: var(--ga-size-spacing-03);">
        <ga-tag utility="blue" separator :afterIcon="xIcon">Office supplies</ga-tag>
        <ga-tag utility="blue" separator :afterIcon="xIcon">Meals & entertainment</ga-tag>
        <ga-tag utility="blue" separator :afterIcon="xIcon">Travel & lodging</ga-tag>
        <ga-tag utility="blue" separator :afterIcon="xIcon">Employee salaries</ga-tag>
        <ga-tag utility="blue" separator :afterIcon="xIcon">Software subscriptions</ga-tag>
        <ga-tag utility="blue" separator :afterIcon="xIcon">Professional services</ga-tag>
        <ga-tag utility="blue" separator :afterIcon="xIcon">Marketing & advertising</ga-tag>
        <ga-tag utility="blue" separator :afterIcon="xIcon">Utilities</ga-tag>
        <ga-tag utility="blue" separator :afterIcon="xIcon">Equipment rental</ga-tag>
        <ga-tag utility="blue" separator :afterIcon="xIcon">Training & development</ga-tag>
      </div>
    </div>
    `,
  }),
}

export const Default: Story = stories.Default
export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTag },
    template: `
      <ga-tag interactive :beforeIcon="plus">Default</ga-tag>
      <ga-tag interactive separator :afterIcon="xIcon">With Separator</ga-tag>
      <ga-tag interactive :beforeIcon="plus" disabled>Disabled</ga-tag>
      <ga-tag interactive :beforeIcon="plus" selected>Selected</ga-tag>
      <ga-tag interactive :beforeIcon="plus" selected disabled>Selected Disabled</ga-tag>
    `,
    setup: () => ({ xIcon: XIcon, plus: PlusIcon }),
  }),
}
export const Information: Story = stories.Information
export const Error: Story = stories.Error
export const Warning: Story = stories.Warning
export const Success: Story = stories.Success
export const Disabled: Story = stories.Disabled

export const Utility: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { GaTag },
    template: `
      <ga-tag utility='grey' :beforeIcon="plus" interactive>Default</ga-tag>
      <ga-tag utility='indigo'>Indigo</ga-tag>
      <ga-tag utility='teal'>Teal</ga-tag>
      <ga-tag utility='lime'>Lime</ga-tag>
      <ga-tag utility='purple'>Purple</ga-tag>
      <ga-tag utility='pink'>Pink</ga-tag>
      <ga-tag utility='rose'>Rose</ga-tag>
      <ga-tag utility='yellow'>Yellow</ga-tag>
      <ga-tag utility='blue'>Blue</ga-tag>
      <ga-tag utility='green'>Green</ga-tag>
      <ga-tag utility='orange'>Orange</ga-tag>
      <ga-tag utility='disabled'>Disabled</ga-tag>
    `,
    setup: () => ({ plus: PlusIcon }),
  }),
}
