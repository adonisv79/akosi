import { StoryObj, Meta } from "@storybook/react";
import { HTMLSelect } from "../../../_components/core/html/html-select/html-select";

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
          label: "Asia",
          options: [
            { text: "Philippines", value: "ph" },
            { text: "Japan", value: "jp" },
            { text: "China", value: "zh" },
          ],
        },
        {
          label: "Europe",
          options: [
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
