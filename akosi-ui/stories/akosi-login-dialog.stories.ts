import { AkosiLoginDialog } from "../app/_components/sections/akosi-login-dialog";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AkosiLoginDialog> = {
  title: "ALV Login Dialog",
  component: AkosiLoginDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};