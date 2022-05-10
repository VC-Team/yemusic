/* eslint-disable @typescript-eslint/no-explicit-any */

import { ContextConsumer, ContextProvider, Element, ForwardRef, Memo } from 'react-is';

function getWrappedName(outerType: any, innerType: any, wrapperName: string) {
  return outerType.displayName || innerType.displayName || innerType.name || wrapperName;
}

export function getComponentName(Component: any): string | null {
  if (Component == null) {
    return null;
  }

  if (typeof Component === 'string') {
    return Component;
  }

  if (typeof Component === 'function') {
    return Component.displayName || Component.name || null;
  }

  if (typeof Component === 'object') {
    switch (Component.$$typeof) {
      case ContextConsumer:
        return getWrappedName(Component, Component.render, 'ContextConsumer');
      case ContextProvider:
        return getWrappedName(Component, Component.render, 'ContextProvider');
      case Element:
        return getWrappedName(Component, Component.type, 'Element');
      case ForwardRef:
        return getWrappedName(Component, Component.render, 'ForwardRef');
      case Memo:
        return getWrappedName(Component, Component.type, 'memo');
      default:
        return null;
    }
  }

  return null;
}

export default getComponentName;
