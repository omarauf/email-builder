import type { BlockCode } from '../block-code/type';
import type { BlockText } from '../block-text/type';
import type { BlockMenu } from '../block-menus/type';
import type { BlockImage } from '../block-image/type';
import type { BlockButton } from '../block-button/type';
import type { BlockSpacer } from '../block-spacer/type';
import type { ContainerIndex } from '../container/type';
import type { BlockDivider } from '../block-divider/type';

export type BlockTree =
  | BlockButton
  | BlockImage
  | BlockSpacer
  | BlockDivider
  | BlockCode
  | BlockText
  | BlockMenu;
export type BlockType = BlockTree['blockType'];

export type BlockIndex = ContainerIndex & {
  blockIndex: number;
  // blockId: UniqueIdentifier;
};
