import React, { FC } from 'react';

import classNames from 'classnames';
import './styles.scss';

export interface ButtonProps
  extends Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'prefix'> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  fullWidth?: boolean;
  shape?: 'default' | 'circle';
  children: string;
}

export const Button: FC<ButtonProps> = ({
  shape = 'default',
  disabled,
  fullWidth,
  children = '',
  prefix,
  suffix,
  ...otherProps
}) => {
  const classnames = classNames('a-button-group', `-${shape}`, {
    '-full-width': fullWidth,
    '-disabled': disabled,
  });

  return (
    <button className={classnames} {...otherProps}>
      {prefix && <span className="a-button-group__addon">{prefix}</span>}
      {children && <span className="a-button-group__text">{children}</span>}
      {suffix && <span className="a-button-group__addon">{suffix}</span>}
    </button>
  );
};

export default Button;
