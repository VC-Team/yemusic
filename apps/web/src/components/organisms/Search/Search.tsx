import React, { Children, cloneElement, FC, isValidElement, useCallback, useEffect, useMemo, useState } from 'react';

import abemClasses from '@utils/abemClasses';

import { SearchInput, SearchResultList } from '.';
import './style.scss';

export interface SearchProps {
  canSearch: boolean;
  debounceTime?: number;
  onSearch: (keyword: string) => void;
}

type ISearchState = {
  keyword: string;
  isLoading: boolean;
  canSearch: boolean;
};

const DEBOUNCE_TIME_DEFAULT = 1000;
const LOADING_TIME = 750;

export const Search: FC<SearchProps> = ({ canSearch, children, debounceTime = DEBOUNCE_TIME_DEFAULT, onSearch }) => {
  const [state, setState] = useState<ISearchState>({
    keyword: '',
    isLoading: true,
    canSearch,
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      canSearch,
    }));
  }, [canSearch]);

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

  const handleToggleOpenSearchBox = useCallback((canSearch: boolean) => {
    setState(prev => ({
      ...prev,
      canSearch,
    }));
  }, []);

  const searchChildren = useMemo(() => {
    let searchInput;
    let searchResultList;

    Children.map(children, child => {
      if (isValidElement(child)) {
        if (child.type === SearchInput) {
          searchInput = cloneElement(child, {
            canSearch: state.canSearch,
            onClose: () => handleToggleOpenSearchBox(false),
            onChangeInject: onChangeSearchInput,
            onFocusInject: () => handleToggleOpenSearchBox(true),
          });
        }

        if (child.type === SearchResultList) {
          searchResultList = cloneElement(child, {
            isLoading: state.isLoading,
            isVisible: state.canSearch,
          });
        }
      }
    });

    return {
      searchInput,
      searchResultList,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, state.isLoading, state.canSearch]);

  return (
    <div className={abemClasses('o-search')}>
      {searchChildren.searchInput}
      {state.canSearch && (
        <div className="o-search_title">
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
