import { Story, Meta } from '@storybook/react';

import {
  IconProps,
  CircleIcon,
  CircleActiveIcon,
  HomeIcon,
  HomeActiveIcon,
  HeartIcon,
  HeartActiveIcon,
  PlayIcon,
  PlayActiveIcon,
  PauseIcon,
  PauseActiveIcon,
  SkipNextIcon,
  SkipNextActiveIcon,
  SkipPreviousIcon,
  SkipPreviousActiveIcon,
  SearchIcon,
  CloseIcon,
  VolumehightIcon,
  VolumeLowIcon,
  VolumeOffIcon,
  VolumeSlashIcon,
  RepeatIcon,
  RepeatOneIcon,
  ShuffleIcon,
  ArrowLeftIcon,
  MoreIcon,
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  UserIcon,
  SettingIcon,
  ClockIcon,
  DownloadIcon,
} from '.';

export default {
  component: CircleIcon,
  title: 'Icon',
} as Meta;

const CircleIconTemplate: Story<IconProps> = args => <CircleIcon {...args} />;
export const Circle = CircleIconTemplate.bind({});
Circle.args = {
  color: 'secondary',
};

const CircleActiveIconTemplate: Story<IconProps> = args => <CircleActiveIcon {...args} />;
export const CircleActive = CircleActiveIconTemplate.bind({});
CircleActive.args = {
  color: 'secondary',
};

const HomeIconTemplate: Story<IconProps> = args => <HomeIcon {...args} />;
export const Home = HomeIconTemplate.bind({});
Home.args = {
  color: 'secondary',
};

const HomeActiveIconTemplate: Story<IconProps> = args => <HomeActiveIcon {...args} />;
export const HomeActive = HomeActiveIconTemplate.bind({});
HomeActive.args = {
  color: 'secondary',
};

const HeartIconTemplate: Story<IconProps> = args => <HeartIcon {...args} />;
export const Heart = HeartIconTemplate.bind({});
Heart.args = {
  color: 'secondary',
};

const HeartActiveIconTemplate: Story<IconProps> = args => <HeartActiveIcon {...args} />;
export const HeartActive = HeartActiveIconTemplate.bind({});
HeartActive.args = {
  color: 'secondary',
};

const PlayIconTemplate: Story<IconProps> = args => <PlayIcon {...args} />;
export const Play = PlayIconTemplate.bind({});
Play.args = {
  color: 'secondary',
};

const PlayActiveIconTemplate: Story<IconProps> = args => <PlayActiveIcon {...args} />;
export const PlayActive = PlayActiveIconTemplate.bind({});
PlayActive.args = {
  color: 'secondary',
};

const PauseIconTemplate: Story<IconProps> = args => <PauseIcon {...args} />;
export const Pause = PauseIconTemplate.bind({});
Pause.args = {
  color: 'secondary',
};

const PauseActiveIconTemplate: Story<IconProps> = args => <PauseActiveIcon {...args} />;
export const PauseActive = PauseActiveIconTemplate.bind({});
PauseActive.args = {
  color: 'secondary',
};

const SkipNextIconTemplate: Story<IconProps> = args => <SkipNextIcon {...args} />;
export const SkipNext = SkipNextIconTemplate.bind({});
SkipNext.args = {
  color: 'secondary',
};

const SkipNextActiveIconTemplate: Story<IconProps> = args => <SkipNextActiveIcon {...args} />;
export const SkipNextActive = SkipNextActiveIconTemplate.bind({});
SkipNextActive.args = {
  color: 'secondary',
};

const SkipPreviousIconTemplate: Story<IconProps> = args => <SkipPreviousIcon {...args} />;
export const SkipPrevious = SkipPreviousIconTemplate.bind({});
SkipPrevious.args = {
  color: 'secondary',
};

