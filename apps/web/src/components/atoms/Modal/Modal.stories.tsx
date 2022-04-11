import { Story, Meta } from '@storybook/react';

import Modal, { ModalProps } from '.';

export default {
  component: Modal,
  title: 'Modal',
} as Meta;

const Template: Story<ModalProps> = args => <Modal {...args} />;

export const Preview = Template.bind({});
Preview.args = {
  children: 'Modal',
  open: true,
};
