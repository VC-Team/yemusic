import { Story, Meta } from '@storybook/react';

import Modal, { ModalProps } from '.';

export default {
  component: Modal,
  title: 'Modal',
} as Meta;

const Template: Story<ModalProps> = args => (
  <div>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, ab quod tempora eligendi hic totam, rerum
      non voluptatum pariatur consequatur, accusamus sapiente aliquam quisquam labore! Voluptatem unde quasi debitis
      dignissimos?
    </p>

    <Modal {...args} />
  </div>
);

export const Preview = Template.bind({});

Preview.args = {
  children: <div style={{ width: '20rem', height: '18rem', background: 'white', textAlign: 'center' }} />,
  open: true,
  onClose: () => {
    console.log('onClose');
  },
};
