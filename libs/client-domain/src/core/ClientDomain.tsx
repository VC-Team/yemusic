import { Context, createContext, Dispatch, FC, SetStateAction, useState } from 'react';

import { isFunction } from '../utils';

export function ClientDomain() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Function) {
    if (!isFunction(target)) {
      throw new TypeError(`@ClientDomain decorator can only be applied to methods not: ${typeof target}`);
    }

    const keys = Object.getOwnPropertyNames(target.prototype);

    keys.forEach(key => {
      if (key === 'constructor') {
        return;
      }

      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

      if (descriptor && typeof descriptor.value === 'function') {
        Object.defineProperty(target.prototype, key, {
          configurable: true,
          get() {
            return descriptor.value.bind(this);
          },
        });
      }
    });
  };
}

export abstract class ClientDomainProvider<IState> {
  constructor(initialState: IState) {
    const Context = createContext<IState>(initialState);

    let _getState: IState;
    let _updateState: Dispatch<SetStateAction<IState>>;

    const Provider: FC = ({ children }) => {
      const [state, setState] = useState<IState>(initialState);

      return (
        <Context.Provider value={state}>
          <Context.Consumer>
            {() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              _getState = (Context as any)._currentValue;
              _updateState = setState;

              return children;
            }}
          </Context.Consumer>
        </Context.Provider>
      );
    };

    this.initialState = initialState;

    this.context = Context;

    this.provider = Provider;

    this.getState = () => Object.freeze(_getState);

    this.updateState = value => _updateState(value);
  }

  protected initialState: IState;

  protected context: Context<IState>;

  protected provider: FC;

  protected getState: () => IState;

  protected updateState: Dispatch<SetStateAction<IState>>;
}
