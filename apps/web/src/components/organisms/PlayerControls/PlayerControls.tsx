import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import {
  MoreIcon,
  PauseActiveIcon,
  PlayActiveIcon,
  RepeatIcon,
  RepeatOneIcon,
  ShuffleIcon,
  SkipNextActiveIcon,
  SkipPreviousActiveIcon,
} from '@components/atoms/Icon';
import ProgressBar from '@components/molecules/ProgressBar';
import abemClasses from '@utils/abemClasses';

import './style.scss';

export interface PlayerControlsProps {
  audioSrc: string;
  author: string;
  imageSrc: string;
  isLoading: boolean;
  isShuffle: boolean;
  mode: 'full' | 'mini';
  repeat: 'none' | 'one' | 'all';
  songName: string;
  onEnded: () => void;
  onClickRepeat: () => void;
  onClickShuffle: () => void;
  onClickSkipNext: () => void;
  onClickSkipPrevious: () => void;
}

type IPlayerControls = {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  mode: PlayerControlsProps['mode'];
};

function toHHMMSS(secs: number) {
  const secNum = parseInt(String(secs), 10);
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor(secNum / 60) % 60;
  const seconds = secNum % 60;

  return [hours, minutes, seconds]
    .map(v => (v < 10 ? '0' + v : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
}

export const PlayerControls: FC<PlayerControlsProps> = ({
  audioSrc,
  author,
  imageSrc,
  isLoading,
  isShuffle,
  mode,
  repeat,
  songName,
  onEnded,
  onClickRepeat,
  onClickShuffle,
  onClickSkipNext,
  onClickSkipPrevious,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [state, setState] = useState<IPlayerControls>({
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    mode,
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      mode,
    }));
  }, [mode]);

  useEffect(() => {
    if (audioRef.current) {
      if (repeat === 'one') {
        audioRef.current.loop = true;
      } else {
        audioRef.current.loop = false;
      }
    }
  }, [repeat]);

  const handleLoadMetadata = useCallback(
    (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
      setState(prevState => ({
        ...prevState,
        currentTime: 0,
        duration: (e.target as HTMLAudioElement).duration,
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [audioSrc]
  );

  const handleUpdateTime = useCallback(
    (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
      setState(prevState => ({
        ...prevState,
        currentTime: (e.target as HTMLAudioElement).currentTime,
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [audioSrc]
  );

  const handleEnded = useCallback(() => {
    if (onEnded) {
      onEnded();
    }

    if (repeat === 'none') {
      setState(prevState => ({
        ...prevState,
        currentTime: 0,
        isPlaying: false,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioSrc, repeat]);

  const handleToggleMode = useCallback(
    (newMode: IPlayerControls['mode']) => {
      if (newMode !== state.mode) {
        setState(prevState => ({
          ...prevState,
          mode: newMode,
        }));
      }
    },
    [state.mode]
  );

  const handleControlPlay = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();

      setState(prevState => ({
        ...prevState,
        isPlaying: true,
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioSrc]);

  const handleControlPause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();

      setState(prevState => ({
        ...prevState,
        isPlaying: false,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioSrc]);

  const handleChangeCurrentTime = useCallback(
    (newCurrentTime: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = newCurrentTime;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [audioSrc]
  );

  return (
    <div
      className={abemClasses('o-player-controls', state.mode)}
      data-loading={isLoading}
      role={state.mode === 'mini' ? 'button' : 'none'}
      onClick={() => handleToggleMode('full')}
    >
      <audio
        className="o-player-controls__audio"
        src={audioSrc}
        ref={audioRef}
        onEnded={handleEnded}
        onLoadedMetadata={handleLoadMetadata}
        onTimeUpdate={handleUpdateTime}
      />

      <div
        className="o-player-controls__header"
        role={state.mode === 'full' ? 'button' : 'none'}
        onClick={() => handleToggleMode('mini')}
      >
        <div className="o-player-controls__header__title" data-loading="inherit">
          <h2>Now Playing</h2>
        </div>
        <div className="o-player-controls__header__action">
          <MoreIcon />
        </div>
      </div>

      <div className="o-player-controls__image">
        <div
          className={abemClasses('o-player-controls__image__inner', state.isPlaying && 'playing')}
          data-loading="inherit"
        >
          <img src={imageSrc} alt={songName} />
        </div>
      </div>

      <div className="o-player-controls__info">
        <div className="o-player-controls__info__name" data-loading="inherit">
          <h3>{songName}</h3>
        </div>
        <div className="o-player-controls__info__author" data-loading="inherit">
          <p>{author}</p>
        </div>
      </div>

      <div className="o-player-controls__time">
        <div className="o-player-controls__time__progress-bar" data-loading="inherit">
          <ProgressBar
            isInteractive={state.mode === 'full'}
            max={state.duration}
            value={state.currentTime}
            onChangeValue={handleChangeCurrentTime}
          />
        </div>
        <div className="o-player-controls__time__value" data-loading="inherit">
          <span>{toHHMMSS(state.currentTime)}</span>
        </div>
        <div className="o-player-controls__time__value" data-loading="inherit">
          <span>{toHHMMSS(state.duration)}</span>
        </div>
      </div>

      <div className="o-player-controls__actionlist">
        <button className="o-player-controls__actionlist__item -hidden" data-loading="inherit" onClick={onClickShuffle}>
          {isShuffle ? <ShuffleIcon color="primary" /> : <ShuffleIcon />}
        </button>
        <button
          className="o-player-controls__actionlist__item"
          data-loading="inherit"
          onClick={e => {
            e.stopPropagation();
            onClickSkipPrevious();
          }}
        >
          <SkipPreviousActiveIcon />
        </button>
        {state.isPlaying ? (
          <button
            className="o-player-controls__actionlist__item"
            data-loading="inherit"
            onClick={e => {
              e.stopPropagation();
              handleControlPause();
            }}
          >
            <PauseActiveIcon />
          </button>
        ) : (
          <button
            className="o-player-controls__actionlist__item"
            data-loading="inherit"
            onClick={e => {
              e.stopPropagation();
              handleControlPlay();
            }}
          >
            <PlayActiveIcon />
          </button>
        )}
        <button
          className="o-player-controls__actionlist__item"
          data-loading="inherit"
          onClick={e => {
            e.stopPropagation();
            onClickSkipNext();
          }}
        >
          <SkipNextActiveIcon />
        </button>
        <button className="o-player-controls__actionlist__item -hidden" data-loading="inherit" onClick={onClickRepeat}>
          {repeat === 'none' ? (
            <RepeatIcon />
          ) : repeat === 'one' ? (
            <RepeatOneIcon color="primary" />
          ) : (
            <RepeatIcon color="primary" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
