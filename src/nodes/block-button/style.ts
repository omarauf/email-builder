import type { CSSProperties } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { converter } from '@/utils/converter';
import { fontFamilyOptions } from '@/constant/font';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { BlockButton } from './type';

export function useButtonStyle(buttonBlock: BlockButton) {
  const [globalButtonStyles, screen] = useBuilderStore(
    useShallow((s) => [s.styles.button, s.screen])
  );

  const { style } = buttonBlock;
  const {
    align,
    fontSize,
    fullWidth,
    innerPadding,
    border,
    borderRadius,
    buttonColor,
    fontColor,
    fontFamily,
    height,
    hover,
    verticalAlign,
    padding,
    blockBackgroundColor,
    textStyle,
  } = style;

  const buttonTextStyle = textStyle || globalButtonStyles.textStyles;

  const isFullWidth =
    fullWidth?.[screen] === undefined ? globalButtonStyles.fullWidth[screen] : fullWidth[screen];

  const hoverBorderColor =
    hover?.borderColor ||
    globalButtonStyles.hover.borderColor ||
    border?.color ||
    globalButtonStyles.border?.color ||
    'transparent';
  const hoverButtonColor =
    hover?.buttonColor ||
    globalButtonStyles.hover.buttonColor ||
    buttonColor ||
    globalButtonStyles.buttonColor;
  const hoverFontColor =
    hover?.fontColor ||
    globalButtonStyles.hover.fontColor ||
    fontColor ||
    globalButtonStyles.fontColor;

  const buttonWrapperStyle: CSSProperties = {
    display: 'flex',
    justifyContent: align?.[screen],
    background: blockBackgroundColor,
    height: height ? `${height}px` : 'auto',
    width: isFullWidth ? '100%' : 'auto',
    alignItems: converter.verticalAlign(verticalAlign),

    // TODO Fix this
    ...(globalButtonStyles.hover && {
      '--hover-background': `${hoverButtonColor} !important`,
      '--hover-color': `${hoverFontColor} !important`,
      '--hover-border-color': `${hoverBorderColor} !important`,
    }),
  };

  const buttonStyle: CSSProperties = {
    background: buttonColor || globalButtonStyles.buttonColor,
    fontSize: `${fontSize?.[screen] || globalButtonStyles.fontSize[screen]}px`,
    fontFamily: fontFamilyOptions.find(
      (f) => f.id === (fontFamily || globalButtonStyles.fontFamily)
    )?.type,
    fontWeight: buttonTextStyle.includes('bold') ? 'bold' : 'inherit',
    fontStyle: buttonTextStyle.includes('italic') ? 'italic' : 'normal',
    textDecoration: buttonTextStyle.includes('underline') ? 'underline' : 'none',

    padding: converter.inset(
      innerPadding?.[screen] || innerPadding?.desktop || globalButtonStyles.padding[screen],
      'px'
    ),
    borderRadius: converter.inset(borderRadius || globalButtonStyles.borderRadius, 'px'),

    width: isFullWidth ? '100%' : 'auto',
    height: 'fit-content',
    textAlign: 'center',

    ...converter.border(border || globalButtonStyles.border),

    lineHeight: 'normal',

    // NOTE: here we are using `!important` to override the default styles
    // the mui button component has `style` as CSSProperties `sx` as SxProps<Theme>
    // the style is applied inline but the `sx` applied as class style
    // so we need to use `!important` to override the default class styles
    // because in strip style we add a color effect and hover effect to a tag
    // the stripe style should effect the anchor tag for text but not for button component
    // that's why we need to use `!important` to override the default stripe styles
    color: `${fontColor || globalButtonStyles.fontColor} !important`,
  };

  const blockStyle: CSSProperties = {
    display: 'flex',
    justifyContent: align?.[screen],
    padding: converter.inset(padding?.[screen] || padding?.desktop, 'px'),
    backgroundColor: blockBackgroundColor,
    alignItems: converter.verticalAlign(verticalAlign),
    height: height ? `${height}px` : 'auto',
  };

  return { buttonWrapperStyle, buttonStyle, blockStyle };
}
