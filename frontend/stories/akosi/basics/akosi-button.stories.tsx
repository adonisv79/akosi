import { Meta, StoryObj } from "@storybook/react";
import { AkosiButton } from "../../../src/_components/akosi/common/akosi-button";

const meta: Meta<typeof AkosiButton> = {
  title: "Akosi/Basics/Button",
  component: AkosiButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    borderRounding: "full",
    children: "Click me!",
    theme: "primary",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "storybook-akosi-button-default",
  },
};
