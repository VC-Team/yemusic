import React, { Children, cloneElement, FC, isValidElement } from 'react';

export interface SearchResultListProps {
  type: 'recent' | 'loading' | 'result';
  isFocus?: boolean;
}

export const SearchResultList: FC<SearchResultListProps> = ({ children, type, isFocus }) => {
  if (isFocus) {
    return (
      <div className="o-search__result-list">
        <p className="o-search__result-list__title">{type}</p>
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
  } else {
    return null;
  }
};
