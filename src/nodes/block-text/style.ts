import type { Theme, SxProps } from '@mui/material';
import type { CSSProperties } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { fontFamilyOptions } from '@/constant/font';
import { converter } from '@/utils/converter';
import type { BlockText, HeadingType } from './type';
import type { StripeType } from '../stripe/type';

type HeadingStyles = Record<HeadingType, CSSProperties>;

export function useTextStyle(textBlock: BlockText, stripeType: StripeType) {
  const [styles, screen] = useBuilderStore(useShallow((s) => [s.styles, s.screen]));
  const { style } = textBlock;
  const { blockBackgroundColor, padding, textAlignment } = style;

  const { stripe, heading } = styles;

  const headTypes: HeadingType[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const headingStyles: HeadingStyles = {
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
  };

  headTypes.forEach((t) => {
    const isBottomSpaceEnabled = heading.bottomSpaceEnabled;
    const {
      bottomSpace,
      fontColor,
      fontSize,
      lineHeight,
      textStyles,
      textAlignment: headingTextAlignment,
    } = heading[t];

    const headingStyle: CSSProperties = {
      // Global Heading
      fontFamily: fontFamilyOptions.find((f) => f.id === heading.fontFamily)?.type,
      letterSpacing: `${heading.letterSpacing.value}${heading.letterSpacing.unit}`,

      // Global Heading - Specific
      fontWeight: textStyles.includes('bold') ? 'bold' : 'normal',
      fontStyle: textStyles.includes('italic') ? 'italic' : 'normal',
      textDecoration: textStyles.includes('underline') ? 'underline' : 'none',
      fontSize: `${fontSize[screen]}px`,
      lineHeight: `${lineHeight[screen] * 100}%`,
      color: fontColor,
      marginBottom: isBottomSpaceEnabled ? `${bottomSpace[screen]}px` : '',
      textAlign: textAlignment?.[screen] || headingTextAlignment[screen],
    };

    headingStyles[t] = headingStyle;
  });

  const paragraphStyles: SxProps<Theme> = {
    // Global Strip
    marginBottom: `${stripe[stripeType].bottomSpace?.[screen] || 0}px`,
    textAlign: textAlignment?.[screen] || textAlignment?.desktop,
  };

  const blockStyle: CSSProperties = {
    padding: converter.inset(padding?.[screen] || padding?.desktop, 'px'),
    backgroundColor: blockBackgroundColor,
  };

  return { paragraphStyles, headingStyles, blockStyle };
}
