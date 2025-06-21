import type { StripeType } from '@/nodes/stripe/type';

export const classname = {
  structure: 'structure',
  stripeWrapper: 'stripe',
  stripeWrapperType: (type: StripeType) => `stripe-${type}`,
  stripeBody: (type: StripeType) => `stripe-${type}-body`,
};
