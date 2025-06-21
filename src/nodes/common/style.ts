import type { Theme, SxProps } from '@mui/material';

export function borderStyle(
  hover: boolean,
  selected: boolean,
  active: boolean,
  drag: boolean,
  options?: { animation?: boolean; borderColor?: 'black' | 'blue' }
): SxProps<Theme> {
  const { borderColor = 'black', animation = true } = options || {};

  let style: SxProps<Theme> = {};

  let beforeStyle: SxProps<Theme> = {
    borderRadius: 0.5,
    borderWidth: 1,
    bottom: '1px',
    content: '" "',
    left: '1px',
    pointerEvents: 'none',
    position: ' absolute',
    right: '1px',
    top: '1px',
    zIndex: 2,
  };

  if (hover) {
    beforeStyle = {
      ...beforeStyle,
      boxShadow: borderColor === 'black' ? `0 0 0 2px black` : `0 0 0 2px #8ab7ec`,
    };
  }

  if (selected) {
    beforeStyle = {
      ...beforeStyle,
      boxShadow: borderColor === 'black' ? `0 0 0 2px black` : `0 0 0 2px #8ab7ec`,
    };
  }

  if (active && !selected) {
    beforeStyle = {
      ...beforeStyle,
      boxShadow: () => `0 0 0 2px #8ab7ec`,
    };
  }

  // if (active && selected) {}

  if (drag) {
    style = { ...style, filter: 'grayscale(90%)' };
  }

  if (animation) {
    beforeStyle = {
      ...beforeStyle,
      transition: (theme) => theme.transitions.create('all'),
    };
  }

  return {
    ...style,
    transition: (theme) => theme.transitions.create('all'),
    '&:before': beforeStyle,
  };
}
