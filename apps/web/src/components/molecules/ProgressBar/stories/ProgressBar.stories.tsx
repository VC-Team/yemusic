import { Story, Meta } from '@storybook/react';

import ProgressBar, { ProgressBarProps } from '..';

export default {
  component: ProgressBar,
  title: 'Molecules/ProgressBar',
} as Meta;

const Template: Story<ProgressBarProps> = args => <ProgressBar {...args} />;

export const Example = Template.bind({});
Example.args = {
  isInteractive: false,
  max: 308,
  value: 240,
  onChangeValue: newValue => {
    console.log(newValue);
  },
};
