import { Action, ClientDomain, ValidateParam } from '@yemusic/client-domain/core';
import { IDisplay, DisplayDomain, themeSchema } from '@yemusic/client-domain/domains/display';

export interface IWebDisplay extends IDisplay {
  device: 'desktop' | 'mobile';
}

export const initialWebDisplayState: IWebDisplay = {
  theme: 'dark',
  device: 'desktop',
};

@ClientDomain()
export class WebDisplayDomain extends DisplayDomain<IWebDisplay> {
  @Action()
  actionSetThemeColor(@ValidateParam(themeSchema) theme: 'light' | 'dark') {
    const themeAttributeName = 'data-theme';
    const bodyElement = document.getElementsByTagName('Body')[0];
    const hasThemeAttribute = bodyElement.hasAttribute(themeAttributeName);

    if (bodyElement) {
      if (theme === 'light' && !hasThemeAttribute) {
        bodyElement.setAttribute(themeAttributeName, 'light');
      }

      if (theme === 'dark' && hasThemeAttribute) {
        bodyElement.removeAttribute(themeAttributeName);
      }
    }
  }
}

export const { DisplayContext, DisplayProvider, actionSetTheme, actionSetThemeColor } = new WebDisplayDomain(
  initialWebDisplayState
);
