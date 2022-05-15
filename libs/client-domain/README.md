# client-domain

## Usage

```tsx
interface IDisplay {
  theme: 'light' | 'dark';
}

interface IWebDisplay extends IDisplay {
  device: 'desktop' | 'tablet' | 'mobile';
}

@ClientDomain()
class DisplayDomain<IDisplayOverwrite extends IDisplay> extends ClientDomainProvider<IDisplayOverwrite> {
  public DisplayContext = this.context;
  public DisplayProvider = this.provider;

  @Action()
  public actionToggleTheme() {
    const { updateState } = this;

    updateState(prevState => ({
      ...prevState,
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  }
}

@ClientDomain()
class WebDisplayDomain extends DisplayDomain<IWebDisplay> {
  @Action()
  public actionSetDevice(device: IWebDisplay['device']) {
    const { updateState } = this;

    updateState(prevState => ({
      ...prevState,
      device,
    }));
  }
}

const { DisplayProvider, DisplayContext, actionToggleTheme, actionSetDevice } = new WebDisplayDomain({
  theme: 'light',
  device: 'desktop',
});

const Demo: FC = () => {
  const { device, theme } = useContext(DisplayContext);

  return (
    <div>
      <p>Theme: {theme}</p>
      <p>Device: {device}</p>

      <button onClick={actionToggleTheme}>{theme === 'light' ? 'Dark' : 'Light'}</button>
      <br />
      <button onClick={() => actionSetDevice('desktop')}>Desktop</button>
      <button onClick={() => actionSetDevice('tablet')}>Tablet</button>
      <button onClick={() => actionSetDevice('mobile')}>Mobile</button>
    </div>
  );
};

export const App: FC = () => {
  return (
    <DisplayProvider>
      <Demo />
    </DisplayProvider>
  );
};
```
