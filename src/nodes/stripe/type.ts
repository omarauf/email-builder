import type { UniqueIdentifier } from '@dnd-kit/core';
import type { Border, Visibility, ImageBackground } from '@/types';
import type { StructureTree } from '../structure/type';

export interface StripeTree {
  id: UniqueIdentifier;
  type: 'stripe';
  data: StripeData;
  style: StripeStyle;
  children: StructureTree[];
}

export type StripeType = 'content' | 'footer' | 'header' | 'infoArea';

interface StripeData {
  stripeType: StripeType;
  hide?: Visibility;
}

interface StripeStyle {
  backgroundColor?: string;
  contentBackColor?: string;
  border?: Border;
  backgroundImage?: ImageBackground;
}

export interface StripeIndex {
  stripeIndex: number;
  // strideId: UniqueIdentifier;
}
