import React, { Children, cloneElement, FC, isValidElement } from 'react';

import { SearchResultListItem } from '.';

export interface SearchResultListProps {
  isLoading?: boolean;
  isOpen?: boolean;
}

export const SearchResultList: FC<SearchResultListProps> = ({ children, isLoading, isOpen }) => {
  if (isOpen) {
    return (
      <div className="o-search__result-list" data-loading={isLoading}>
        {Children.map(children, child => {
          if (isValidElement(child) && child.type === SearchResultListItem) {
            return cloneElement(child);
          }

          return null;
        })}
      </div>
    );
  } else {
    return null;
  }
};
