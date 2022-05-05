import React, { FC, useState } from 'react';

import { HomeActiveIcon, HomeIcon } from '@components/atoms/Icon';
import Input, { InputProps } from '@components/atoms/Input';

export interface SearchInputProps extends InputProps {
  _onChange?: (value: string) => void;
  _onBlur?: (e?: React.FocusEvent<HTMLInputElement, Element> | undefined) => void;
  _onFocus?: (e?: React.FocusEvent<HTMLInputElement, Element> | undefined) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ _onChange, _onBlur, _onFocus, ...otherProps }) => {
  const [isFocus, setIsFocus] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (_onChange) {
      _onChange(e?.target?.value);
    }
  };

  const onFocus = () => {
    setIsFocus(true);

    if (_onFocus) {
      _onFocus();
    }
  };

  const onBlur = () => {
    setIsFocus(false);

    if (_onBlur) {
      _onBlur();
    }
  };

  return (
    <Input
      prefix={isFocus ? <HomeActiveIcon /> : <HomeIcon />}
      fullWidth
      shape="round"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      {...otherProps}
    />
  );
};
