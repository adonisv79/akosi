import { StoryObj, Meta } from '@storybook/react';
import { HTMLTable } from '../../../_components/core/html/html-table/html-table';

const meta: Meta<typeof HTMLTable> = {
  title: 'Core/HTML/Table',
  component: HTMLTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    className: 'border',
    config: {
      caption: {
        children: 'Quarterly Sales',
        className: 'border bg-black text-white italic p-2',
      },
      header: {
        className: 'border',
        rows: [
          {
            cells: [
              { children: <></> },
              { children: <>Year 1</>, className: 'px-5 center border' },
              { children: <>Year 2</>, className: 'px-5 center border' },
              { children: <>Year 3</>, className: 'px-5 center border' },
            ],
          },
        ],
      },
      body: {
        className: 'bg-green-500 ',
        rows: [
          {
            cells: [
              { children: <b>Q1</b> },
              { children: <>$100</> },
              { children: <>$80</> },
              { children: <>$130</> },
            ],
          },
          {
            cells: [
              { children: <b>Q2</b> },
              { children: <>$120</> },
              { children: <>$90</> },
              { children: <>$140</> },
            ],
          },
          {
            cells: [
              { children: <b>Q3</b> },
              { children: <>$110</> },
              { children: <>$70</> },
              { children: <>$135</> },
            ],
          },
          {
            cells: [
              { children: <b>Q4</b> },
              { children: <>$130</> },
              { children: <>$100</> },
              { children: <>$150</> },
            ],
          },
        ],
      },
      footer: {
        className: 'bg-black text-white',
        rows: [
          {
            cells: [
              { children: <b>TOTAL</b> },
              { children: <>$460</> },
              { children: <>$340</> },
              { children: <>$550</> },
            ],
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'storybook-table-default',
  },
};
