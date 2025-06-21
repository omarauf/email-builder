import type { Theme, SxProps } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { converter } from '@/utils/converter';
import type { ContainerTree, ContainerIndex } from './type';

export function useContainerStyle(container: ContainerTree, idx: ContainerIndex) {
  const [screen, getStructureAvailableWidth] = useBuilderStore(
    useShallow((s) => [s.screen, s.getStructureAvailableWidth])
  );
  const { style } = container;
  const { padding, width, backgroundColor, backgroundImage, border, borderRadius } = style;

  const structureWidth = getStructureAvailableWidth(idx);

  const containerWrapper: SxProps<Theme> = {
    padding: converter.inset(padding?.[screen] || padding?.desktop, 'px'),
    width: screen === 'desktop' ? `${width}px` : `${((width / structureWidth) * 100).toFixed(2)}%`,
  };

  const containerStyle: SxProps<Theme> = {
    ...converter.image(backgroundImage),
    ...converter.border(border),
    backgroundColor,
    borderRadius: converter.inset(borderRadius, 'px'),
  };

  return { containerWrapper, containerStyle };
}

export function containerDropZoneStyle(
  hover: boolean,
  over: boolean,
  selected: boolean,
  active: boolean,
  drag: boolean,
  options?: { animation?: boolean }
): SxProps<Theme> {
  const { animation = true } = options || {};

  let style: SxProps<Theme> = {
    position: 'relative',
    height: '92px',
    alignItems: 'center',
    borderRadius: 0.5,
    bgcolor: 'primary.lighter',
    color: 'grey.700',
    borderColor: 'primary.light',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
  };

  const beforeStyle: SxProps<Theme> = {};

  if (over) {
    style = {
      ...style,
      bgcolor: 'primary.light',
      color: 'primary.main',
      borderColor: 'primary.main',
    };
  }

  if (selected) {
    style = {
      ...style,
      borderStyle: 'solid',
      boxShadow: (theme) => `0 0 0 1px ${theme.palette.primary.main}`,
    };
  }

  if (active) {
    style = {
      ...style,
      borderStyle: 'solid',
      boxShadow: (theme) => `0 0 0 1px ${theme.palette.primary.main}`,
    };
  }

  if (hover) {
    style = {
      ...style,
      boxShadow: (theme) => `0 0 0 1px ${theme.palette.primary.main}`,
      borderStyle: 'solid',
      borderColor: 'primary.main',
    };
  }

  // if (active && selected) {}

  if (drag) {
    style = { ...style, filter: 'grayscale(90%)' };
  }

  if (animation) {
    style = {
      ...style,
      transition: (theme) => theme.transitions.create('all'),
    };
  }

  return {
    ...style,
    '&:before': beforeStyle,
  };
}
