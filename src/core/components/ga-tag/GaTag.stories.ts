import type { FunctionalComponent } from 'vue'
import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import {
  BriefcaseIcon,
  ChevronsUpDown,
  CircleCheck,
  CircleUserRound,
  CodeIcon,
  CreditCardIcon,
  DollarSignIcon,
  EyeIcon,
  InfoIcon,
  LeafIcon,
  LightbulbIcon,
  MapPinIcon,
  MessageSquareIcon,
  MicroscopeIcon,
  OctagonAlert,
  PaletteIcon,
  PlusIcon,
  ShieldIcon,
  TagIcon,
  TicketIcon,
  TriangleAlert,
  TruckIcon,
  WandSparkles,
  XIcon,
} from 'lucide-vue-next'

import GaSelect from '../ga-select/GaSelect.vue'
import GaSelectItem from '../ga-select/GaSelectItem.vue'
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
    components: { GaTag, GaSelect, GaSelectItem },
    setup: () => {
      interface BartTag {
        id: number
        label: string
        icon?: FunctionalComponent
        selected: boolean
        separator?: boolean
        hasDelete?: boolean
      }

      const selected = ref<{ value: number; label: string }>({
        value: 1,
        label: 'Wrong address',
      })

      const bartSimpsonTags = ref<BartTag[]>([
        { id: 1, label: 'Bart Simpson', icon: CircleUserRound, selected: false },
        {
          id: 2,
          label: 'Bart Simpson',
          icon: CircleUserRound,
          selected: true,
          separator: true,
          hasDelete: true,
        },
        { id: 3, label: 'Bart Simpson', icon: CircleUserRound, selected: true },
        { id: 4, label: 'Bart Simpson', selected: false },
      ])

      const toggleSelected = (tag: BartTag) => {
        tag.selected = !tag.selected
      }

      const handleDelete = (tagId: number) => {
        const index = bartSimpsonTags.value.findIndex((tag) => tag.id === tagId)
        if (index !== -1) {
          bartSimpsonTags.value.splice(index, 1)
        }
      }

      return {
        selected,
        bartSimpsonTags,
        toggleSelected,
        handleDelete,
        alert: TriangleAlert,
        briefcase: BriefcaseIcon,
        check: CircleCheck,
        code: CodeIcon,
        creditCard: CreditCardIcon,
        dollar: DollarSignIcon,
        error: OctagonAlert,
        eye: EyeIcon,
        info: InfoIcon,
        leaf: LeafIcon,
        lightbulb: LightbulbIcon,
        mapPin: MapPinIcon,
        message: MessageSquareIcon,
        microscope: MicroscopeIcon,
        palette: PaletteIcon,
        plus: PlusIcon,
        shield: ShieldIcon,
        tag: TagIcon,
        ticket: TicketIcon,
        truck: TruckIcon,
        upDown: ChevronsUpDown,
        user: CircleUserRound,
        wand: WandSparkles,
        xIcon: XIcon,
      }
    },
    template: `
    <div style="display: flex; flex-direction: column; gap: var(--ga-size-spacing-06);">
      <fieldset style="display: flex; flex-wrap: wrap; gap: var(--ga-size-spacing-03);">
        <legend>Interactive tags with delete</legend>
        <ga-tag
          v-for="tag in bartSimpsonTags"
          :key="tag.id"
          :beforeIcon="tag.icon"
          :afterIcon="tag.hasDelete ? xIcon : undefined"
          interactive
          :selected="tag.selected"
          :separator="tag.separator"
          @click="toggleSelected(tag)"
          @onDelete="handleDelete(tag.id)"
        >{{ tag.label }}</ga-tag>
      </fieldset>

      <div style="display: flex; gap: var(--ga-size-spacing-03);">
        <ga-tag :beforeIcon="plus" interactive>Add skill</ga-tag>
        <ga-tag :beforeIcon="lightbulb" interactive>Add skill</ga-tag>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: var(--ga-size-spacing-03);">
        <ga-tag interactive :beforeIcon="briefcase">Equinor</ga-tag>
        <ga-tag interactive :beforeIcon="shield">Norsk Hydro asa</ga-tag>
        <ga-tag interactive selected :beforeIcon="message" :afterIcon="xIcon">Telenor asa</ga-tag>
        <ga-tag interactive selected separator :afterIcon="xIcon">Aker asa</ga-tag>
        <ga-tag interactive warning :beforeIcon="alert" :afterIcon="xIcon">Orkla asa</ga-tag>
        <ga-tag interactive :beforeIcon="tag">Aker Kværner asa</ga-tag>
        <ga-tag interactive selected separator :beforeIcon="dollar" :afterIcon="xIcon">Total E&P Norge as</ga-tag>
        <ga-tag disabled :beforeIcon="code">Visma Software AS</ga-tag>
        <ga-tag interactive :beforeIcon="truck">ExxonMobil Exploration and Production Norway as</ga-tag>
      </div>

      <div style="display: flex; gap: var(--ga-size-spacing-03);">
        <ga-tag disabled :beforeIcon="shield">Fraud detection</ga-tag>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: var(--ga-size-spacing-03);">
        <ga-tag information :beforeIcon="info" :afterIcon="xIcon">Administration only</ga-tag>
        <ga-tag error :beforeIcon="error" :afterIcon="xIcon">Credit notes</ga-tag>
        <ga-tag success :beforeIcon="check" :afterIcon="xIcon">Compliance passed</ga-tag>
        <ga-tag warning :beforeIcon="alert" :afterIcon="xIcon">4-eyes approval</ga-tag>
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
        <ga-select v-model="selected">
          <template #trigger="{ shown, model, label, 'ref-el': setRef, aria }">
            <ga-tag
              :ref="setRef"
              :label="model?.label || 'Wrong address'"
              :beforeIcon="truck"
              :afterIcon="upDown"
              utility="grey"
              interactive
              v-bind="aria"
            />
          </template>

          <ga-select-item :value="1" label="Wrong address" />
          <ga-select-item :value="2" label="An Item" />
          <ga-select-item :value="3" label="Another Item" />
          <ga-select-item :value="4" label="Yet another Item" />
        </ga-select>
      </div>

       <div style="display: flex; flex-direction: column; align-items: start; gap: var(--ga-size-spacing-03);">
        <ga-tag utility="grey" interactive :beforeIcon="truck">Shipment wrong address</ga-tag>
        <ga-tag utility="grey" interactive :afterIcon="upDown">Wholesale</ga-tag>
        <ga-tag utility="grey" interactive :beforeIcon="wand" :afterIcon="upDown">Wholesale</ga-tag>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: var(--ga-size-spacing-03);">
        <ga-tag utility="blue" :beforeIcon="briefcase" separator :afterIcon="xIcon">Office supplies</ga-tag>
        <ga-tag utility="blue" :beforeIcon="dollar" separator :afterIcon="xIcon">Meals & entertainment</ga-tag>
        <ga-tag utility="blue" :beforeIcon="mapPin" separator :afterIcon="xIcon">Travel & lodging</ga-tag>
        <ga-tag utility="blue" :beforeIcon="user" separator :afterIcon="xIcon">Employee salaries</ga-tag>
        <ga-tag utility="blue" :beforeIcon="code" separator :afterIcon="xIcon">Software subscriptions</ga-tag>
        <ga-tag utility="blue" :beforeIcon="shield" separator :afterIcon="xIcon">Professional services</ga-tag>
        <ga-tag utility="blue" :beforeIcon="palette" separator :afterIcon="xIcon">Marketing & advertising</ga-tag>
        <ga-tag utility="blue" :beforeIcon="lightbulb" separator :afterIcon="xIcon">Utilities</ga-tag>
        <ga-tag utility="blue" :beforeIcon="tag" separator :afterIcon="xIcon">Equipment rental</ga-tag>
        <ga-tag utility="blue" :beforeIcon="microscope" separator :afterIcon="xIcon">Training & development</ga-tag>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: var(--ga-size-spacing-03);">
        <ga-tag utility="indigo" label="Office supplies"/>
        <ga-tag utility="teal" label="Meals & entertainment"/>
        <ga-tag utility="lime" label="Travel & lodging"/>
        <ga-tag utility="purple" label="Employee salaries"/>
        <ga-tag utility="pink" label="Software subscriptions"/>
        <ga-tag utility="rose" label="Professional services"/>
        <ga-tag utility="green" label="Utilities"/>
        <ga-tag utility="yellow" label="Equipment rental"/>
        <ga-tag utility="orange" label="Training & development"/>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: var(--ga-size-spacing-03);">
        <ga-tag utility="indigo" separator :afterIcon="xIcon" label="Office supplies"/>
        <ga-tag utility="teal" separator :afterIcon="xIcon" label="Meals & entertainment"/>
        <ga-tag utility="lime" separator :afterIcon="xIcon" label="Travel & lodging"/>
        <ga-tag utility="purple" separator :afterIcon="xIcon" label="Employee salaries"/>
        <ga-tag utility="pink" separator :afterIcon="xIcon" label="Software subscriptions"/>
        <ga-tag utility="rose" separator :afterIcon="xIcon" label="Professional services"/>
        <ga-tag utility="green" separator :afterIcon="xIcon" label="Utilities"/>
        <ga-tag utility="yellow" separator :afterIcon="xIcon" label="Equipment rental"/>
        <ga-tag utility="orange" separator :afterIcon="xIcon" label="Training & development"/>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: var(--ga-size-spacing-03);">
        <ga-tag utility="indigo" :beforeIcon="briefcase" label="Office supplies"/>
        <ga-tag utility="teal" :beforeIcon="dollar" label="Meals & entertainment"/>
        <ga-tag utility="lime" :beforeIcon="mapPin" label="Travel & lodging"/>
        <ga-tag utility="purple" :beforeIcon="user" label="Employee salaries"/>
        <ga-tag utility="pink" :beforeIcon="code" label="Software subscriptions"/>
        <ga-tag utility="rose" :beforeIcon="shield" label="Professional services"/>
        <ga-tag utility="green" :beforeIcon="lightbulb" label="Utilities"/>
        <ga-tag utility="yellow" :beforeIcon="tag" label="Equipment rental"/>
        <ga-tag utility="orange" :beforeIcon="microscope" label="Training & development"/>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: var(--ga-size-spacing-03);">
        <ga-tag utility="grey" interactive label="Office supplies"/>
        <ga-tag utility="grey" interactive label="Meals & entertainment"/>
        <ga-tag utility="grey" interactive label="Travel & lodging"/>
        <ga-tag utility="grey" interactive label="Employee salaries"/>
        <ga-tag utility="grey" interactive label="Software subscriptions"/>
        <ga-tag utility="grey" interactive label="Professional services"/>
        <ga-tag utility="grey" interactive label="Utilities"/>
        <ga-tag utility="grey" interactive label="Equipment rental"/>
        <ga-tag utility="grey" interactive label="Training & development"/>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: var(--ga-size-spacing-03);">
        <ga-tag utility="grey" interactive separator :afterIcon="xIcon" label="Office supplies"/>
        <ga-tag utility="grey" interactive separator :afterIcon="xIcon" label="Meals & entertainment"/>
        <ga-tag utility="grey" interactive separator :afterIcon="xIcon" label="Travel & lodging"/>
        <ga-tag utility="grey" interactive separator :afterIcon="xIcon" label="Employee salaries"/>
        <ga-tag utility="grey" interactive separator :afterIcon="xIcon" label="Software subscriptions"/>
        <ga-tag utility="grey" interactive separator :afterIcon="xIcon" label="Professional services"/>
        <ga-tag utility="grey" interactive separator :afterIcon="xIcon" label="Utilities"/>
        <ga-tag utility="grey" interactive separator :afterIcon="xIcon" label="Equipment rental"/>
        <ga-tag utility="grey" interactive separator :afterIcon="xIcon" label="Training & development"/>
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
      <ga-tag utility='indigo' :beforeIcon="code">Indigo</ga-tag>
      <ga-tag utility='teal' :beforeIcon="microscope">Teal</ga-tag>
      <ga-tag utility='lime' :beforeIcon="leaf">Lime</ga-tag>
      <ga-tag utility='purple' :beforeIcon="briefcase">Purple</ga-tag>
      <ga-tag utility='pink' :beforeIcon="palette">Pink</ga-tag>
      <ga-tag utility='rose' :beforeIcon="ticket">Rose</ga-tag>
      <ga-tag utility='yellow' :beforeIcon="dollar">Yellow</ga-tag>
      <ga-tag utility='blue' :beforeIcon="shield">Blue</ga-tag>
      <ga-tag utility='green' :beforeIcon="tag">Green</ga-tag>
      <ga-tag utility='orange' :beforeIcon="mapPin">Orange</ga-tag>
      <ga-tag utility='disabled' :beforeIcon="creditCard">Disabled</ga-tag>
    `,
    setup: () => ({
      plus: PlusIcon,
      code: CodeIcon,
      microscope: MicroscopeIcon,
      leaf: LeafIcon,
      briefcase: BriefcaseIcon,
      palette: PaletteIcon,
      ticket: TicketIcon,
      dollar: DollarSignIcon,
      shield: ShieldIcon,
      tag: TagIcon,
      mapPin: MapPinIcon,
      creditCard: CreditCardIcon,
      lightbulb: LightbulbIcon,
      message: MessageSquareIcon,
    }),
  }),
}
