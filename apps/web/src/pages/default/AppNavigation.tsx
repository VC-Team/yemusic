import { FC } from 'react';

import { HeartActiveIcon, HeartIcon, HomeActiveIcon, HomeIcon, SearchIcon } from '@components/atoms/Icon';
import Nav, { NavItem } from '@components/molecules/Nav';

import './style.scss';

export const MobileAppNavigation: FC = () => {
  return (
    <div className="c-app-default_navigation -mobile">
      <Nav mode="horizontal">
        <NavItem
          icon={<HomeIcon color="inherit" />}
          iconActive={<HomeActiveIcon color="primary" />}
          name="Home"
          to="/"
        />
        <NavItem
          icon={<SearchIcon color="inherit" />}
          iconActive={<SearchIcon color="primary" />}
          name="Search"
          to="/search"
        />
        <NavItem
          icon={<HeartIcon color="inherit" />}
          iconActive={<HeartActiveIcon color="primary" />}
          name="Liked Tracks"
          to="/liked-tracks"
        />
      </Nav>
    </div>
  );
};

export const DesktopAppNavigation: FC = () => {
  return (
    <div className="c-app-default_navigation -desktop">
      <Nav mode="vertical">
        <NavItem
          icon={<HomeIcon color="inherit" />}
          iconActive={<HomeActiveIcon color="primary" />}
          name="Home"
          to="/"
        />
        <NavItem
          icon={<HeartIcon color="inherit" />}
          iconActive={<HeartActiveIcon color="primary" />}
          name="Liked Tracks"
          to="/liked-tracks"
        />
      </Nav>
    </div>
  );
};
