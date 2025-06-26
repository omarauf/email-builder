import { useShallow } from 'zustand/react/shallow';
import { useMemo, type CSSProperties } from 'react';
import { converter } from '@/utils/converter';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { ContainerTree, ContainerIndex } from './type';

export function useContainerStyle(container: ContainerTree, idx: ContainerIndex) {
  const [screen, getStructureAvailableWidth] = useBuilderStore(
    useShallow((s) => [s.screen, s.getStructureAvailableWidth])
  );
  const { style } = container;
  const { padding, width, backgroundColor, backgroundImage, border, borderRadius } = style;

  const structureWidth = getStructureAvailableWidth(idx);

  const containerWrapper: CSSProperties = {
    padding: converter.inset(padding?.[screen] || padding?.desktop, 'px'),
    width: screen === 'desktop' ? `${width}px` : `${((width / structureWidth) * 100).toFixed(2)}%`,
  };

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    ...converter.image(backgroundImage),
    ...converter.border(border),
    backgroundColor,
    borderRadius: converter.inset(borderRadius, 'px'),
  };

  return { containerWrapper, containerStyle };
}

export function useDropZoneStyle(
  hover: boolean,
  over: boolean,
  selected: boolean,
  active: boolean,
  drag: boolean,
  animation = true
) {
  return useMemo(() => {
    const classes: string[] = [
      'relative h-[92px] items-center rounded bg-primary/20 border border-primary/50 justify-center border-dashed',
    ];

    if (over) {
      classes.push('bg-primary/50 border-primary/50');
    }

    if (selected) {
      classes.push('border-solid shadow-[0_0_0_1px] shadow-primary/50');
    }

    if (active) {
      classes.push('border-solid shadow-[0_0_0_1px] shadow-primary/50');
    }

    if (hover) {
      classes.push('border-solid shadow-[0_0_0_1px] shadow-primary/50 border-primary/50');
    }

    if (drag) {
      classes.push('grayscale-[90%]');
    }

    if (animation) {
      classes.push('transition-all duration-300 ease-in-out');
    }

    return {
      classes,
    };
  }, [hover, over, selected, active, drag, animation]);
}
