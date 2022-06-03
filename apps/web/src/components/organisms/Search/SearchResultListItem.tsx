import React, { FC } from 'react';

import { ClockIcon, CloseIcon } from '@components/atoms/Icon';
import abemClasses from '@utils/abemClasses';

import './style.scss';

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
    <div className={abemClasses('o-search_resultlist_item', type)} role="button" onClick={handleClickSearchResult}>
      {type === 'recent' ? (
        <div className="o-search_resultlist_item_icon" data-loading="inherit">
          <ClockIcon />
        </div>
      ) : (
        <div className="o-search_resultlist_item_thumbnail" data-loading="inherit">
          <img src={thumbnailUrl} alt={name} />
        </div>
      )}
      <div className="o-search_resultlist_item_info">
        <div className="o-search_resultlist_item_info_name" data-loading="inherit">
          <h3>{name}</h3>
        </div>
        <div className="o-search_resultlist_item_info_author" data-loading="inherit">
          <p>{author}</p>
        </div>
      </div>
      {type === 'recent' && (
        <div
          className="o-search_resultlist_item_action"
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
