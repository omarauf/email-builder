import type { Styles } from '@/styles/type';
import type { Css } from '@/types';
import { BlockButtonConverter } from '../block-button/converter';
import { BlockCodeConverter } from '../block-code/converter';
import { BlockDividerConverter } from '../block-divider/converter';
import { BlockImageConverter } from '../block-image/converter';
import { BlockMenuConverter } from '../block-menus/converter';
import { BlockSpacerConverter } from '../block-spacer/converter';
import { BlockTextConverter } from '../block-text/converter';
import type { BlockTree } from './type';

export function BlockConverter({ block, styles }: { block: BlockTree; styles: Styles }) {
  const { blockType } = block;

  if (blockType === 'image') return BlockImageConverter({ block });

  if (blockType === 'text') return BlockTextConverter({ block });

  if (blockType === 'button') return BlockButtonConverter({ block, styles });

  if (blockType === 'spacer') return BlockSpacerConverter({ block });

  if (blockType === 'code') return BlockCodeConverter({ block });

  if (blockType === 'menu') return BlockMenuConverter({ block });

  if (blockType === 'divider') return BlockDividerConverter({ block });

  return { html: null, css: [] as Css[] };
}
