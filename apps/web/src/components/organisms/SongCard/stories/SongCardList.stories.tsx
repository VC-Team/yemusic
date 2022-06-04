import { Meta, Story } from '@storybook/react';

import SongCard, { SongCardList, SongCardListProps } from '..';

export default {
  component: SongCardList,
  title: 'Organisms/SongCardList',
} as Meta;

const SongCardListTemplate: Story<SongCardListProps> = args => (
  <SongCardList {...args}>
    {Array(9)
      .fill('')
      .map((_value, index: number) => (
        <SongCard
          key={index}
          title="Khoảng cách"
          author="The Cassette"
          imageSrc="https://i.scdn.co/image/ab67616d00001e02afb5dbb4ef5e1d30ff07b248"
          isLiked={false}
          isPlaying={false}
          onClick={() => {
            alert('onClick');
          }}
          onClickLike={() => {
            alert('onClickLike');
          }}
          onClickDownload={() => {
            alert('onClickDownload');
          }}
        />
      ))}
  </SongCardList>
);

export const Example = SongCardListTemplate.bind({});
Example.args = {
  isLoading: false,
  viewMode: 'list',
  title: 'Song List',
};
