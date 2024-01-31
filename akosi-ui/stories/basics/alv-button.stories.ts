import { ALVButton } from '../../app/_components/basic/alv-button';
import { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof ALVButton> = {
  title: 'Basics/ALV Basic Button',
  component: ALVButton,
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

export const Small: Story = {
  args: {
    id: 'storybook-small-button',
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    id: 'storybook-large-button',
    size: 'lg',
    children: 'Large Button',
  },
};

export const Dark: Story = {
  args: {
    id: 'storybook-dark-button',
    theme: 'dark',
    children: 'Dark Button',
  },
};
