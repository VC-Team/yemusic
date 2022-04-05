import React, { FC } from 'react';

import classNames from 'classnames';
import './styles.scss';

export interface ButtonProps
  extends Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'prefix'> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  fullWidth?: boolean;
  shape?: 'default' | 'circle';
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  disabled,
  fullWidth,
  prefix,
  shape = 'default',
  suffix,
  ...otherProps
}) => {
  return (
    <button
      className={classNames('a-button', `-${shape}`, {
        '-full-width': fullWidth,
        '-disabled': disabled,
        className,
      })}
      {...otherProps}
    >
      {prefix && <span className="a-button__addon">{prefix}</span>}
      {children && <span className="a-button__text">{children}</span>}
      {suffix && <span className="a-button__addon">{suffix}</span>}
    </button>
  );
};

export default Button;
