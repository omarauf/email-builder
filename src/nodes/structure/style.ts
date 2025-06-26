import type { CSSProperties } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { converter } from '@/utils/converter';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { StructureTree } from './type';

export function useStructureStyle(structure: StructureTree) {
  const [generalPadding, screen] = useBuilderStore(
    useShallow((s) => [s.styles.general.structurePadding, s.screen])
  );

  const { style } = structure;
  const { gap, padding, backgroundImage, borderRadius, backgroundColor, responsive } = style;

  let direction: 'row' | 'column';
  if (screen === 'desktop') direction = 'row';
  else if (responsive) direction = 'column';
  else direction = 'row';

  const structureStyle: CSSProperties = {
    display: 'flex',
    backgroundColor,
    borderRadius: converter.inset(borderRadius, 'px'),
    padding: converter.inset(padding?.[screen] || padding?.desktop || generalPadding[screen], 'px'),
    gap: `${gap?.[screen]}px`,
    flexDirection: direction,
    ...converter.image(backgroundImage),
  };

  // if (screen === "mobile" && responsive) structureStyle.gap = ``;

  return { structureStyle };
}
