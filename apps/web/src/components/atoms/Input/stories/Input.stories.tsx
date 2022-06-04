import { HomeIcon } from '@components/atoms/Icon';
import { Story, Meta } from '@storybook/react';

import Input, { InputProps } from '..';

export default {
  component: Input,
  title: 'Atoms/Input',
} as Meta;

const Template: Story<InputProps> = args => <Input {...args} />;

export const Example = Template.bind({});
Example.args = {
  disabled: false,
  fullWidth: false,
  prefix: <HomeIcon color="inherit" />,
  suffix: <HomeIcon color="inherit" />,
};

export const WithPrefix = Template.bind({});
WithPrefix.args = {
  disabled: false,
  fullWidth: false,
  prefix: <HomeIcon color="inherit" />,
};

export const WithSuffix = Template.bind({});
WithSuffix.args = {
  disabled: false,
  fullWidth: false,
  suffix: <HomeIcon color="inherit" />,
};
