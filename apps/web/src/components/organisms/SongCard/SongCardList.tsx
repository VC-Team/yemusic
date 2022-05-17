import React, { Children, cloneElement, FC, isValidElement, useCallback, useMemo, useRef } from 'react';

import abemClasses from '@utils/abemClasses';

import { SongCard } from '.';
import './style.scss';

export interface SongCardListProps {
  isLoading: boolean;
  viewMode: 'list' | 'grid';
  title: string;
}

export const SongCardList: FC<SongCardListProps> = ({ children, isLoading, viewMode, title }) => {
  const isPress = useRef<boolean>(false);
  const isClick = useRef<boolean>(false);
  const songCardListContentInnerRef = useRef<HTMLDivElement>(null);
  const contentClientXStart = useRef<number>(0);
  const contentInnerTranslateX = useRef<number>(0);

  const songCardListChildren = useMemo(() => {
    return Children.map(children, child => {
      if (isValidElement(child) && child.type === SongCard) {
        return cloneElement(child, {
          direction: viewMode === 'list' ? 'horizontal' : 'vertical',
        });
      }

      return null;
    });
  }, [children, viewMode]);

  const handleMouseDownCapture = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (viewMode === 'grid') {
        isClick.current = true;
        isPress.current = true;
        contentClientXStart.current = e.nativeEvent.clientX;
      }
    },
    [viewMode]
  );

  const handleMouseUpCaptureAndLeave = useCallback(() => {
    if (viewMode === 'grid') {
      isPress.current = false;

      if (songCardListContentInnerRef.current) {
        const getStyle = getComputedStyle(songCardListContentInnerRef.current);
        const matrix = new WebKitCSSMatrix(getStyle.transform);
        contentInnerTranslateX.current = matrix.m41;
      }
    }
  }, [viewMode]);

  const handleMouseMoveCapture = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (viewMode === 'grid' && isPress.current) {
        if (isClick.current) {
          isClick.current = false;
        }

        if (songCardListContentInnerRef.current && songCardListContentInnerRef.current.parentElement) {
          const newTranslateX = contentInnerTranslateX.current + e.nativeEvent.clientX - contentClientXStart.current;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const contentWidth = songCardListContentInnerRef.current.parentElement.clientWidth;
          const contentInnerWidth = songCardListContentInnerRef.current.scrollWidth;

          if (newTranslateX <= 0 && newTranslateX >= contentWidth - contentInnerWidth) {
            songCardListContentInnerRef.current.style.transform = `translateX(${newTranslateX}px)`;
          }
        }
      }
    },
    [viewMode]
  );

  const handleClickCapture = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (viewMode === 'grid') {
        if (isClick.current === false) {
          e.stopPropagation();
        }
      }
    },
    [viewMode]
  );

  return (
    <div className={abemClasses('o-song-card-list', viewMode)} data-loading={isLoading}>
      <div className="o-song-card-list__title" data-loading="inherit">
        <h2>{title}</h2>
      </div>
      <div
        className="o-song-card-list__content"
        onMouseDownCapture={handleMouseDownCapture}
        onMouseUpCapture={handleMouseUpCaptureAndLeave}
        onMouseMoveCapture={handleMouseMoveCapture}
        onMouseLeave={handleMouseUpCaptureAndLeave}
        onClickCapture={handleClickCapture}
      >
        <div className="o-song-card-list__content__inner" ref={songCardListContentInnerRef}>
          {songCardListChildren}
        </div>
      </div>
    </div>
  );
};
