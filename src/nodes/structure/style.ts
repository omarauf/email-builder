import type { Theme, SxProps } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { converter } from '@/utils/converter';
import type { StructureTree } from './type';

export function useStructureStyle(structure: StructureTree) {
  const [generalPadding, screen] = useBuilderStore(
    useShallow((s) => [s.styles.general.structurePadding, s.screen])
  );

  const { style } = structure;
  const { gap, padding, backgroundImage, borderRadius, backgroundColor } = style;

  const structureStyle: SxProps<Theme> = {
    backgroundColor,
    borderRadius: converter.inset(borderRadius, 'px'),
    padding: converter.inset(padding?.[screen] || padding?.desktop || generalPadding[screen], 'px'),
    gap: `${gap?.[screen]}px`,
    ...converter.image(backgroundImage),
  };

  // if (screen === "mobile" && responsive) structureStyle.gap = ``;

  return { structureStyle };
}
