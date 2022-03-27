import { HomeActiveIcon, HomeIcon } from '@components/atoms/Icon';
import { Story, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import Nav, { NavItem, NavDivider, NavProps } from '.';

export default {
  component: Nav,
  title: 'Nav',
} as Meta;

const Template: Story<NavProps> = args => (
  <BrowserRouter>
    <Nav {...args}>
      <NavItem to="/nav-item-1" icon={<HomeIcon />} iconActive={<HomeActiveIcon color="primary" />} name="NavItem 1" />
      <NavItem to="/nav-item-2" icon={<HomeIcon />} iconActive={<HomeActiveIcon color="primary" />} name="NavItem 2" />
      <NavDivider />
      <NavItem
        to="/nav-item-3"
        icon={<HomeIcon />}
        iconActive={<HomeActiveIcon color="primary" />}
        name="NavItem 3"
        onClick={next => {
          alert('Run an action before redirecting');
          next();
        }}
      />
      <NavItem to="/nav-item-4" icon={<HomeIcon />} iconActive={<HomeActiveIcon color="primary" />} name="NavItem 4" />
    </Nav>
  </BrowserRouter>
);

export const Preview = Template.bind({});

Preview.args = {
  mode: 'horizontal',
};
