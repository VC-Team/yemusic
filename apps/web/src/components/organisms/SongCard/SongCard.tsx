import React, { FC } from 'react';

import { DownloadIcon, HeartActiveIcon, HeartIcon } from '@components/atoms/Icon';
import abemClasses from '@utils/abemClasses';

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
  const handleClickLike = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    onClickLike();
  };

  const handleClickDownload = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    onClickDownload();
  };

  return (
    <div className={abemClasses('o-song-card', direction, isPlaying && 'is-playing')} data-loading={isLoading}>
      <div className="o-song-card_image" data-loading="inherit" role="button" onClick={onClick}>
        <img src={imageSrc} alt={title} />
      </div>
      <div className="o-song-card_info">
        <div className="o-song-card_info_title" data-loading="inherit">
          <h4 title={title}>{title}</h4>
        </div>
        <div className="o-song-card_info_author" data-loading="inherit">
          <span />
          {isPlaying ? <p>Now playing</p> : <p title={author}>{author}</p>}
        </div>
      </div>
      <div className="o-song-card_time" data-loading="inherit">
        <time>5:08</time>
      </div>
      <div className="o-song-card_actionlist">
        <span className="o-song-card_actionlist_item" data-loading="inherit" role="button" onClick={handleClickLike}>
          {isLiked ? <HeartActiveIcon color="primary" /> : <HeartIcon />}
        </span>
        <span
          className="o-song-card_actionlist_item"
          data-loading="inherit"
          role="button"
          onClick={handleClickDownload}
        >
          <DownloadIcon />
        </span>
      </div>
    </div>
  );
};

export default SongCard;
