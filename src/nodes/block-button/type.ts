import type {
  Inset,
  Border,
  Alignment,
  FontFamily,
  Responsive,
  Visibility,
  ButtonHover,
} from '@/types';
import type { BlockBase } from '../common/type';

export type BlockButton = BlockBase & {
  blockType: 'button';
  data: {
    text: string;
    link: string;
    hide?: Visibility;
  };
  style: {
    align?: Responsive<Alignment | undefined>;
    innerPadding?: Responsive<Inset | undefined>;
    buttonColor?: string;
    fontSize?: Responsive<number | undefined>;
    fontFamily?: FontFamily;
    fontColor?: string;
    textStyle?: ('bold' | 'italic' | 'underline')[];
    fullWidth?: Responsive<boolean | undefined>;
    borderRadius?: Inset;
    border?: Border;
    hover?: Partial<ButtonHover>;
    verticalAlign?: 'top' | 'middle' | 'bottom';
    height?: number;
  };
};
