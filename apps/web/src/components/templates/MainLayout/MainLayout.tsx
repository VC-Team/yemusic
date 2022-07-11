import React, { FC } from 'react';

import './style.scss';

export interface MainLayoutProps {
  device: 'mobile' | 'desktop';
  render: {
    common: {
      playerControls?: React.ReactElement;
    };
    desktop: {
      header: React.ReactElement;
      navigation: React.ReactElement;
      search: React.ReactElement;
    };
    mobile: {
      header: React.ReactElement;
      navigation: React.ReactElement;
    };
  };
}

export const MainLayout: FC<MainLayoutProps> = ({ device, render }) => {
  const { common: commonRender, mobile: mobileRender, desktop: renderDesktop } = render;

  if (device === 'mobile') {
    return (
      <div className="t-main-layout -mobile">
        <div className="t-main-layout_header">{mobileRender.header}</div>
        <div className="t-main-layout_main">
          <div className="t-main-layout_main_content"></div>
        </div>
        {commonRender.playerControls && (
          <div className="t-main-layout_player-controls">{commonRender.playerControls}</div>
        )}
        <div className="t-main-layout_navigation">{mobileRender.navigation}</div>
      </div>
    );
  } else {
    return (
      <div className="t-main-layout -desktop">
        <div className="t-main-layout_sidebar -left">
          <div className="t-main-layout_sidebar_header">{renderDesktop.header}</div>
          <div className="t-main-layout_sidebar_navigation">{renderDesktop.navigation}</div>
        </div>
        <div className="t-main-layout_main">
          <div className="t-main-layout_main_header">{renderDesktop.search}</div>
          <div className="t-main-layout_main_content"></div>
        </div>
        <div className="t-main-layout_sidebar -right">
          <div></div>
          <div className="t-main-layout_sidebar_recent"></div>
          {commonRender.playerControls && (
            <div className="t-main-layout_sidebar_player-controls">{commonRender.playerControls}</div>
          )}
        </div>
      </div>
    );
  }
};

export default MainLayout;
