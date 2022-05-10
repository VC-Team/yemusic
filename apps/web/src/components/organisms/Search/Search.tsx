import React, { Children, cloneElement, FC, isValidElement, useRef, useState } from 'react';

import classNames from 'classnames';
import './styles.scss';

export interface SearchProps {
  onSearch?: (keyword: string) => void;
  fullWidth?: boolean;
  timer: number;
}

export interface ISearch {
  keyword: string;
  isFocus: boolean;
}

export const Search: FC<SearchProps> = ({ children, onSearch, fullWidth, timer = 400 }) => {
  const [state, setState] = useState({
    keyword: '',
    isFocus: false,
  });

  const debounceRef = useRef<NodeJS.Timeout>();

  const onChangeSearchInput = (keyword: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (onSearch) {
      debounceRef.current = setTimeout(() => {
        onSearch(keyword);
      }, timer);
    }

    setState(prev => ({
      ...prev,
      keyword: keyword,
    }));
  };

  const onFocusSearChInput = () => {
    setState(prev => ({
      ...prev,
      isFocus: true,
    }));
  };

  const onBlurSearChInput = () => {
    setState(prev => ({
      ...prev,
      isFocus: false,
    }));
  };

  return (
    <div className={classNames('o-search', fullWidth && '-fullWidth')}>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((child.type as any).name === 'SearchInput') {
            return cloneElement(child, {
              _onChange: onChangeSearchInput,
              _onFocus: onFocusSearChInput,
              _onBlur: onBlurSearChInput,
            });
          } else {
            return cloneElement(child, {
              isFocus: state.isFocus,
            });
          }
        }

        return null;
      })}
    </div>
  );
};

export default Search;
