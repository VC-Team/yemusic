import React, { FC } from 'react';

import classNames from 'classnames';
import { createPortal } from 'react-dom';

import './styles.scss';

export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ children, open = false, onClose, ...otherProps }) => {
  const modal = (
    <div onClick={onClose} className="m-modal">
      <div onClick={e => e.stopPropagation()} className={classNames('m-modal__sub')} {...otherProps}>
        {children}
      </div>
    </div>
  );
  return open ? createPortal(modal, document.body) : null;
};

export default Modal;
