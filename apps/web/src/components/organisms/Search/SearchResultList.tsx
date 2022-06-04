import React, { Children, cloneElement, FC, isValidElement } from 'react';

import { SearchResultListItem } from '.';
import './style.scss';

export interface SearchResultListProps {
  isLoading?: boolean;
  isVisible?: boolean;
}

export const SearchResultList: FC<SearchResultListProps> = ({ children, isLoading, isVisible }) => {
  if (isVisible) {
    return (
      <div className="o-search_resultlist" data-loading={isLoading}>
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
