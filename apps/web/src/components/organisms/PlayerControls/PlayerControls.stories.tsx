import { Meta, Story } from '@storybook/react';

import PlayerControls, { PlayerControlsProps } from '.';

export default {
  component: PlayerControls,
  title: 'PlayerControls',
} as Meta;

const Template: Story<PlayerControlsProps> = args => <PlayerControls {...args} />;

export const Preview = Template.bind({});
Preview.args = {
  audioSrc: 'https://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4',
  author: 'Khoảng cách',
  imageSrc: 'https://i.scdn.co/image/ab67616d00001e02afb5dbb4ef5e1d30ff07b248',
  isLoading: false,
  isShuffle: false,
  songName: 'The Cassette',
  viewMode: 'mini',
  onEnded: () => {
    console.log('onEnded');
  },
  onClickRepeat: repeatMode => {
    console.log('onClickRepeat', repeatMode);
  },
  onClickShuffle: () => {
    console.log('onClickShuffle');
  },
  onClickSkipNext: () => {
    console.log('onClickSkipNext');
  },
  onClickSkipPrevious: () => {
    console.log('onClickSkipPrevious');
  },
};
