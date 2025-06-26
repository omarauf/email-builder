import { useMemo } from 'react';

export function useBorderStyle(
  hover: boolean,
  selected: boolean,
  active: boolean,
  drag: boolean,
  borderColor: 'black' | 'blue' = 'black'
) {
  return useMemo(() => {
    const classes: string[] = ['transition-all'];

    const beforeClasses: string[] = ['before:transition-all'];

    beforeClasses.push(
      'before:rounded before:border before:border-transparent before:content-[" "] before:pointer-events-none before:absolute',
      'before:z-2 before:top-px before:right-px before:bottom-px before:left-px'
    );

    if (hover) {
      beforeClasses.push(
        borderColor === 'black'
          ? 'before:shadow-[0_0_0_2px_black]'
          : 'before:shadow-[0_0_0_2px_#8ab7ec]'
      );
    }

    if (selected) {
      beforeClasses.push(
        borderColor === 'black'
          ? 'before:shadow-[0_0_0_2px_black]'
          : 'before:shadow-[0_0_0_2px_#8ab7ec]'
      );
    }

    if (active && !selected) {
      beforeClasses.push('before:shadow-[0_0_0_2px_#8ab7ec]');
    }

    if (drag) {
      classes.push('grayscale-[90%]');
    }

    return {
      classes,
      beforeClasses,
    };
  }, [active, borderColor, drag, hover, selected]);
}
