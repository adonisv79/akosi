import { StoryObj, Meta } from '@storybook/react';
import { HTMLInput } from '../../../src/_components/core/html/html-input/html-input';

const meta: Meta<typeof HTMLInput> = {
  title: 'Core/HTML/Input',
  component: HTMLInput,
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
    autoComplete: 'off',
    type: 'text',
    className: 'border text-white bg-black',
    placeholder: 'Enter text here',
  },
};
