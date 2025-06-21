import type { UniqueIdentifier } from '@dnd-kit/core';
import type { Inset, Responsive, Visibility } from '@/types';

export interface BlockBase {
  type: 'block';
  id: UniqueIdentifier;
  style: {
    padding?: Responsive<Inset | undefined>;
    blockBackgroundColor?: string;
  };
  data: {
    hide?: Visibility;
  };
}
