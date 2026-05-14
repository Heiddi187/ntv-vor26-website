import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { TaskTableSearch } from "./TaskTableSearch";

const meta = {
   title: "Tasks/TaskTableSearch",
   component: TaskTableSearch,
} satisfies Meta<typeof TaskTableSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
   args: {
      value: "",
      onChange: fn(),
   },
};

export const WithText: Story = {
   args: {
      value: "login",
      onChange: fn(),
   },
};

export const TaskSearch: Story = {
   args: {
      value: "task",
      onChange: fn(),
   }
};