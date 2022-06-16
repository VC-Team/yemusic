import { isFunction } from '../utils';

interface IClientDomainConfig {
  autoBind: boolean;
}

export function ClientDomain(config?: IClientDomainConfig) {
  const { autoBind = true } = config || {};

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
            const func = autoBind ? descriptor.value.bind(this) : descriptor.value;
            return func;
          },
        });
      }
    });
  };
}
