import React, { FC, useState } from 'react';

import { HomeActiveIcon, HomeIcon } from '@components/atoms/Icon';
import Input, { InputProps } from '@components/atoms/Input';

export interface SearchInputProps extends InputProps {
  onBlur?: (e?: React.FocusEvent<HTMLInputElement, Element> | undefined) => void;
  onFocus?: (e?: React.FocusEvent<HTMLInputElement, Element> | undefined) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ onBlur, onFocus, ...otherProps }) => {
  const [isFocus, setIsFocus] = useState(false);

  const _onFocus = (e: React.FocusEvent<HTMLInputElement, Element> | undefined) => {
    setIsFocus(true);

    if (onFocus) {
      onFocus(e);
    }
  };

  const _onBlur = (e: React.FocusEvent<HTMLInputElement, Element> | undefined) => {
    setIsFocus(false);

    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <Input
      suffix={isFocus ? <HomeActiveIcon /> : <HomeIcon />}
      fullWidth
      {...otherProps}
      onFocus={_onFocus}
      onBlur={_onBlur}
    />
  );
};
