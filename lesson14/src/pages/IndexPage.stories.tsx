import type { Meta, StoryObj } from '@storybook/react-vite';

import { IndexPage } from './IndexPage';

const meta = {
  component: IndexPage,
} satisfies Meta<typeof IndexPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};