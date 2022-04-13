import React, { Children, cloneElement, FC, isValidElement, useMemo } from 'react';

import classNames from 'classnames';

import './style.scss';

export interface SongCardListProps {
  mode: 'list' | 'grid';
}

export const SongCardList: FC<SongCardListProps> = ({ children, mode }) => {
  const SongCardListChildren = useMemo(() => {
    return Children.map(children, child => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (isValidElement(child) && (child.type as any).name === 'SongCard') {
        return cloneElement(child, {
          _type: mode,
        });
      }

      return null;
    });
  }, [children, mode]);

  return <div className={classNames('o-song-card-list')}>{SongCardListChildren}</div>;
};
