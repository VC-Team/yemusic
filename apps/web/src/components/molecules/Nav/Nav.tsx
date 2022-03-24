/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Children, cloneElement, FC, isValidElement, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import './style.scss';

export interface NavProps {
  mode?: 'horizontal' | 'vertical';
}

export const Nav: FC<NavProps> = ({ children, mode }) => {
  const navRef = useRef<HTMLUListElement>(null);

  const [state, setState] = useState({
    navItemSelect: 0,
  });

  useEffect(() => {
    window.addEventListener('resize', handleUpdateNavItemActive);

    return () => window.removeEventListener('resize', handleUpdateNavItemActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.navItemSelect]);

  useEffect(() => {
    handleUpdateNavItemActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.navItemSelect, mode]);

  const handleUpdateNavItemActive = () => {
    if (navRef.current) {
      const navItemActiveElement = navRef.current.children[state.navItemSelect] as HTMLElement;

      if (navItemActiveElement) {
        const { offsetTop, offsetLeft, offsetWidth } = navItemActiveElement;

        navRef.current.style.setProperty('--nav-item-active-top', offsetTop + 'px');
        navRef.current.style.setProperty('--nav-item-active-left', offsetLeft + 'px');
        navRef.current.style.setProperty('--nav-item-active-width', offsetWidth + 'px');
      }
    }
  };

  const handleChangeNavItemActive = (navItemSelect: number) => {
    setState(prevState => ({
      ...prevState,
      navItemSelect,
    }));
  };

  return (
    <ul className={classNames('m-nav', `m-nav--${mode}`)} ref={navRef}>
      {Children.map(children, (child, childIndex) => {
        if (isValidElement(child) && (child.type as any).name === 'NavItem') {
          return cloneElement(child, {
            mode: mode === 'horizontal' ? 'collapse' : 'full',
            _isActive: childIndex === state.navItemSelect,
            _onClick: () => handleChangeNavItemActive(childIndex),
          });
        }

        return child;
      })}
    </ul>
  );
};

export default Nav;
