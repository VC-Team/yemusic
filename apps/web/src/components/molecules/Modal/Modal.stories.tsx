import { Story, Meta } from '@storybook/react';

import Modal, { ModalProps } from '.';

export default {
  component: Modal,
  title: 'Modal',
} as Meta;

const Template: Story<ModalProps> = args => <Modal {...args} />;

export const Preview = Template.bind({});

Preview.args = {
  children: <div style={{ width: '20rem', height: '18rem', background: 'white', textAlign: 'center' }}>Modal</div>,
  open: true,
};
