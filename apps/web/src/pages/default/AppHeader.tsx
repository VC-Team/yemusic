import React, { FC } from 'react';

import logoSrc from '@assets/images/logo.png';
import { Link } from 'react-router-dom';

import './style.scss';

export const MobileAppHeader: FC = () => {
  return (
    <div className="c-app-default_header -mobile">
      <Link to="/" className="c-app-default_header_logo">
        <img src={logoSrc} alt="Yemusic" />
        <h1>Yemusic</h1>
      </Link>
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
