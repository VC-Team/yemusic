import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import abemClasses from '@utils/abemClasses';
import { useLocation, useNavigate } from 'react-router-dom';

import { NavItem } from '.';
import './style.scss';

export interface NavProps {
  mode?: 'horizontal' | 'vertical';
}

type INavState = {
  navItemSelect: number;
};

const handleUpdateNavItemActive = (navRef: React.RefObject<HTMLUListElement>, navItemSelect: number) => {
  if (navRef.current) {
    const navItemActiveElement = navRef.current.children[navItemSelect] as HTMLElement;

    if (navItemActiveElement) {
      const { offsetTop, offsetLeft, offsetWidth } = navItemActiveElement;

      navRef.current.style.setProperty('--nav-item-active-top', offsetTop + 'px');
      navRef.current.style.setProperty('--nav-item-active-left', offsetLeft + 'px');
      navRef.current.style.setProperty('--nav-item-active-width', offsetWidth + 'px');
    }
  }
};

export const Nav: FC<NavProps> = ({ children, mode = 'horizontal' }) => {
  const navRef = useRef<HTMLUListElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState<INavState>({
    navItemSelect: 0,
  });

  const routes = useMemo(
    () =>
      Children.map(children, child => ({
        to: isValidElement(child) ? child.props.to : undefined,
      })),
    [children]
  );

  useEffect(() => {
    const locationPathname = location.pathname;

    if (routes) {
      for (let index = 0; index < routes.length; index++) {
        const toPathname = routes[index].to;

        if (
          locationPathname === toPathname ||
          (locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === '/')
        ) {
          setState(prevState => ({
            ...prevState,
            navItemSelect: index,
          }));
        }
      }
    }
  }, [routes, location]);

  useEffect(() => {
    handleUpdateNavItemActive(navRef, state.navItemSelect);
  }, [state.navItemSelect, mode]);

  useEffect(() => {
    window.addEventListener('resize', () => handleUpdateNavItemActive(navRef, state.navItemSelect));

    return () => {
      window.removeEventListener('resize', () => handleUpdateNavItemActive(navRef, state.navItemSelect));
    };
  }, [state.navItemSelect]);

  const handleChangeNavItemActive = useCallback(
    (navItemSelect: number) => {
      setState(prevState => ({
        ...prevState,
        navItemSelect,
      }));

      if (routes) {
        navigate(routes[navItemSelect].to);
      }
    },
    [navigate, routes]
  );

  return (
    <ul className={abemClasses('m-nav', mode)} ref={navRef}>
      {Children.map(children, (child, childIndex) => {
        if (isValidElement(child) && child.type === NavItem) {
          return cloneElement(child, {
            mode: mode === 'horizontal' ? 'mini' : 'full',
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
