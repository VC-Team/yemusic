import React, { FC } from 'react';

import abemClasses from '@utils/abemClasses';

import './style.scss';

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
      className={abemClasses('a-button', shape, fullWidth && 'full-width', disabled && 'disabled')}
      {...otherProps}
    >
      {prefix && <span className="a-button_addon">{prefix}</span>}
      {children && <span className="a-button_text">{children}</span>}
      {suffix && <span className="a-button_addon">{suffix}</span>}
    </button>
  );
};

export default Button;
