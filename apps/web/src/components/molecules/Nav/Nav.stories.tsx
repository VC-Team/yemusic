import { HomeActiveIcon, HomeIcon } from '@components/atoms/Icon';
import { Story, Meta } from '@storybook/react';

import Nav, { NavItem, NavDivider, NavProps } from '.';

export default {
  component: Nav,
  title: 'Nav',
} as Meta;

const Template: Story<NavProps> = args => (
  <Nav {...args}>
    <NavItem icon={<HomeIcon />} iconActive={<HomeActiveIcon color="primary" />} name="NavItem 1" />
    <NavItem icon={<HomeIcon />} iconActive={<HomeActiveIcon color="primary" />} name="NavItem 2" />
    <NavDivider />
    <NavItem icon={<HomeIcon />} iconActive={<HomeActiveIcon color="primary" />} name="NavItem 3" />
    <NavItem icon={<HomeIcon />} iconActive={<HomeActiveIcon color="primary" />} name="NavItem 4" />
  </Nav>
);

export const Preview = Template.bind({});

Preview.args = {
  mode: 'horizontal',
};
