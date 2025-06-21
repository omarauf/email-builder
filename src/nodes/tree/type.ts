import type { UniqueIdentifier } from '@dnd-kit/core';
import type { StripeTree } from '../stripe/type';

export interface Tree {
  id: UniqueIdentifier;
  type: 'root';
  children: StripeTree[];
}
