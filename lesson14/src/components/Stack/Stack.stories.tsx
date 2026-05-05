import type { Meta, StoryObj } from "@storybook/react-vite";

import Stack from "./Stack";

const meta = {
   title: "Components/Stack",
   component: Stack,
   // tags býr til docs í storybook
   tags: ['autodocs'],
   argTypes: {
    orientation: {
        control: {type: 'select'},
        options: ['horizontal', 'vertical']
    },
    count: {
        control: {type: 'number'}
    }
   }
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
   args: {
      orientation: 'horizontal',
      count: 3
   },
};

export const Vertical: Story = {
   args: {
      orientation: 'vertical',
      count: 3
   },
};

