import React, { FC, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import './style.scss';

export interface ProgressBarProps {
  isInteractive: boolean;
  max: number;
  step: number;
  value: number;
  onChangeValue?: (newValue: number) => void;
}

type IProgressBarState = {
  isPressed: boolean;
  positionXStart: null | number;
};

const setProgressBarTransform = (progressBarRefElement: HTMLDivElement, value: number, max: number): void => {
  if (progressBarRefElement && value >= 0 && value <= max) {
    progressBarRefElement.style.setProperty('--progress-bar-transform', (value / max) * 100 + '%');
  }
};

export const ProgressBar: FC<ProgressBarProps> = ({ isInteractive, max, step, value, onChangeValue }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<IProgressBarState>({
    isPressed: false,
    positionXStart: null,
  });

  useEffect(() => {
    if (progressBarRef.current) {
      setProgressBarTransform(progressBarRef.current, value, max);
    }
  }, [max, step, value]);

  useEffect(() => {
    if (state.isPressed) {
      window.addEventListener('mouseup', handlePressUp);
      window.addEventListener('mousemove', handleDragMove);
    }

    return () => {
      if (state.isPressed) {
        window.removeEventListener('mouseup', handlePressUp);
        window.removeEventListener('mousemove', handleDragMove);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isPressed]);

  const handlePressDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isInteractive) {
      const { clientX } = e.nativeEvent;

      setState(prevState => ({
        ...prevState,
        isPressed: true,
        positionXStart: clientX,
      }));

      if (progressBarRef.current) {
        const { offsetLeft, offsetWidth } = progressBarRef.current;

        setProgressBarTransform(progressBarRef.current, e.clientX - offsetLeft, offsetWidth);
        progressBarRef.current.classList.toggle('-is-draging');
      }
    }
  };

  const handlePressUp = (e: MouseEvent) => {
    setState(prevState => ({
      ...prevState,
      isPressed: false,
      positionXStart: null,
    }));

    if (progressBarRef.current) {
      const { offsetLeft, offsetWidth } = progressBarRef.current;

      progressBarRef.current.classList.toggle('-is-draging');

      if (onChangeValue) {
        let newvalue = ((e.clientX - offsetLeft) / offsetWidth) * max;
        newvalue = newvalue < 0 ? 0 : newvalue > max ? max : newvalue;

        onChangeValue(newvalue);
      }
    }
  };

  const handleDragMove = (e: MouseEvent) => {
    if (progressBarRef.current && state.positionXStart) {
      const { offsetLeft, offsetWidth } = progressBarRef.current;

      setProgressBarTransform(progressBarRef.current, e.clientX - offsetLeft, offsetWidth);
    }
  };

  return (
    <div
      className={classNames('m-progress-bar', isInteractive && '-is-interactive')}
      onMouseDown={handlePressDown}
      ref={progressBarRef}
    >
      <div className="m-progress-bar__value" />
    </div>
  );
};

export default ProgressBar;
