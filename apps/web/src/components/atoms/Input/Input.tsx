import React, { FC } from 'react';

import classNames from 'classnames';
import './styles.scss';

export interface InputProps
  extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'prefix'> {
  prefix?: React.ReactNode;
  shape?: 'default' | 'round';
  suffix?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input: FC<InputProps> = ({
  className,
  disabled,
  fullWidth,
  prefix,
  shape = 'default',
  suffix,
  ...otherProps
}) => {
  return (
    <div className={classNames('a-input-group', disabled && '-disabled', fullWidth && '-full-width', `-${shape}`)}>
      {prefix && <span className="a-input-group__addon -prefix">{prefix}</span>}
      <input className="a-input-group__input" disabled={disabled} {...otherProps} />
      {suffix && <span className="a-input-group__addon -suffix">{suffix}</span>}
    </div>
  );
};

export default Input;
