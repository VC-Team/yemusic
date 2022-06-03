import { CircleIcon, CircleActiveIcon } from '@components/atoms/Icon';
import { Story, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import Nav, { NavItem, NavDivider, NavProps } from '..';

export default {
  component: Nav,
  title: 'Molecules/Nav',
} as Meta;

const Template: Story<NavProps> = args => (
  <BrowserRouter>
    <Nav {...args}>
      <NavItem
        to="/nav-item-1"
        icon={<CircleIcon color="inherit" />}
        iconActive={<CircleActiveIcon color="primary" />}
        name="NavItem 1"
      />
      <NavItem
        to="/nav-item-2"
        icon={<CircleIcon color="inherit" />}
        iconActive={<CircleActiveIcon color="primary" />}
        name="NavItem 2"
      />
      <NavDivider />
      <NavItem
        to="/nav-item-3"
        icon={<CircleIcon color="inherit" />}
        iconActive={<CircleActiveIcon color="primary" />}
        name="NavItem 3"
        onClick={next => {
          alert('Run action before redirecting');
          next();
        }}
      />
      <NavItem
        to="/nav-item-4"
        icon={<CircleIcon color="inherit" />}
        iconActive={<CircleActiveIcon color="primary" />}
        name="NavItem 4"
      />
    </Nav>
  </BrowserRouter>
);

export const Example = Template.bind({});

Example.args = {
  mode: 'horizontal',
};
