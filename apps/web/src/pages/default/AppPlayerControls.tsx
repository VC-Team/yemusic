import { FC, useState } from 'react';

import PlayerControls, { IPlayerControlViewMode } from '@components/organisms/PlayerControls';
import abemClasses from '@utils/abemClasses';

import './style.scss';

interface AppPlayerControlsProps {
  device: 'mobile' | 'desktop';
}

type IAppPlayerControlsState = {
  playerControlsViewMode: IPlayerControlViewMode;
};

export const AppPlayerControls: FC<AppPlayerControlsProps> = ({ device }) => {
  const [state, setState] = useState<IAppPlayerControlsState>({
    playerControlsViewMode: 'mini',
  });

  const handleToggleViewMode = (viewMode: IPlayerControlViewMode) => {
    setState(prevState => ({
      ...prevState,
      playerControlsViewMode: viewMode,
    }));
  };

  return (
    <div className={abemClasses('c-app-default_player-controls', device, state.playerControlsViewMode)}>
      <PlayerControls
        audioSrc="https://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4"
        author="Khoảng cách"
        imageSrc="https://i.scdn.co/image/ab67616d00001e02afb5dbb4ef5e1d30ff07b248"
        isLoading={false}
        isShuffle={true}
        repeatMode="all"
        songName="The Cassette"
        viewMode="mini"
        onClickRepeat={() => {
          console.log('');
        }}
        onClickShuffle={() => {
          console.log('');
        }}
        onClickSkipNext={() => {
          console.log('');
        }}
        onClickSkipPrevious={() => {
          console.log('');
        }}
        onEnded={() => {
          console.log('');
        }}
        onToggleViewMode={handleToggleViewMode}
      />
    </div>
  );
};
