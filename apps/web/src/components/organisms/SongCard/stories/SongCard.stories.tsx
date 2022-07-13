import { Meta, Story } from '@storybook/react';

import SongCard, { SongCardProps } from '..';

export default {
  component: SongCard,
  title: 'Organisms/SongCard',
} as Meta;

const SongCardTemplate: Story<SongCardProps> = args => <SongCard {...args} />;

export const Example = SongCardTemplate.bind({});
Example.args = {
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
