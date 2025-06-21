import type { Inset, Alignment, Responsive, ImageMetaData } from '@/types';
import type { BlockBase } from '../common/type';

export type BlockImage = BlockBase & {
  blockType: 'image';
  data: {
    src: string;
    alt: string;
    link?: string;
    image?: ImageMetaData;
    sizeType: 'width' | 'height';
  };
  style: {
    width: Responsive<number | undefined>;
    height: Responsive<number | undefined>;
    align?: Responsive<Alignment | undefined>;
    borderRadius?: Inset;
    responsive: boolean;
  };
};
