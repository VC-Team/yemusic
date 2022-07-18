import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withProviders = (...providers: Array<React.ComponentType<any>>) => {
  return function <T>(Component: React.ComponentType<T>) {
    return (props: T) =>
      providers.reduceRight(
        (children, ComponentCurrent) => <ComponentCurrent>{children}</ComponentCurrent>,
        <Component {...props} />
      );
  };
};
