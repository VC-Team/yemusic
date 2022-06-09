import React, { FC } from 'react';

import {
  CircleActiveIcon,
  CircleIcon,
  HeartActiveIcon,
  HeartIcon,
  HomeActiveIcon,
  HomeIcon,
  SearchIcon,
} from '@components/atoms/Icon';
import Nav, { NavDivider, NavItem } from '@components/molecules/Nav';

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
    <div className="c-app-default_navigation -mobile">
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
        <NavDivider />
        <NavItem
          icon={<CircleIcon color="inherit" />}
          iconActive={<CircleActiveIcon color="primary" />}
          name="Playlist 1"
          to="/play-list-1"
        />
        <NavItem
          icon={<CircleIcon color="inherit" />}
          iconActive={<CircleActiveIcon color="primary" />}
          name="Playlist 2"
          to="/play-list-2"
        />
        <NavItem
          icon={<CircleIcon color="inherit" />}
          iconActive={<CircleActiveIcon color="primary" />}
          name="Playlist 3"
          to="/play-list-3"
        />
      </Nav>
    </div>
  );
};
