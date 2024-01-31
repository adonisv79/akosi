import { AlvInput } from '../../app/_components/basic/alv-input';
import { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof AlvInput> = {
  title: 'Basics/ALV Basic Input',
  component: AlvInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'storybook-default-input',
    type: 'text',
  },
};

export const Small: Story = {
  args: {
    id: 'storybook-small-input',
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    id: 'storybook-large-input',
    children: 'Large Button',
    size: 'lg',
  },
};

export const Dark: Story = {
  args: {
    id: 'storybook-dark-input',
    children: 'Dark Button',
    theme: 'dark',
    size: 'lg',
  },
};
