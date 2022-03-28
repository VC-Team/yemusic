import { HomeIcon } from '@components/atoms/Icon';
import { Story, Meta } from '@storybook/react';

import Button, { ButtonProps } from '.';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonProps> = args => <Button prefix={<HomeIcon />} suffix={<HomeIcon />} {...args} />;

export const Preview = Template.bind({});

Preview.args = {
  disabled: false,
  fullWidth: false,
  children: 'Button',
};
