import { Meta, Story } from '@storybook/react';

import { withProviders } from './withProviders';

const HomePage = () => <div>HomePage</div>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FirstProvider = ({ children }: any) => (
  <div>
    <p>{'<FirstProvider>'}</p>
    {children}
    <p>{'</FirstProvider>'}</p>
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SecondProvider = ({ children }: any) => (
  <div>
    <p>{'<SecondProvider>'}</p>
    {children}
    <p>{'</SecondProvider>'}</p>
  </div>
);

const SimpleWithProviders = withProviders(FirstProvider, SecondProvider)(HomePage);

export default {
  component: SimpleWithProviders,
  title: 'withProviders',
} as Meta;

const Template: Story = args => <SimpleWithProviders {...args} />;

export const Preview = Template.bind({});

Preview.args = {};
