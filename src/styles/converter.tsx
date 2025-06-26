import { cssObjectToString, mediaQueryToString } from '@/utils/converter';
import type { Css } from '../types';
import type { Styles } from './type';
import { globalStripeStyleConverter } from './stripe/converter';
import { globalButtonStyleConverter } from './button/converter';
import { globalHeadingStyleConverter } from './heading/converter';
import { globalGeneralStyleConverter } from './general/converter';

export function globalStyleConverter(styles: Styles, css: Css[]) {
  const { general, heading, button, stripe } = styles;

  const stripeStyle = globalStripeStyleConverter(stripe);

  const buttonStyle = globalButtonStyleConverter(button);

  const headerStyle = globalHeadingStyleConverter(heading);

  const generalStyle = globalGeneralStyleConverter(general);

  const globalCss = [...generalStyle, ...stripeStyle, ...buttonStyle, ...headerStyle];
  const allCss = [...globalCss, ...css];

  const desktopCss = allCss.filter((c) => c.type === 'desktop');
  const mobileCss = allCss.filter((c) => c.type === 'mobile');

  const nonHoverDesktop = desktopCss.filter((c) => !c.classname?.includes('hover'));
  const nonHoverMobile = mobileCss.filter((c) => !c.classname?.includes('hover'));
  const hoverDesktop = desktopCss.filter((c) => c.classname?.includes('hover'));
  const hoverMobile = mobileCss.filter((c) => c.classname?.includes('hover'));

  return (
    <>
      <style type="text/css">{cssObjectToString(nonHoverDesktop)}</style>
      <style data-css-inline="keep" type="text/css">
        {cssObjectToString(hoverDesktop)}
      </style>
      <style data-css-inline="keep" type="text/css">
        {mediaQueryToString(general.width, cssObjectToString(nonHoverMobile))}
      </style>
      <style data-css-inline="keep" type="text/css">
        {mediaQueryToString(general.width, cssObjectToString(hoverMobile))}
      </style>
    </>
  );
}
