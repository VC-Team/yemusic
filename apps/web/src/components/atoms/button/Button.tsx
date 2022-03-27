import React, { FC } from 'react';

import classNames from 'classnames';
import './styles.scss';

export interface ButtonProps {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  shape: 'default' | 'circle';
  type: 'submit' | 'button';
  text: string;
}

export const Button: FC<ButtonProps> = ({
  shape = 'default',
  disabled,
  fullWidth,
  text = '',
  type = 'button',
  prefix,
  suffix,
  ...otherProps
}) => {
  const classnames = classNames('a-button-group', shape === 'default' ? 'default' : '-circle', {
    '-full-width': fullWidth,
    '-disabled': disabled,
  });

  return (
    <button className={classnames}>
      {prefix && <span className="a-button-group__addon">{prefix}</span>}
      {text && <span className="a-button-group__text">{text}</span>}
      {suffix && <span className="a-button-group__addon">{suffix}</span>}
    </button>
  );
};

export default Button;
