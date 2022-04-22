import React, { FC } from 'react';

import { createPortal } from 'react-dom';

import './styles.scss';

export interface ModalProps {
  children?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ children, open = false, onClose, ...otherProps }) => {
  const modal = (
    <div onClick={onClose} className="m-modal">
      <div onClick={e => e.stopPropagation()} {...otherProps}>
        {children}
      </div>
    </div>
  );
  return open ? createPortal(modal, document.body) : null;
};

export default Modal;
