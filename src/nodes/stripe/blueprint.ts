import type { UniqueIdentifier } from '@dnd-kit/core';
import type { StripeTree } from './type';
import type { StructureTree } from '../structure/type';
import { defaultVisibility } from '../common/blueprint';

interface StripeProps {
  id: UniqueIdentifier;
  data?: Partial<StripeTree['data']>;
  style?: Partial<StripeTree['style']>;
  children?: StructureTree[];
}

export const defaultStripe = ({ id, data, style, children }: StripeProps): StripeTree => ({
  id,
  type: 'stripe',
  style: {
    backgroundColor: style?.backgroundColor || undefined,
    contentBackColor: style?.contentBackColor || undefined,
    border: style?.border || {
      color: style?.border?.color || '#000000',
      style: style?.border?.style || 'solid',
      width: style?.border?.width || [0, 0, 0, 0],
    },
    backgroundImage: style?.backgroundImage || undefined,
  },
  data: {
    stripeType: data?.stripeType || 'content',
    hide: defaultVisibility(data?.hide),
  },
  children: children || [],
});
