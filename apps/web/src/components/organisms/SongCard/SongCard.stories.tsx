import { Meta, Story } from '@storybook/react';

import SongCard, { SongCardList, SongCardProps, SongCardListProps } from '.';

export default {
  component: SongCard,
  title: 'SongCard',
} as Meta;

const SongCardListTemplate: Story<SongCardListProps> = args => (
  <SongCardList {...args}>
    {Array(9)
      .fill('')
      .map((value, index: number) => (
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

const SongCardTemplate: Story<SongCardProps> = args => <SongCard {...args} />;

export const SongCardListPreview = SongCardListTemplate.bind({});
SongCardListPreview.args = {
  isLoading: false,
  viewMode: 'list',
  title: 'Song List',
};

export const SongCardPreview = SongCardTemplate.bind({});
SongCardPreview.args = {
  direction: 'horizontal',
  title: 'Khoảng cách',
  author: 'The Cassette',
  imageSrc: 'https://i.scdn.co/image/ab67616d00001e02afb5dbb4ef5e1d30ff07b248',
  isLiked: false,
  isPlaying: false,
  onClick: () => {
    alert('onClick');
  },
  onClickLike: () => {
    alert('onClickLike');
  },
  onClickDownload: () => {
    alert('onClickDownload');
  },
};
