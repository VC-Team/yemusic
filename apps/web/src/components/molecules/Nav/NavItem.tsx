import React, { FC, useCallback } from 'react';

import abemClasses from '@utils/abemClasses';

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
  const handleClick = useCallback(() => {
    if (_onClick) {
      if (onClick) {
        onClick(_onClick);
      } else {
        _onClick();
      }
    }
  }, [onClick, _onClick]);

  return (
    <li className={abemClasses('m-nav_item', mode, _isActive && 'active')} role="button" onClick={handleClick}>
      <span className="m-nav_item_icon">{_isActive ? iconActive : icon}</span>
      <p className="m-nav_item_name">{name}</p>
    </li>
  );
};
