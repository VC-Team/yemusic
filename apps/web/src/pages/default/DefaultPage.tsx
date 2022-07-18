import { FC, useContext, useEffect, useState } from 'react';

import MainLayout from '@components/templates/MainLayout';
import { actionSetThemeColor, DisplayContext, DisplayProvider } from '@domains/display';
import { SearchProvider } from '@domains/search';
import { withProviders } from '@hocs/withProviders';
import { useMediaQuery } from 'react-responsive';

import {
  AppSearch,
  DesktopAppHeader,
  DesktopAppNavigation,
  MobileAppHeader,
  MobileAppNavigation,
  AppPlayerControls,
} from '.';

type IDefaultPageState = {
  device: 'mobile' | 'desktop';
};

export const DefaultPage: FC = () => {
  const [state, setState] = useState<IDefaultPageState>({
    device: 'desktop',
  });

  const { theme } = useContext(DisplayContext);

  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  useEffect(() => {
    const device = isMobile ? 'mobile' : 'desktop';

    setState(prevState => ({
      ...prevState,
      device,
    }));
  }, [isMobile]);

  useEffect(() => {
    actionSetThemeColor(theme);
  }, [theme]);

  return (
    <MainLayout
      device={state.device}
      render={{
        common: {
          playerControls: <AppPlayerControls device={state.device} />,
        },
        desktop: {
          header: <DesktopAppHeader />,
          navigation: <DesktopAppNavigation />,
          search: <AppSearch />,
        },
        mobile: {
          header: <MobileAppHeader />,
          navigation: <MobileAppNavigation />,
        },
      }}
    />
  );
};

export default withProviders(DisplayProvider, SearchProvider)(DefaultPage);
