import { StoryObj, Meta } from "@storybook/react";
import { ALVTextBox } from "../../_components/core/alv/alv-textbox";

const meta: Meta<typeof ALVTextBox> = {
  title: "ALV/Basics/Textbox",
  component: ALVTextBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "alv-default-textbox",
  },
};

export const Password: Story = {
  args: {
    id: "alv-default-textbox",
    type: "password",
  },
};

export const Email: Story = {
  args: {
    id: "alv-default-textbox",
    type: "email",
  },
};
