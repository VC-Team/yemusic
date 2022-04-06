import React, { FC } from 'react';

import classNames from 'classnames';

import './style.scss';

export interface NavItemProps {
  icon: React.ReactNode;
  iconActive: React.ReactNode;
  mode?: 'mini' | 'full';
  name: string;
  to: string;
  onClick?: (redirect: () => void) => void;
  _isActive?: boolean;
  _onClick?: () => void;
}

export const NavItem: FC<NavItemProps> = ({ icon, iconActive, mode = 'mini', name, onClick, _isActive, _onClick }) => {
  const handleClick = () => {
    if (_onClick) {
      if (onClick) {
        onClick(_onClick);
      } else {
        _onClick();
      }
    }
  };

  return (
    <li className={classNames('m-nav__item', `-${mode}`, _isActive && '-active')} role="button" onClick={handleClick}>
      <span className="m-nav__item__icon">{_isActive ? iconActive : icon}</span>
      <p className="m-nav__item__name">{name}</p>
    </li>
  );
};
