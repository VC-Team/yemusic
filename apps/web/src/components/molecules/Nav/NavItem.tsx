import React, { FC } from 'react';

import classNames from 'classnames';

import './style.scss';

export interface NavItemProps {
  icon: React.ReactNode;
  iconActive: React.ReactNode;
  mode?: 'collapse' | 'full';
  name: string;
  _isActive?: boolean;
  _onClick?: () => void;
}

export const NavItem: FC<NavItemProps> = ({ icon, iconActive, _isActive, mode = 'collapse', name, _onClick }) => {
  const handleClick = () => {
    if (_onClick) {
      _onClick();
    }
  };

  return (
    <li
      className={classNames('m-nav__item', `m-nav__item--${mode}`, _isActive && 'm-nav__item--active')}
      role="button"
      onClick={handleClick}
    >
      <span className="m-nav__item__icon">{_isActive ? iconActive : icon}</span>
      <p className="m-nav__item__name">{name}</p>
    </li>
  );
};
