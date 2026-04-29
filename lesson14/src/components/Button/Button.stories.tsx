import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

// ✅ BASIC
export const Default: Story = {
  args: {
    label: "Click me",
  },
};

export const Primary: Story = {
  args: {
    label: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Button",
    variant: "secondary",
  },
};

// ✅ STATES
export const Disabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
  },
};

export const DisabledSecondary: Story = {
  args: {
    label: "Disabled Secondary",
    variant: "secondary",
    disabled: true,
  },
};

// ✅ TEXT VARIATIONS
export const LongText: Story = {
  args: {
    label: "This is a very long button label to test layout",
  },
};

export const ShortText: Story = {
  args: {
    label: "Go",
  },
};

// ✅ CLICK HANDLING
export const WithClick: Story = {
  args: {
    label: "Click me",
    onClick: () => alert("Clicked!"),
  },
};

// ✅ EDGE CASES
export const EmptyLabel: Story = {
  args: {
    label: "",
  },
};

export const NoOnClick: Story = {
  args: {
    label: "No action",
  },
};

// ✅ VISUAL VARIANTS
export const PrimaryDisabled: Story = {
  args: {
    label: "Primary Disabled",
    variant: "primary",
    disabled: true,
  },
};

export const SecondaryActive: Story = {
  args: {
    label: "Secondary Active",
    variant: "secondary",
  },
};

// ✅ COMBINATIONS
export const LongSecondary: Story = {
  args: {
    label: "Long Secondary Button Example",
    variant: "secondary",
  },
};

export const ClickableSecondary: Story = {
  args: {
    label: "Click Secondary",
    variant: "secondary",
    onClick: () => console.log("Secondary clicked"),
  },
};

export const Minimal: Story = {
  args: {
    label: "Ok",
  },
};