import React, { FC, useState } from 'react';

import { DownloadIcon, HeartActiveIcon, HeartIcon, MoreIcon } from '@components/atoms/Icon';
import classNames from 'classnames';

import './style.scss';
import { SongCardListProps } from '.';

export interface SongCardProps {
  _type?: SongCardListProps['mode'];
  author: string;
  imagelUrl: string;
  isPlaying: boolean;
  isLiked: boolean;
  name: string;
  time: string;
  onClick: () => void;
  onDownload: () => void;
  onLike: () => void;
}

export const SongCard: FC<SongCardProps> = ({
  _type = 'list',
  author,
  imagelUrl,
  isLiked,
  isPlaying,
  name,
  time,
  onClick,
  onDownload,
  onLike,
}) => {
  const [state, setState] = useState({
    isLiked,
  });

  const handleClickSongCard = () => {
    console.log('handleClickSongCard');

    if (onClick) {
      onClick();
    }
  };

  const handleClickLike = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (onLike) {
      onLike();
    }

    setState(prevState => ({
      ...prevState,
      isLiked: !prevState.isLiked,
    }));
  };

  const handleClickDownload = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (onDownload) {
      onDownload();
    }
  };

  return (
    <div
      className={classNames('o-song-card', _type && `-${_type}`, isPlaying && '-is-playing')}
      onClick={handleClickSongCard}
    >
      <div className="o-song-card__image">
        <img src={imagelUrl} alt={name} />
      </div>
      <div className="o-song-card__info">
        <h4 className="o-song-card__info__name">{name}</h4>
        <div className="o-song-card__info__author">
          {isPlaying && <span />}
          <p>{isPlaying ? 'Now playing' : author}</p>
        </div>
      </div>
      <span className="o-song-card__time">{time}</span>
      <div className="o-song-card__actionlist">
        <div className="o-song-card__actionlist__item" role="button" onClick={handleClickLike}>
          {state.isLiked ? <HeartActiveIcon color="primary" /> : <HeartIcon />}
        </div>
        <div className="o-song-card__actionlist__item" role="button" onClick={handleClickDownload}>
          <DownloadIcon />
        </div>
        <div className="o-song-card__actionlist__item" role="button">
          <MoreIcon />
        </div>
      </div>
    </div>
  );
};

export default SongCard;
