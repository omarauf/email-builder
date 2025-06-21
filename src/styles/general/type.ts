import type { Inset } from '@/types';

export interface GlobalGeneralStyle {
  backgroundColor: string;
  width: number;
  alignment: 'left' | 'center' | 'right';
  rtl: boolean;
  list: {
    indent: number;
    itemsBottomSpace: number;
    marginY: number;
    mark: 'disc';
    color: string;
  };
  structurePadding: {
    desktop: Inset;
    mobile: Inset;
  };
  margin: {
    desktop: Inset;
    mobile: Inset;
  };
}
