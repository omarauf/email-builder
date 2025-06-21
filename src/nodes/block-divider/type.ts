import type { Alignment, Responsive, Visibility } from '@/types';
import type { BlockBase } from '../common/type';

export type BlockDivider = BlockBase & {
  blockType: 'divider';
  data: { hide?: Visibility };
  style: {
    width?: Responsive<number | undefined>;
    widthUnit?: Responsive<'px' | '%' | undefined>;
    border: number;
    borderStyle: 'dashed' | 'solid' | 'dotted' | undefined;
    borderColor: string;
    alignment?: Responsive<Alignment | undefined>;
  };
};
