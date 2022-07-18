import React, { FC, useCallback } from 'react';

import { ArrowLeftIcon, SearchIcon } from '@components/atoms/Icon';
import Input, { InputProps } from '@components/atoms/Input';

import './style.scss';

export interface SearchInputProps extends InputProps {
  canSearch?: boolean;
  onClose?: () => void;
  onChangeInject?: (value: string) => void;
  onFocusInject?: (e?: React.FocusEvent<HTMLInputElement> | undefined) => void;
}

export const SearchInput: FC<SearchInputProps> = ({
  canSearch = false,
  onClose,
  onChangeInject,
  onFocusInject,
  ...otherProps
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChangeInject) {
        onChangeInject(e.target.value);
      }
    },
    [onChangeInject]
  );

  const handleFocus = useCallback(() => {
    if (onFocusInject) {
      onFocusInject();
    }
  }, [onFocusInject]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <div className="o-search_input">
      <Input
        prefix={
          <div className="o-search_input_icon" role="button" onClick={handleClose}>
            {canSearch ? <ArrowLeftIcon /> : <SearchIcon />}
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
