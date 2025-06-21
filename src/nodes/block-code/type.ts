import type { BlockBase } from '../common/type';

export type BlockCode = BlockBase & {
  blockType: 'code';
  data: { code: string };
};
