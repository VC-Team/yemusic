import { Story, Meta } from '@storybook/react';

import { HomeActiveIcon, IconProps } from '.';

export default {
  component: HomeActiveIcon,
  title: 'Icon',
} as Meta;

const Template: Story<IconProps> = args => <HomeActiveIcon {...args} />;

export const Demo = Template.bind({});
Demo.args = {
  color: 'secondary',
};
