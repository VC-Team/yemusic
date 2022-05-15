import React, { Children, cloneElement, FC, isValidElement, useEffect, useState } from 'react';

import abemClasses from '@utils/abemClasses';
import getComponentName from '@utils/getComponentName';
import './styles.scss';

export interface SearchProps {
  onSearch: (keyword: string) => void;
  debounceTime?: number;
}

export interface ISearch {
  keyword: string;
  isOpen: boolean;
}

const DEBOUNCE_TIME_DEFAULT = 500;

export const Search: FC<SearchProps> = ({ children, onSearch, debounceTime = DEBOUNCE_TIME_DEFAULT }) => {
  const [state, setState] = useState({
    keyword: '',
    isOpen: false,
  });

  useEffect(() => {
    const timer = setTimeout(
      () => {
        onSearch(state.keyword);
      },
      state.keyword === '' ? 0 : debounceTime
    );

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.keyword, debounceTime]);

  const onChangeSearchInput = (keyword: string) => {
    setState(prev => ({
      ...prev,
      keyword: keyword,
    }));
  };

  const handleToggleOpen = (isOpen: boolean) => {
    setState(prev => ({
      ...prev,
      isOpen,
    }));
  };

  return (
    <div className={abemClasses('o-search')}>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          console.log(child);

          if (getComponentName(child) === 'SearchInput') {
            return cloneElement(child, {
              _onChange: onChangeSearchInput,
              _onFocus: () => handleToggleOpen(true),
              _onBlur: () => handleToggleOpen(false),
            });
          }

          if (getComponentName(child) === 'SearchResultList') {
            return cloneElement(child, {
              isOpen: state.isOpen,
            });
          }
        }

        return null;
      })}
    </div>
  );
};

export default Search;
