import { AkosiLoginDialog } from '../app/_components/sections/akosi-login-dialog';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AkosiLoginDialog> = {
  title: 'Akosi/ALV Login Dialog',
  component: AkosiLoginDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    dialogHeaderText: 'Kumusta po!',
    usernameHeaderText: 'Username mo',
    passwordHeaderText: 'Password mo',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
