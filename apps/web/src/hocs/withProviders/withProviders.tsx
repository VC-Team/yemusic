import React from 'react';

export const withProviders = (...providers: React.ReactNode[]) => {
  return (Component: () => JSX.Element) => {
    return ({ ...otherProps }) => (
      <React.Fragment>
        {providers.reduceRight(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (children: React.ReactNode, ComponentCurrent: any) => (
            <ComponentCurrent>{children}</ComponentCurrent>
          ),
          <Component {...otherProps} />
        )}
      </React.Fragment>
    );
  };
};
