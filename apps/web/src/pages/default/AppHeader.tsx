import { FC } from 'react';

import logoSrc from '@assets/images/logo.png';
import Button from '@components/atoms/Button';
import { CircleIcon } from '@components/atoms/Icon';
import { Link } from 'react-router-dom';

import './style.scss';

export const MobileAppHeader: FC = () => {
  const handleToggleTheme = () => {
    console.log('toggle theme');
  };

  return (
    <div className="c-app-default_header -mobile">
      <Link to="/" className="c-app-default_header_logo">
        <img src={logoSrc} alt="Yemusic" />
        <h1>Yemusic</h1>
      </Link>

      <div className="c-app-default_header_action">
        <Button prefix={<CircleIcon />} shape="circle" onClick={handleToggleTheme} />
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
