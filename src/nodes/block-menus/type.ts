import type { Inset, Alignment, FontFamily, Responsive, Visibility } from '@/types';
import type { BlockBase } from '../common/type';

export type BlockMenu = BlockBase & {
  blockType: 'menu';
  data: {
    type: 'links' | 'icon' | 'link-icons';
    menus: {
      text: string;
      link: string;
      hide?: Visibility;
    }[];
    hide?: Visibility;
  };
  style: {
    fullWidth?: boolean;
    alignment?: Responsive<Alignment | undefined>;
    padding?: Responsive<Inset | undefined>;
    margin?: Responsive<Inset | undefined>;
    divider?: number;
    dividerStyle?: 'solid' | 'dashed' | 'dotted';
    dividerColor?: string;
    textStyle?: ('bold' | 'italic' | 'underline')[];
    fontFamily?: FontFamily;
    fontSize?: Responsive<number | undefined>;
    linkColor?: string;
  };
};
