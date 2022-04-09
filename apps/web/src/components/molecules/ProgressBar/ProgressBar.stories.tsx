import { Story, Meta } from '@storybook/react';

import ProgressBar, { ProgressBarProps } from '.';

export default {
  component: ProgressBar,
  title: 'ProgressBar',
} as Meta;

const Template: Story<ProgressBarProps> = args => <ProgressBar {...args} />;

export const Preview = Template.bind({});
Preview.args = {
  isInteractive: false,
  max: 308,
  value: 240,
  onChangeValue: newValue => {
    console.log(newValue);
  },
};
