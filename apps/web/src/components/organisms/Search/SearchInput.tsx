import React, { FC, useState } from 'react';

import { HomeActiveIcon, HomeIcon } from '@components/atoms/Icon';
import Input, { InputProps } from '@components/atoms/Input';

export interface SearchInputProps extends InputProps {
  onBlur?: (e?: React.FocusEvent<HTMLInputElement, Element> | undefined) => void;
  onChange?: () => void;
  onFocus?: (e?: React.FocusEvent<HTMLInputElement, Element> | undefined) => void;
  onPressEnter?: () => void;
}

export const SearchInput: FC<SearchInputProps> = ({ onBlur, onChange, onFocus, onPressEnter, ...otherProps }) => {
  const [state, setState] = useState({
    isFocus: false,
  });

  const _onFocus = (e: React.FocusEvent<HTMLInputElement, Element> | undefined) => {
    setState(prev => ({
      ...prev,
      isFocus: true,
    }));
    console.log('focus');

    if (onFocus) {
      onFocus(e);
    }
  };

  const _onBlur = (e: React.FocusEvent<HTMLInputElement, Element> | undefined) => {
    setState(prev => ({
      ...prev,
      isFocus: false,
    }));
    console.log('blur');
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <Input
      suffix={state.isFocus ? <HomeActiveIcon /> : <HomeIcon />}
      fullWidth
      {...otherProps}
      onFocus={_onFocus}
      onBlur={_onBlur}
    />
  );
};
