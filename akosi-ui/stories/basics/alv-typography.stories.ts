import { ALVTypography } from '../../app/_components/core/alv-typography';
import { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof ALVTypography> = {
  title: 'Basics/ALV Basic Typography',
  component: ALVTypography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    italic: false,
    type: 'p'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Dark: Story = {
  args: {
    children: 'Dark Button',
    theme: 'dark',
    size: 'lg',
  },
};

export const DarkBold: Story = {
  args: {
    children: 'Dark Button',
    theme: 'dark',
    size: 'lg',
    weight: 'bold',
  },
};

export const DarkBoldItalic: Story = {
  args: {
    children: 'Dark Button',
    theme: 'dark',
    size: 'lg',
    weight: 'semibold',
    italic: true,
  },
};
