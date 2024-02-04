import { StoryObj, Meta } from "@storybook/react";
import { AkosiTextBox } from "../../../_components/akosi/common/akosi-textbox";

const meta: Meta<typeof AkosiTextBox> = {
  title: "Akosi/Basics/Textbox",
  component: AkosiTextBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "akosi-default-textbox",
  },
};

export const Password: Story = {
  args: {
    id: "akosi-default-textbox",
    type: "password",
  },
};

export const Email: Story = {
  args: {
    id: "akosi-default-textbox",
    type: "email",
  },
};
