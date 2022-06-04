import React, { FC } from 'react';

import abemClasses from '@utils/abemClasses';

import './style.scss';

export interface InputProps
  extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'prefix'> {
  fullWidth?: boolean;
  prefix?: React.ReactNode;
  shape?: 'default' | 'round';
  suffix?: React.ReactNode;
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
    <div className={abemClasses('a-input-group', disabled && 'disabled', fullWidth && 'full-width', shape)}>
      {prefix && <span className="a-input-group_addon -prefix">{prefix}</span>}
      <input className="a-input-group_input" disabled={disabled} {...otherProps} />
      {suffix && <span className="a-input-group_addon -suffix">{suffix}</span>}
    </div>
  );
};

export default Input;
