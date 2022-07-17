import { Action, ClientDomain, ClientDomainProvider, ValidateParam } from '../../core';
import { themeSchema } from './schemas';

export interface IDisplay {
  theme: 'light' | 'dark';
}

@ClientDomain()
export class DisplayDomain<IDisplayOverwrite extends IDisplay> extends ClientDomainProvider<IDisplayOverwrite> {
  public DisplayContext = this.context;

  public DisplayProvider = this.provider;

  @Action()
  actionSetTheme(@ValidateParam(themeSchema) theme: 'light' | 'dark') {
    this.updateState(prevState => ({
      ...prevState,
      theme,
    }));
  }
}
