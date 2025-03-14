import type { Meta, StoryObj } from '@storybook/vue3'
import GaButton from '@/core/components/GaButton.vue'

const meta = {
  component: GaButton,
  title: 'Core/GaButton',
  tags: ['autodocs'],
} satisfies Meta<typeof GaButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { default: 'Button' } }
export const Primary: Story = { args: { default: 'Button', primary: true } }
export const Transparent: Story = { args: { default: 'Button', transparent: true } }

export const Icon: Story = { args: { default: '✅', icon: true } }
export const IconPrimary: Story = { args: { default: '❌', icon: true, primary: true } }
export const IconTransparent: Story = { args: { default: '🎁', icon: true, transparent: true } }

export const Disabled: Story = {
  args: { default: 'Disabled', disabled: true } as Partial<typeof Default.args>,
}
