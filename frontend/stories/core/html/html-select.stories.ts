import { StoryObj, Meta } from "@storybook/react";
import { HTMLSelect } from "../../../src/_components/core/html/html-select/html-select";

const meta: Meta<typeof HTMLSelect> = {
  title: "Core/HTML/Select",
  component: HTMLSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    config: {
      options: [
        { text: 'Unknown', value: 'x'},
        {
          groupLabel: "Asia",
          groupOptions: [
            { text: "Philippines", value: "ph" },
            { text: "Japan", value: "jp" },
            { text: "China", value: "zh" },
          ],
        },
        {
          groupLabel: "Europe",
          groupOptions: [
            { text: "France", value: "fr" },
            { text: "Germany", value: "de" },
            { text: "Spain", value: "es" },
          ],
        },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "storybook-default-select",
  },
};
