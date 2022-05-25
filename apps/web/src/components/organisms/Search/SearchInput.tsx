import React, { FC, useCallback, useState } from 'react';

import { ArrowLeftIcon, SearchIcon } from '@components/atoms/Icon';
import Input, { InputProps } from '@components/atoms/Input';

export interface SearchInputProps extends InputProps {
  onClose?: () => void;
  _onChange?: (value: string) => void;
  _onBlur?: (e?: React.FocusEvent<HTMLInputElement, Element> | undefined) => void;
  _onFocus?: (e?: React.FocusEvent<HTMLInputElement, Element> | undefined) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ onClose, _onChange, _onBlur, _onFocus, ...otherProps }) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (_onChange) {
        _onChange(e.target.value);
      }
    },
    [_onChange]
  );

  const handleFocus = useCallback(() => {
    setIsFocus(true);

    if (_onFocus) {
      _onFocus();
    }
  }, [_onFocus]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <div className="o-search__input">
      <Input
        prefix={
          <div className="o-search__input__icon" role="button" onClick={handleClose}>
            {isFocus ? <ArrowLeftIcon /> : <SearchIcon />}
          </div>
        }
        fullWidth
        shape="round"
        onChange={handleChange}
        onFocus={handleFocus}
        {...otherProps}
      />
    </div>
  );
};
