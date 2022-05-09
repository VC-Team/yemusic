import React, { FC } from 'react';

import { DownloadIcon, HeartActiveIcon, HeartIcon } from '@components/atoms/Icon';
import classNames from 'classnames';

import './style.scss';

export interface SongCardProps {
  author: string;
  direction?: 'horizontal' | 'vertical';
  title: string;
  imageSrc: string;
  isLiked: boolean;
  isLoading?: boolean;
  isPlaying: boolean;
  onClick: () => void;
  onClickLike: () => void;
  onClickDownload: () => void;
}

export const SONGCARD_DISPLAY_NAME = 'SongCard';

export const SongCard: FC<SongCardProps> = ({
  author,
  direction,
  title,
  imageSrc,
  isLiked,
  isLoading,
  isPlaying,
  onClick,
  onClickLike,
  onClickDownload,
}) => {
  return (
    <div
      className={classNames('o-song-card', direction && `-${direction}`, isPlaying && '-is-playing')}
      data-loading={isLoading}
    >
      <div className="o-song-card__image" data-loading="inherit" role="button" onClick={onClick}>
        <img src={imageSrc} alt="" />
      </div>
      <div className="o-song-card__info">
        <div className="o-song-card__info__title" data-loading="inherit">
          <h4 title={title}>{title}</h4>
        </div>
        <div className="o-song-card__info__author" data-loading="inherit">
          <span />
          {isPlaying ? <p>Now playing</p> : <p title={author}>{author}</p>}
        </div>
      </div>
      <div className="o-song-card__time" data-loading="inherit">
        <time>5:08</time>
      </div>
      <div className="o-song-card__actionlist">
        <span
          className="o-song-card__actionlist__item"
          data-loading="inherit"
          role="button"
          onClick={e => {
            e.stopPropagation();
            onClickLike();
          }}
        >
          {isLiked ? <HeartActiveIcon color="primary" /> : <HeartIcon />}
        </span>
        <span
          className="o-song-card__actionlist__item"
          data-loading="inherit"
          role="button"
          onClick={e => {
            e.stopPropagation();
            onClickDownload();
          }}
        >
          <DownloadIcon />
        </span>
      </div>
    </div>
  );
};

SongCard.displayName = SONGCARD_DISPLAY_NAME;

export default SongCard;
