import React, { Children, cloneElement, FC, isValidElement } from 'react';

export interface SearchResultListProps {
  type: 'recent' | 'loading' | 'result';
}

export const SearchResultList: FC<SearchResultListProps> = ({ children, type }) => {
  return (
    <div className="result-list">
      <p className="result-list__title">{type}</p>
      {Children.map(
        children,
        child =>
          isValidElement(child) &&
          cloneElement(child, {
            type: type,
          })
      )}
    </div>
  );
};