const SkipPreviousActiveIconTemplate: Story<IconProps> = args => <SkipPreviousActiveIcon {...args} />;
export const SkipPreviousActive = SkipPreviousActiveIconTemplate.bind({});
SkipPreviousActive.args = {
  color: 'secondary',
};

const SearchIconTemplate: Story<IconProps> = args => <SearchIcon {...args} />;
export const Search = SearchIconTemplate.bind({});
Search.args = {
  color: 'secondary',
};

const CloseIconTemplate: Story<IconProps> = args => <CloseIcon {...args} />;
export const Close = CloseIconTemplate.bind({});
Close.args = {
  color: 'secondary',
};

const VolumehightIconTemplate: Story<IconProps> = args => <VolumehightIcon {...args} />;
export const Volumehight = VolumehightIconTemplate.bind({});
Volumehight.args = {
  color: 'secondary',
};

const VolumeLowIconTemplate: Story<IconProps> = args => <VolumeLowIcon {...args} />;
export const VolumeLow = VolumeLowIconTemplate.bind({});
VolumeLow.args = {
  color: 'secondary',
};

const VolumeOffIconTemplate: Story<IconProps> = args => <VolumeOffIcon {...args} />;
export const VolumeOff = VolumeOffIconTemplate.bind({});
VolumeOff.args = {
  color: 'secondary',
};

const VolumeSlashIconTemplate: Story<IconProps> = args => <VolumeSlashIcon {...args} />;
export const VolumeSlash = VolumeSlashIconTemplate.bind({});
VolumeSlash.args = {
  color: 'secondary',
};

const RepeatIconTemplate: Story<IconProps> = args => <RepeatIcon {...args} />;
export const Repeat = RepeatIconTemplate.bind({});
Repeat.args = {
  color: 'secondary',
};

const RepeatOneIconTemplate: Story<IconProps> = args => <RepeatOneIcon {...args} />;
export const RepeatOne = RepeatOneIconTemplate.bind({});
RepeatOne.args = {
  color: 'secondary',
};

const ShuffleIconTemplate: Story<IconProps> = args => <ShuffleIcon {...args} />;
export const Shuffle = ShuffleIconTemplate.bind({});
Shuffle.args = {
  color: 'secondary',
};

const ArrowLeftIconTemplate: Story<IconProps> = args => <ArrowLeftIcon {...args} />;
export const ArrowLeft = ArrowLeftIconTemplate.bind({});
ArrowLeft.args = {
  color: 'secondary',
};

const MoreIconTemplate: Story<IconProps> = args => <MoreIcon {...args} />;
export const More = MoreIconTemplate.bind({});
More.args = {
  color: 'secondary',
};

const ArrowCircleLeftIconTemplate: Story<IconProps> = args => <ArrowCircleLeftIcon {...args} />;
export const ArrowCircleLeft = ArrowCircleLeftIconTemplate.bind({});
ArrowCircleLeft.args = {
  color: 'secondary',
};

const ArrowCircleRightIconTemplate: Story<IconProps> = args => <ArrowCircleRightIcon {...args} />;
export const ArrowCircleRight = ArrowCircleRightIconTemplate.bind({});
ArrowCircleRight.args = {
  color: 'secondary',
};

const UserIconTemplate: Story<IconProps> = args => <UserIcon {...args} />;
export const User = UserIconTemplate.bind({});
User.args = {
  color: 'secondary',
};

const SettingIconTemplate: Story<IconProps> = args => <SettingIcon {...args} />;
export const Setting = SettingIconTemplate.bind({});
Setting.args = {
  color: 'secondary',
};

const ClockIconTemplate: Story<IconProps> = args => <ClockIcon {...args} />;
export const Clock = ClockIconTemplate.bind({});
Clock.args = {
  color: 'secondary',
};

const DownloadIconTemplate: Story<IconProps> = args => <DownloadIcon {...args} />;
export const Download = DownloadIconTemplate.bind({});
Download.args = {
  color: 'secondary',
};
