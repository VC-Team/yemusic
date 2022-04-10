import { Meta, Story } from '@storybook/react';

import PlayerControls, { PlayerControlsProps } from '.';

export default {
  component: PlayerControls,
  title: 'Nav',
} as Meta;

const Template: Story<PlayerControlsProps> = args => <PlayerControls {...args} />;

export const Preview = Template.bind({});
Preview.args = {};
