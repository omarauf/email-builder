import type { UniqueIdentifier } from '@dnd-kit/core';
import type { BlockTree, BlockType } from './type';
import { defaultBlockCode } from '../block-code/blueprint';
import { defaultBlockText } from '../block-text/blueprint';
import { defaultBlockMenu } from '../block-menus/blueprint';
import { defaultBlockImage } from '../block-image/blueprint';
import { defaultBlockButton } from '../block-button/blueprint';
import { defaultBlockSpacer } from '../block-spacer/blueprint';
import { defaultBlockDivider } from '../block-divider/blueprint';

export const defaultBlock = (id: UniqueIdentifier, type: BlockType): BlockTree => {
  if (type === 'button') return defaultBlockButton(id);
  if (type === 'image') return defaultBlockImage(id);
  if (type === 'code') return defaultBlockCode(id);
  if (type === 'text') return defaultBlockText(id);
  if (type === 'spacer') return defaultBlockSpacer(id);
  if (type === 'menu') return defaultBlockMenu(id);
  if (type === 'divider') return defaultBlockDivider(id);

  throw new Error('Invalid type');
};

export const blockTypes: BlockType[] = [
  'button',
  'code',
  'divider',
  'image',
  'menu',
  'text',
  'spacer',
];
