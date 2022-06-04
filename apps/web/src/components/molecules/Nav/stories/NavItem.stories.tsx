import { CircleActiveIcon, CircleIcon } from '@components/atoms/Icon';
import { Meta, Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { NavItem, NavItemProps } from '..';

export default {
  component: NavItem,
  title: 'Molecules/NavItem',
} as Meta;

const Template: Story<NavItemProps> = args => (
  <BrowserRouter>
    <NavItem {...args} />
  </BrowserRouter>
);

export const Example = Template.bind({});

Example.args = {
  to: '/nav-item-1',
  icon: <CircleIcon color="inherit" />,
  iconActive: <CircleActiveIcon color="primary" />,
  mode: 'full',
  name: 'NavItem 1',
  _isActive: false,
};
