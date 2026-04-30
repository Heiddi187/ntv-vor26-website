import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./2ndButton";

const meta = {
   title: "Components/2ndButton",
   component: Button,

   args: {
      children: "Click here",
      variant: "primary",
      size: "md",
   },

   argTypes: {
      variant: {
         control: "select",
         options: ["primary", "secondary"],
      },
      size: {
         control: "radio",
         options: ["sm", "md", "lg"],
      },
      onClick: {
         action: "clicked",
      },
   },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
   args: {
      children: "Click here",
      variant: "primary",
      size: "md",
   },
};

export const Large: Story = {
   args: {
      children: "Click here",
      size: "lg",
   },
};

export const Small: Story = {
   args: {
      children: "Click here",
      variant: "primary",
      size: "sm",
   },
};

export const Secondary: Story = {
   args: {
      children: "Click here",
      variant: "secondary",
      size: "sm",
   },
};

export const LongName: Story = {
   args: {
      children: "Click here with a longer name",
      variant: "primary",
      size: "sm",
   },
};

export const Medium: Story = {
   args: {
      children: "Click here",
      variant: "primary",
      size: "md"
   }
};
