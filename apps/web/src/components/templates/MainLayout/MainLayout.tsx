import React, { FC } from 'react';

import './style.scss';

export interface MainLayoutProps {
  device: 'mobile' | 'desktop';
  render: {
    mobile: {
      header: React.ReactElement;
      navigation: React.ReactElement;
    };
    desktop: {
      header: React.ReactElement;
      navigation: React.ReactElement;
      search: React.ReactElement;
    };
  };
}

export const MainLayout: FC<MainLayoutProps> = ({ device, render }) => {
  const { mobile: mobileRender, desktop: renderDesktop } = render;

  if (device === 'mobile') {
    return (
      <div className="t-main-layout -mobile">
        <div className="t-main-layout_header">{mobileRender.header}</div>
        <div className="t-main-layout_main">
          <div className="t-main-layout_main_content"></div>
          <div className="t-main-layout_main_player-controls"></div>
        </div>
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
        <div className="t-main-layout_sidebar -right"></div>
      </div>
    );
  }
};

export default MainLayout;
