import React, { Children, cloneElement, FC, isValidElement, useCallback, useEffect, useMemo, useState } from 'react';

import abemClasses from '@utils/abemClasses';

import { SearchInput, SearchResultList } from '.';
import './styles.scss';

export interface SearchProps {
  debounceTime?: number;
  isOpen: boolean;
  onSearch: (keyword: string) => void;
  onToggleOpen: (isOpen: boolean) => void;
}

type ISearchState = {
  keyword: string;
  isLoading: boolean;
  isOpen: boolean;
};

const DEBOUNCE_TIME_DEFAULT = 1000;
const LOADING_TIME = 750;

export const Search: FC<SearchProps> = ({
  children,
  debounceTime = DEBOUNCE_TIME_DEFAULT,
  isOpen,
  onSearch,
  onToggleOpen,
}) => {
  const [state, setState] = useState<ISearchState>({
    keyword: '',
    isLoading: true,
    isOpen: isOpen,
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      isOpen,
    }));
  }, [isOpen]);

  useEffect(
    function handleSearch() {
      const timer = setTimeout(
        () => {
          onSearch(state.keyword);
        },
        state.keyword === '' ? 0 : debounceTime
      );

      return () => {
        clearTimeout(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.keyword, debounceTime]
  );

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      isLoading: true,
    }));

    const timer = setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
      }));
    }, LOADING_TIME);

    return () => {
      clearTimeout(timer);
    };
  }, [children]);

  const onChangeSearchInput = useCallback((keyword: string) => {
    setState(prev => ({
      ...prev,
      keyword: keyword,
    }));
  }, []);

  const handleToggleOpen = useCallback(
    (isOpen: boolean) => {
      onToggleOpen(isOpen);

      setState(prev => ({
        ...prev,
        isOpen,
      }));
    },
    [onToggleOpen]
  );

  const searchChildren = useMemo(() => {
    let searchInput;
    let searchResultList;

    Children.map(children, child => {
      if (isValidElement(child)) {
        if (child.type === SearchInput) {
          searchInput = cloneElement(child, {
            onClose: () => handleToggleOpen(false),
            _onChange: onChangeSearchInput,
            _onFocus: () => handleToggleOpen(true),
          });
        }

        if (child.type === SearchResultList) {
          searchResultList = cloneElement(child, {
            isLoading: state.isLoading,
            isOpen: state.isOpen,
          });
        }
      }
    });

    return {
      searchInput,
      searchResultList,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, state.isLoading, state.isOpen]);

  return (
    <div className={abemClasses('o-search')}>
      {searchChildren.searchInput}
      {state.isOpen && (
        <div className="o-search__title">
          {state.keyword === '' ? (
            <p>Recent search</p>
          ) : (
            <p>
              Search for <strong>"{state.keyword}"</strong>
            </p>
          )}
        </div>
      )}
      {searchChildren.searchResultList}
    </div>
  );
};

export default Search;
