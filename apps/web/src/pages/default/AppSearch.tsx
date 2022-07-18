/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useRef, useState } from 'react';

import Search, { SearchInput, SearchResultList, SearchResultListItem } from '@components/organisms/Search';
import abemClasses from '@utils/abemClasses';
import Axios from 'axios';

import './style.scss';

type IAppSearch = {
  isOpenSearchBox: boolean;
  recentSearchData: {
    id: string;
    author: string;
    name: string;
    thumbnailUrl: string;
  }[];
  resultSearchData: {
    id: string;
    author: string;
    name: string;
    thumbnailUrl: string;
  }[];
  type: 'recent';
};

export const AppSearch: FC = () => {
  const appDefaultSearchInnerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<IAppSearch>({
    isOpenSearchBox: false,
    recentSearchData: [],
    resultSearchData: [],
    type: 'recent',
  });

  useEffect(() => {
    const listener = (event: any) => {
      if (!appDefaultSearchInnerRef.current || appDefaultSearchInnerRef.current.contains(event.target)) {
        return;
      }
      handleToggleOpenSearchBox(false);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, []);

  const handleToggleOpenSearchBox = (isOpen: boolean) => {
    setState(prevState => ({
      ...prevState,
      isOpenSearchBox: isOpen,
    }));
  };

  const handleSearch = (keyword: string) => {
    if (keyword !== '') {
      Axios.post('https://yemusic-api.vc-team.com/api/song/s', {
        search: keyword,
      }).then((data: any) => {
        const resultSearchData = data.data.data.songs.map((value: any, _index: number) => ({
          id: value.yId,
          author: value.channel,
          name: value.title,
          thumbnailUrl: value.thumbnail.url,
        }));

        setState((prevState: any) => ({
          ...prevState,
          resultSearchData,
          type: 'result',
        }));
      });
    } else {
      setState((prevState: any) => ({
        ...prevState,
        type: 'recent',
      }));
    }
  };

  const searchData = state.type === 'recent' ? state.recentSearchData : state.resultSearchData;

  return (
    <div className="c-app-default-search">
      <div
        className={abemClasses('c-app-default-search_inner', state.isOpenSearchBox && 'open')}
        ref={appDefaultSearchInnerRef}
      >
        <Search
          isOpenSearchBox={state.isOpenSearchBox}
          onSearch={handleSearch}
          onToggleSearchBox={handleToggleOpenSearchBox}
        >
          <SearchInput placeholder="Search for tracks" />
          <SearchResultList>
            {searchData.map((value, index) => (
              <SearchResultListItem
                key={index}
                author={value.author}
                name={value.name}
                id={value.id}
                thumbnailUrl={value.thumbnailUrl}
                type={state.type}
                onClickRemoveSearchRecent={id => {
                  console.log(id);
                }}
                onClickSearchResult={id => {
                  console.log(id);
                }}
              />
            ))}
          </SearchResultList>
        </Search>
      </div>
    </div>
  );
};
