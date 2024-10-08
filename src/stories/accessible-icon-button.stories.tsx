import type { Meta, StoryObj } from '@storybook/react'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import { icons } from '@/components/common/icons'

const meta: Meta<typeof AccessibleIconButton> = {
  title: 'Components/AccessibleIconButton',
  component: AccessibleIconButton,
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(icons),
    },
    label: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof AccessibleIconButton>

export const Default: Story = {
  args: {
    icon: {
      type: 'infoCircle',
      fill: 'orange-400',
      stroke: 'yellow-100',
    },
    label: 'Heart Icon',
  },
}
