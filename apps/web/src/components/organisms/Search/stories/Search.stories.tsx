/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { Meta, Story } from '@storybook/react';
import Axios from 'axios';

import Search, { SearchInput, SearchResultList, SearchResultListItem } from '..';
import { SearchProps } from '../Search';

export default {
  component: Search,
  title: 'Organisms/Search',
} as Meta;

const SimpleSearch = ({ ...otherProps }) => {
  const [state, setState] = useState<any>({
    recentSearchData: [
      {
        id: '12345',
        author: 'OTD',
        name: 'Bao tiền một mớ bình yên',
        thumbnailUrl: 'https://i.pinimg.com/564x/bb/15/6b/bb156b463b33b4922fcf0f31ccf1e838.jpg',
      },
      {
        id: '12345',
        author: 'OTD',
        name: 'Bao tiền một mớ bình yên',
        thumbnailUrl: 'https://i.pinimg.com/564x/bb/15/6b/bb156b463b33b4922fcf0f31ccf1e838.jpg',
      },
      {
        id: '12345',
        author: 'OTD',
        name: 'Bao tiền một mớ bình yên',
        thumbnailUrl: 'https://i.pinimg.com/564x/bb/15/6b/bb156b463b33b4922fcf0f31ccf1e838.jpg',
      },
    ],
    resultSearchData: [],
    type: 'recent',
  });

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
    <Search onSearch={handleSearch} isOpenSearchBox={false} {...otherProps}>
      <SearchInput placeholder="Search..." />
      <SearchResultList>
        {searchData?.map((value: any, index: number) => (
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
  );
};

const Template: Story<SearchProps> = args => <SimpleSearch {...args} />;

export const Example = Template.bind({});

Example.args = {};
