import { AkosiButton } from '../../../app/_components/akosi/basics/akosi-button';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AkosiButton> = {
  title: 'Akosi/Basics/Button',
  component: AkosiButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    borderRounding: 'full',
    children: 'CLick me!',
    theme: 'primary'
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'storybook-akosi-button-default'
  },
};
