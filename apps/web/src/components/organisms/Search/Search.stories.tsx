import { useEffect, useState } from 'react';

import { Story, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import Search, { SearchInput, SearchResultList, SearchResultListItem } from '.';
import { SearchProps } from './Search';

export default {
  component: Search,
  title: 'Search',
} as Meta;

interface ISimpleSearch {
  listSearchResults: any[];
  type: 'recent' | 'loading' | 'result';
}

const SimpleSearch = ({ ...otherProps }) => {
  const [state, setState] = useState<ISimpleSearch>({
    listSearchResults: [],
    type: 'recent',
  });

  const handleSearch = (keyword: string) => {
    if (keyword) {
      setState(prev => ({
        ...prev,
        type: 'loading',
      }));

      setTimeout(() => {
        setState(prev => ({
          ...prev,
          listSearchResults: [
            {
              id: '1',
              name: 'Bao tiền một mớ bình yên',
              thumbnailUrl: 'https://i.pinimg.com/564x/bb/15/6b/bb156b463b33b4922fcf0f31ccf1e838.jpg',
              author: 'OTD',
            },
            {
              id: '2',
              name: 'Bao tiền một mớ bình yên',
              thumbnailUrl: 'https://i.pinimg.com/564x/bb/15/6b/bb156b463b33b4922fcf0f31ccf1e838.jpg',
              author: 'OTD',
            },
          ],
          type: 'result',
        }));
      }, 300);
    } else {
      setState(prev => ({
        ...prev,
        listSearchResults: [
          {
            id: '1',
            name: 'Bao tiền một mớ bình yên',
          },
          {
            id: '2',
            name: 'Bao tiền một mớ bình yên',
          },
        ],
        type: 'recent',
      }));
    }
  };

  useEffect(() => {
    //get recent from locaStorages
    setState(prev => ({
      ...prev,
      listSearchResults: [
        {
          id: '1',
          name: 'Bao tiền một mớ bình yên',
        },
        {
          id: '2',
          name: 'Bao tiền một mớ bình yên',
        },
      ],
    }));
  }, []);

  return (
    <Search onSearch={handleSearch} timer={500} {...otherProps}>
      <SearchInput placeholder="Search..." />
      <SearchResultList type={state.type}>
        {state.listSearchResults?.map(item => (
          <SearchResultListItem
            key={item.id}
            songId={item.id}
            author={item.author}
            name={item.name}
            thumbnailUrl={item.thumbnailUrl}
          />
        ))}
      </SearchResultList>
    </Search>
  );
};

const Template: Story<SearchProps> = args => (
  <BrowserRouter>
    <SimpleSearch {...args} />
  </BrowserRouter>
);

export const Preview = Template.bind({});

Preview.args = {
  fullWidth: true,
};
