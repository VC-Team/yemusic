import React, { FC } from 'react';

import './style.scss';

export interface PlayerControlsProps {
  mode?: 'full' | 'mini';
}

export const PlayerControls: FC<PlayerControlsProps> = () => {
  return <div>PlayerControls</div>;
};

export default PlayerControls;
