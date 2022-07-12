import React, { createContext, useState } from 'react';

export abstract class ClientDomainProvider<IState> {
  constructor(initialState: IState) {
    const Context = createContext<IState>(initialState);

    let getState: IState;
    let updateState: React.Dispatch<React.SetStateAction<IState>>;

    const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [state, setState] = useState<IState>(initialState);

      return (
        <Context.Provider value={state}>
          <Context.Consumer>
            {() => {
              getState = (Context as any)._currentValue;
              updateState = setState;

              return children;
            }}
          </Context.Consumer>
        </Context.Provider>
      );
    };

    this.initialState = initialState;

    this.context = Context;

    this.provider = Provider;

    this.getState = () => Object.freeze(getState);

    this.updateState = value => updateState(value);
  }

  protected initialState: IState;

  protected context: React.Context<IState>;

  protected provider: React.FC<{ children: React.ReactNode }>;

  protected getState: () => IState;

  protected updateState: React.Dispatch<React.SetStateAction<IState>>;
}
