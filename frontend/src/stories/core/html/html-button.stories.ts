import { StoryObj, Meta } from '@storybook/react';
import { HTMLButton } from '../../../_components/core/html/html-button/html-button';

const meta: Meta<typeof HTMLButton> = {
  title: 'Core/HTML/Button',
  component: HTMLButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'storybook-default-button',
    children: 'Default Button',
    onClick: (e) => {
      e.preventDefault();
      console.log(
        `The user clicked Mouse button${
          e.ctrlKey ? ' while pressing CTRL' : ''
        }.`
      );
    },
  },
};
