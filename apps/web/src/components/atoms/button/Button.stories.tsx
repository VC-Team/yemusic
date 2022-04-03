import { HomeIcon } from '@components/atoms/Icon';
import { Story, Meta } from '@storybook/react';

import Button, { ButtonProps } from '.';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Preview = Template.bind({});
export const PreviewIconOnly = Template.bind({});

Preview.args = {
  disabled: false,
  fullWidth: false,
  prefix: <HomeIcon />,
  suffix: <HomeIcon />,
  children: 'Button',
};

PreviewIconOnly.args = {
  disabled: false,
  fullWidth: false,
  children: <HomeIcon />,
};
