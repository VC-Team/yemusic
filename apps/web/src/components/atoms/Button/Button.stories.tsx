import { HomeIcon } from '@components/atoms/Icon';
import { Story, Meta } from '@storybook/react';

import Button, { ButtonProps } from '.';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Preview = Template.bind({});
Preview.args = {
  children: 'Button',
  disabled: false,
  fullWidth: false,
  prefix: <HomeIcon color="inherit" />,
  shape: 'default',
  suffix: <HomeIcon color="inherit" />,
};

export const Prefix = Template.bind({});
Prefix.args = {
  children: 'Button',
  disabled: false,
  fullWidth: false,
  prefix: <HomeIcon color="inherit" />,
  shape: 'default',
};

export const Suffix = Template.bind({});
Suffix.args = {
  children: 'Button',
  disabled: false,
  fullWidth: false,
  shape: 'default',
  suffix: <HomeIcon color="inherit" />,
};

export const OnlyIcon = Template.bind({});
OnlyIcon.args = {
  disabled: false,
  fullWidth: false,
  shape: 'circle',
  suffix: <HomeIcon color="inherit" />,
};
