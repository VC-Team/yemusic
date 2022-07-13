# client-domain

## Usage

```tsx
interface IDisplay {
  theme: 'light' | 'dark';
}

interface IWebDisplay extends IDisplay {
  device: 'desktop' | 'tablet' | 'mobile';
}

const deviceSchema = enumType(['desktop', 'tablet', 'mobile']).default('mobile');

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
  public actionSetDevice(@ValidateParam(deviceSchema) device: any) {
    const { updateState } = this;

    updateState(prevState => ({
      ...prevState,
      device,
    }));
  }

  @Action()
  async actionGetPoke(@ValidateParam(string()) path: any) {
    return axios.get(path);
  }
}

const { DisplayProvider, DisplayContext, actionToggleTheme, actionSetDevice, actionGetPoke } = new WebDisplayDomain({
  theme: 'light',
  device: 'desktop',
});

const Demo: FC = () => {
  const { device, theme } = useContext(DisplayContext);

  const handleToggleTheme = () => {
    actionToggleTheme();
  };

  const handleGetPoke = async () => {
    const result = await actionGetPoke('https://pokeapi.co/api/v2/pokemon/ditto');
    console.log(result);
  };

  return (
    <div>
      <p>Theme: {theme}</p>
      <p>Device: {device}</p>

      <button onClick={handleToggleTheme}>{theme === 'light' ? 'Dark' : 'Light'}</button>
      <br />
      <button onClick={() => actionSetDevice('desktop')}>Desktop</button>
      <button onClick={() => actionSetDevice('tablet')}>Tablet</button>
      <button onClick={() => actionSetDevice('mobile')}>Mobile</button>
      <br />
      <button onClick={handleGetPoke}>GetPoke</button>
    </div>
  );
};
```
