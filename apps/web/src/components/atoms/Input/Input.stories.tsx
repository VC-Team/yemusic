import { HomeIcon } from '@components/atoms/Icon';
import { Story, Meta } from '@storybook/react';

import Input, { InputProps } from '.';

export default {
  component: Input,
  title: 'Input',
} as Meta;

const Template: Story<InputProps> = args => <Input {...args} />;

export const Preview = Template.bind({});
Preview.args = {
  disabled: false,
  fullWidth: false,
  prefix: <HomeIcon color="inherit" />,
  suffix: <HomeIcon color="inherit" />,
};

export const Prefix = Template.bind({});
Prefix.args = {
  disabled: false,
  fullWidth: false,
  prefix: <HomeIcon color="inherit" />,
};

export const Suffix = Template.bind({});
Suffix.args = {
  disabled: false,
  fullWidth: false,
  suffix: <HomeIcon color="inherit" />,
};
