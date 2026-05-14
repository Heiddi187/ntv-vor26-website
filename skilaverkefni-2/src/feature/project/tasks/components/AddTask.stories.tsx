import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import AddTask from "./AddTask";

const meta = {
   title: "Tasks/AddTask",
   component: AddTask,
} satisfies Meta<typeof AddTask>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
   args: {
      onOpen: fn(),
   },
};