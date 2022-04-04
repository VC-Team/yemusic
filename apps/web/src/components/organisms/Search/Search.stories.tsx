import { Story, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import Search, { SearchInput, SearchResultList, SearchResultListItem } from '.';
import { SearchProps } from './Search';

export default {
  component: Search,
  title: 'Search',
} as Meta;

const Template: Story<SearchProps> = args => (
  <BrowserRouter>
    <Search {...args}>
      <SearchInput placeholder="Search..." />
      <SearchResultList type="recent">
        <SearchResultListItem
          author="abc"
          name="abc a sdasd asd asd asd asda sd asd ads"
          thumbnailUrl="https://i.pinimg.com/564x/bb/15/6b/bb156b463b33b4922fcf0f31ccf1e838.jpg"
          songId="id1"
        />
      </SearchResultList>
    </Search>

    <Search {...args}>
      <SearchInput placeholder="Search..." />
      <SearchResultList type="loading">
        <SearchResultListItem
          author="abc"
          name="abc"
          thumbnailUrl="https://i.pinimg.com/564x/bb/15/6b/bb156b463b33b4922fcf0f31ccf1e838.jpg"
          songId="id1"
        />
      </SearchResultList>
    </Search>

    <Search {...args}>
      <SearchInput placeholder="Search..." />
      <SearchResultList type="result">
        <SearchResultListItem
          author="abc"
          name="abc asd asd asd asd asd asd asd"
          thumbnailUrl="https://i.pinimg.com/564x/bb/15/6b/bb156b463b33b4922fcf0f31ccf1e838.jpg"
          songId="id1"
        />
      </SearchResultList>
    </Search>
  </BrowserRouter>
);

export const Preview = Template.bind({});

Preview.args = {
  fullWidth: true,
};
