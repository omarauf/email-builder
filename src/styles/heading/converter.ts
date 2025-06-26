import type { Css } from '@/types';
import { converter } from '@/utils/converter';
import { HeadingOptions } from '@/constant/heading';
import type { GlobalHeadingStyle } from './type';

export function globalHeadingStyleConverter(heading: GlobalHeadingStyle) {
  const { fontFamily, letterSpacing, bottomSpaceEnabled, ...rest } = heading;

  const css: Css[] = [];

  HeadingOptions.forEach((headingType) => {
    const s = rest[headingType];
    const { bottomSpace, fontColor, fontSize, lineHeight, textStyles, textAlignment } = s;

    css.push(
      {
        type: 'desktop',
        classname: headingType,
        styles: {
          fontFamily,
          letterSpacing: letterSpacing.value + letterSpacing.unit,
          fontSize: `${fontSize.desktop}px`,
          color: fontColor,
          lineHeight: `${lineHeight.desktop * 100}%`,
          marginBottom:
            bottomSpaceEnabled && bottomSpace.desktop !== 0
              ? `${bottomSpace.desktop}px`
              : undefined,
          textAlign: textAlignment.desktop,
          fontWeight: 'normal',
          ...converter.textStyle(textStyles),
        },
      },
      {
        type: 'mobile',
        classname: headingType,
        styles: {
          fontSize: `${fontSize.mobile}px`,
          lineHeight: `${lineHeight.mobile * 100}%`,
          marginBottom:
            bottomSpaceEnabled && bottomSpace.mobile !== 0 ? `${bottomSpace.mobile}px` : undefined,
          textAlign: textAlignment.mobile,
        },
        important: true,
      }
    );
  });

  return css;
}
