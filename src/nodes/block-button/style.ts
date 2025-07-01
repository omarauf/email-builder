import type { CSSProperties } from 'react';
import { converter } from '@/utils/converter';
import { fontFamilyOptions } from '@/constant/font';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { BlockButton } from './type';

export function useButtonStyle(buttonBlock: BlockButton) {
  const screen = useBuilderStore((s) => s.screen);

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

  const isFullWidth =
    fullWidth !== undefined
      ? fullWidth[screen] !== undefined
        ? fullWidth[screen]
        : undefined
      : undefined;

  const buttonWrapperStyle: CSSProperties = {
    display: 'flex',
    justifyContent: align?.[screen],
    background: blockBackgroundColor,
    height: height ? `${height}px` : 'auto',
    width: isFullWidth === true ? '100%' : isFullWidth === false ? 'auto' : undefined,
    alignItems: converter.verticalAlign(verticalAlign),
  };

  const hoverBorderColor = hover?.borderColor || border?.color;
  const hoverButtonColor = hover?.buttonColor || buttonColor;
  const hoverFontColor = hover?.fontColor || fontColor;

  if (hoverBorderColor) buttonWrapperStyle['--button-hover-border-color'] = hoverBorderColor;
  if (hoverButtonColor) buttonWrapperStyle['--button-hover-background-color'] = hoverButtonColor;
  if (hoverFontColor) buttonWrapperStyle['--button-hover-font-color'] = hoverFontColor;

  const buttonStyle: CSSProperties = {
    background: buttonColor,
    fontSize: `${fontSize?.[screen]}px`,
    fontFamily: fontFamilyOptions.find((f) => f.id === fontFamily)?.type,
    fontWeight: textStyle?.includes('bold') ? 'bold' : undefined,
    fontStyle: textStyle?.includes('italic') ? 'italic' : undefined,
    textDecoration: textStyle?.includes('underline') ? 'underline' : undefined,

    padding: converter.inset(innerPadding?.[screen] || innerPadding?.desktop, 'px'),
    borderRadius: converter.inset(borderRadius, 'px'),

    width: isFullWidth === true ? '100%' : isFullWidth === false ? 'auto' : undefined,
    height: 'fit-content',
    textAlign: 'center',
    ...converter.border(border),
    lineHeight: 'normal',
    color: fontColor,
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
