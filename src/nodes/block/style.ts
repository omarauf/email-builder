import type { Theme, SxProps } from '@mui/material';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { converter } from '@/utils/converter';
import type { BlockTree } from './type';

export function useBlockStyle(block: BlockTree) {
  const screen = useBuilderStore((s) => s.screen);

  const { blockBackgroundColor, padding } = block.style;

  const blockStyle: SxProps<Theme> = {
    padding: converter.inset(padding?.[screen], 'px'),
    backgroundColor: blockBackgroundColor,
  };

  if (block.blockType === 'spacer') blockStyle.padding = 0;

  return { blockStyle };
}
