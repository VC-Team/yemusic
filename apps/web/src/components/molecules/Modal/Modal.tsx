import React, { FC } from 'react';

import { createPortal } from 'react-dom';

import './style.scss';

export interface ModalProps {
  children?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ children, open = false, onClose }) => {
  const modal = (
    <div onClick={onClose} className="m-modal">
      <div className="m-modal_content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

  return open ? createPortal(modal, document.body) : null;
};

export default Modal;
