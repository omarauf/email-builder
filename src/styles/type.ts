import type { GlobalButtonStyle } from './button/type';
import type { GlobalStripeStyle } from './stripe/type';
import type { GlobalGeneralStyle } from './general/type';
import type { GlobalHeadingStyle } from './heading/type';

export interface Styles {
  general: GlobalGeneralStyle;
  stripe: GlobalStripeStyle;
  heading: GlobalHeadingStyle;
  button: GlobalButtonStyle;
}
