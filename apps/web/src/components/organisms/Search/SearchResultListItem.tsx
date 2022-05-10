import React, { FC } from 'react';

import { CloseIcon, RecentIcon } from '@components/atoms/Icon';
import classNames from 'classnames';

export interface SearchResultListItemProps {
  author?: string;
  name?: string;
  songId?: string;
  thumbnailUrl?: string;
  type?: 'recent' | 'loading' | 'result';
}

export const SearchResultListItem: FC<SearchResultListItemProps> = ({
  author,
  name,
  songId,
  thumbnailUrl,
  type,
  ...otherProps
}) => {
  return (
    <div className="o-search__result-list__item" {...otherProps}>
      <div className={classNames('thumbnail', type && `thumbnail--${type}`)}>
        {type === 'result' && <img src={thumbnailUrl} alt="thumbnail" className="thumbnail__image" />}
        {type === 'recent' && <RecentIcon />}
      </div>
      <div className={classNames('content', type === 'recent' && `content--${type}`)}>
        <p className={classNames('content__name', type === 'loading' && `content__name--${type}`)}>{name}</p>
        <p className={classNames('content__author', type === 'loading' && `content__author--${type}`)}>{author}</p>
      </div>
      {type === 'recent' && (
        <span className="icon">
          <CloseIcon />
        </span>
      )}
    </div>
  );
};
