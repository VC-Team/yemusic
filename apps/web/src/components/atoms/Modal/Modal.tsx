import React, { FC } from 'react';

import classNames from 'classnames';
import { createPortal } from 'react-dom';

import './styles.scss';

export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  className: object;
  children: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ className, children, open = false, onClose, ...otherProps }) => {
  const modal = (
    <div
      className={classNames('a-modal', {
        className,
      })}
      {...otherProps}
      onClick={onClose}
    >
      {children}
    </div>
  );
  return open ? createPortal(modal, document.body) : null;
};

export default Modal;
