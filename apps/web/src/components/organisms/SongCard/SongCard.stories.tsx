import { Meta, Story } from '@storybook/react';

import SongCard, { SongCardProps } from '.';

export default {
  component: SongCard,
  title: 'SongCard',
} as Meta;

const Template: Story<SongCardProps> = args => <SongCard {...args} />;

export const Preview = Template.bind({});
Preview.args = {
  _type: 'list',
  author: 'The Cassette',
  imagelUrl: 'https://i.scdn.co/image/ab67616d00001e02afb5dbb4ef5e1d30ff07b248',
  isPlaying: false,
  isLiked: false,
  name: 'Khoảng cách',
  time: '5:08',
  onClick: () => {
    console.log('onClick');
  },
  onDownload: () => {
    console.log('onDownload');
  },
  onLike: () => {
    console.log('onLike');
  },
};
