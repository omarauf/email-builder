import type { Responsive, TextAlignment } from '@/types';
import type { BlockBase } from '../common/type';

export type TextType = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingType = Exclude<TextType, 'p'>;

export type BlockText = BlockBase & {
  blockType: 'text';
  data: {
    text: string;
  };
  style: {
    textAlignment?: Responsive<TextAlignment | undefined>;
  };
};
