import type { Visibility } from '@/types';
import type { BlockBase } from '../common/type';

export type BlockSpacer = BlockBase & {
  blockType: 'spacer';
  data: { hide?: Visibility };
  style: {
    height: {
      desktop: number;
      mobile: number | undefined;
    };
  };
};
