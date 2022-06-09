import React, { FC, useEffect, useState } from 'react';

import MainLayout from '@components/templates/MainLayout';
import { useMediaQuery } from 'react-responsive';

import { MobileAppHeader, DesktopAppHeader, MobileAppNavigation, DesktopAppNavigation, AppSearch } from '.';

type IDefaultPageState = {
  device: 'mobile' | 'desktop';
};

export const DefaultPage: FC = () => {
  const [state, setState] = useState<IDefaultPageState>({
    device: 'desktop',
  });

  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  useEffect(() => {
    const device = isMobile ? 'mobile' : 'desktop';

    setState(prevState => ({
      ...prevState,
      device,
    }));
  }, [isMobile]);

  return (
    <MainLayout
      device={state.device}
      render={{
        mobile: {
          header: <MobileAppHeader />,
          navigation: <MobileAppNavigation />,
        },
        desktop: {
          header: <DesktopAppHeader />,
          navigation: <DesktopAppNavigation />,
          search: <AppSearch />,
        },
      }}
    />
  );
};

export default DefaultPage;
