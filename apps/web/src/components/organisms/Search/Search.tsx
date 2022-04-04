import React, { FC } from 'react';

import classNames from 'classnames';

import './styles.scss';

export interface SearchProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Search: FC<SearchProps> = ({ children, fullWidth }) => {
  return <div className={classNames('o-search', fullWidth && 'o-search--fullWidth')}>{children}</div>;
};

export default Search;
