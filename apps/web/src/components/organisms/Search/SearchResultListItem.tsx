import React, { FC } from 'react';

import { ClockIcon, CloseIcon } from '@components/atoms/Icon';
import abemClasses from '@utils/abemClasses';

export interface SearchResultListItemProps {
  author: string;
  name: string;
  id: string;
  thumbnailUrl: string;
  type: 'recent' | 'result';
  onClickRemoveSearchRecent: (id: string | number) => void;
  onClickSearchResult: (id: string | number) => void;
}

export const SearchResultListItem: FC<SearchResultListItemProps> = ({
  author,
  name,
  id,
  thumbnailUrl,
  type,
  onClickRemoveSearchRecent,
  onClickSearchResult,
}) => {
  const handleClickRemoveSearchRecentSong = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClickRemoveSearchRecent(id);
  };

  const handleClickSearchResult = () => {
    onClickSearchResult(id);
  };

  return (
    <div className={abemClasses('o-search__result-list__item', type)} role="button" onClick={handleClickSearchResult}>
      {type === 'recent' ? (
        <div className="o-search__result-list__item__icon" data-loading="inherit">
          <ClockIcon />
        </div>
      ) : (
        <div className="o-search__result-list__item__thumbnail" data-loading="inherit">
          <img src={thumbnailUrl} alt={name} />
        </div>
      )}
      <div className="o-search__result-list__item__info">
        <div className="o-search__result-list__item__info__name" data-loading="inherit">
          <h3>{name}</h3>
        </div>
        <div className="o-search__result-list__item__info__author" data-loading="inherit">
          <p>{author}</p>
        </div>
      </div>
      {type === 'recent' && (
        <div
          className="o-search__result-list__item__action"
          role="button"
          data-loading="inherit"
          onClick={handleClickRemoveSearchRecentSong}
        >
          <CloseIcon />
        </div>
      )}
    </div>
  );
};
