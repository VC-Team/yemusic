import { FC, useContext } from 'react';

import logoSrc from '@assets/images/logo.png';
import Button from '@components/atoms/Button';
import { CircleActiveIcon, CircleIcon } from '@components/atoms/Icon';
import { actionSetTheme, DisplayContext } from '@domains/display';
import { Link } from 'react-router-dom';

import './style.scss';

export const MobileAppHeader: FC = () => {
  const { theme } = useContext(DisplayContext);

  const handleToggleTheme = () => {
    actionSetTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="c-app-default_header -mobile">
      <Link to="/" className="c-app-default_header_logo">
        <img src={logoSrc} alt="Yemusic" />
        <h1>Yemusic</h1>
      </Link>

      <div className="c-app-default_header_action">
        <Button
          prefix={theme === 'light' ? <CircleActiveIcon /> : <CircleIcon />}
          shape="circle"
          onClick={handleToggleTheme}
        />
      </div>
    </div>
  );
};

export const DesktopAppHeader: FC = () => {
  return (
    <div className="c-app-default_header -desktop">
      <Link to="/" className="c-app-default_header_logo">
        <img src={logoSrc} alt="Yemusic" />
        <h1>Yemusic</h1>
      </Link>
    </div>
  );
};

export const DesktopAppHeaderSecondary: FC = () => {
  return <div></div>;
};
