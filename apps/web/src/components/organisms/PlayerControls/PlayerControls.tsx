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

export type IPlayerControlViewMode = 'full' | 'mini';

export type IPlayerControlRepeatMode = 'none' | 'one' | 'all';

export interface PlayerControlsProps {
  audioSrc: string;
  author: string;
  imageSrc: string;
  isLoading: boolean;
  isShuffle: boolean;
  repeatMode: IPlayerControlRepeatMode;
  songName: string;
  viewMode: IPlayerControlViewMode;
  onEnded: () => void;
  onClickRepeat: (repeatMode: IPlayerControlRepeatMode) => void;
  onClickShuffle: () => void;
  onClickSkipNext: () => void;
  onClickSkipPrevious: () => void;
  onToggleViewMode: (newViewMode: IPlayerControlViewMode) => void;
}

type IPlayerControls = {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  repeatMode: IPlayerControlRepeatMode;
  viewMode: IPlayerControlViewMode;
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
  viewMode,
  repeatMode,
  songName,
  onEnded,
  onClickRepeat,
  onClickShuffle,
  onClickSkipNext,
  onClickSkipPrevious,
  onToggleViewMode,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [state, setState] = useState<IPlayerControls>({
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    viewMode,
    repeatMode: 'none',
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      viewMode,
      repeatMode,
    }));
  }, [viewMode, repeatMode]);

  useEffect(() => {
    if (audioRef.current) {
      if (state.repeatMode === 'one') {
        audioRef.current.loop = true;
      } else {
        audioRef.current.loop = false;
      }
    }
  }, [state.repeatMode]);

  const handleLoadMetadata = useCallback((e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    setState(prevState => ({
      ...prevState,
      currentTime: 0,
      duration: (e.target as HTMLAudioElement).duration,
    }));
  }, []);

  const handleUpdateTime = useCallback((e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    setState(prevState => ({
      ...prevState,
      currentTime: (e.target as HTMLAudioElement).currentTime,
    }));
  }, []);

  const handleEnded = useCallback(() => {
    if (onEnded) {
      onEnded();
    }

    if (state.repeatMode === 'none') {
      setState(prevState => ({
        ...prevState,
        currentTime: 0,
        isPlaying: false,
      }));
    }
  }, [state.repeatMode, onEnded]);

  const handleToggleMode = useCallback(
    (newMode: IPlayerControlViewMode) => {
      if (newMode !== state.viewMode) {
        onToggleViewMode(newMode);

        setState(prevState => ({
          ...prevState,
          viewMode: newMode,
        }));
      }
    },
    [state.viewMode, onToggleViewMode]
  );

  const handleControlPlay = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();

      setState(prevState => ({
        ...prevState,
        isPlaying: true,
      }));
    }
  }, []);

  const handleControlPause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();

      setState(prevState => ({
        ...prevState,
        isPlaying: false,
      }));
    }
  }, []);

  const handleControlToggleRepeatMode = useCallback(() => {
    const newRepeatMode = state.repeatMode === 'none' ? 'all' : state.repeatMode === 'all' ? 'one' : 'none';

    setState(prevState => ({
      ...prevState,
      repeatMode: newRepeatMode,
    }));

    onClickRepeat(newRepeatMode);
  }, [state.repeatMode, onClickRepeat]);

  const handleChangeCurrentTime = useCallback((newCurrentTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newCurrentTime;
    }
  }, []);

  return (
    <div
      className={abemClasses('o-player-controls', state.viewMode)}
      data-loading={isLoading}
      role={state.viewMode === 'mini' ? 'button' : 'none'}
      onClick={() => handleToggleMode('full')}
    >
      <audio
        className="o-player-controls_audio"
        src={audioSrc}
        ref={audioRef}
        onPlay={handleControlPlay}
        onPause={handleControlPause}
        onEnded={handleEnded}
        onLoadedMetadata={handleLoadMetadata}
        onTimeUpdate={handleUpdateTime}
      />

      <div
        className="o-player-controls_header"
        role={state.viewMode === 'full' ? 'button' : 'none'}
        onClick={() => handleToggleMode('mini')}
      >
        <div className="o-player-controls_header_title" data-loading="inherit">
          <h2>Now Playing</h2>
        </div>
        <div className="o-player-controls_header_action">
          <MoreIcon />
        </div>
      </div>

      <div className="o-player-controls_image">
        <div
          className={abemClasses('o-player-controls_image_inner', state.isPlaying && 'playing')}
          data-loading="inherit"
        >
          <img src={imageSrc} alt={songName} />
        </div>
      </div>

      <div className="o-player-controls_info">
        <div className="o-player-controls_info_name" data-loading="inherit">
          <h3>{songName}</h3>
        </div>
        <div className="o-player-controls_info_author" data-loading="inherit">
          <p>{author}</p>
        </div>
      </div>

      <div className="o-player-controls_time">
        <div className="o-player-controls_time_progress-bar" data-loading="inherit">
          <ProgressBar
            isInteractive={state.viewMode === 'full'}
            max={state.duration}
            value={state.currentTime}
            onChangeValue={handleChangeCurrentTime}
          />
        </div>
        <div className="o-player-controls_time_value" data-loading="inherit">
          <span>{toHHMMSS(state.currentTime)}</span>
        </div>
        <div className="o-player-controls_time_value" data-loading="inherit">
          <span>{toHHMMSS(state.duration)}</span>
        </div>
      </div>

      <div className="o-player-controls_actionlist" onClick={e => e.stopPropagation()}>
        <button className="o-player-controls_actionlist_item -hidden" data-loading="inherit" onClick={onClickShuffle}>
          {isShuffle ? <ShuffleIcon color="primary" /> : <ShuffleIcon />}
        </button>
        <button className="o-player-controls_actionlist_item" data-loading="inherit" onClick={onClickSkipPrevious}>
          <SkipPreviousActiveIcon />
        </button>
        {state.isPlaying ? (
          <button className="o-player-controls_actionlist_item" data-loading="inherit" onClick={handleControlPause}>
            <PauseActiveIcon />
          </button>
        ) : (
          <button className="o-player-controls_actionlist_item" data-loading="inherit" onClick={handleControlPlay}>
            <PlayActiveIcon />
          </button>
        )}
        <button className="o-player-controls_actionlist_item" data-loading="inherit" onClick={onClickSkipNext}>
          <SkipNextActiveIcon />
        </button>
        <button
          className="o-player-controls_actionlist_item -hidden"
          data-loading="inherit"
          onClick={handleControlToggleRepeatMode}
        >
          {state.repeatMode === 'none' ? (
            <RepeatIcon />
          ) : state.repeatMode === 'one' ? (
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
