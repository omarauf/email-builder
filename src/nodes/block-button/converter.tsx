import type { CSSProperties } from 'react';
import type { Styles } from '@/styles/type';
import { converter } from '@/utils/converter';
import type { Css } from '@/types';
import type { BlockButton } from './type';

export function BlockButtonConverter({ block, styles }: { block: BlockButton; styles: Styles }) {
  const globalButtonStyles = styles.button;
  const { style, data, id } = block;
  const { text, link } = data;
  const blockId = `block-${String(id).substring(0, 7)}`;
  const buttonId = `button-${String(id).substring(0, 7)}`;
  const blockClassNames = ['block-button'];
  const buttonClassNames = ['button'];
  const css: Css[] = [];

  const {
    padding,
    blockBackgroundColor,
    align,
    fontSize,
    fullWidth,
    innerPadding,
    buttonColor,
    hover,
    height,
    verticalAlign,
    border,
    borderRadius,
    fontColor,
    fontFamily,
    textStyle,
  } = style;

  const blockStyle: CSSProperties = {
    margin: 0,
    padding: converter.inset(padding?.desktop, 'px'),
    backgroundColor: blockBackgroundColor,
    height: height ? `${height}px` : undefined,
  };

  if (padding?.mobile) {
    css.push({
      type: 'mobile',
      classname: `#${blockId}`,
      styles: { padding: converter.inset(padding?.mobile, 'px') },
      important: true,
    });
  }

  const buttonStyle: CSSProperties = {
    background: buttonColor,
    borderRadius: converter.inset(borderRadius, 'px'),
    padding: converter.inset(innerPadding?.desktop, 'px'),
    fontSize: fontSize?.desktop ? `${fontSize?.desktop}px` : undefined,
    color: fontColor || undefined,
    fontFamily: fontFamily || undefined,
    fontWeight: textStyle?.includes('bold') ? 'bold' : undefined,
    fontStyle: textStyle?.includes('italic') ? 'italic' : undefined,
    textDecoration: textStyle?.includes('underline') ? 'underline' : undefined,
    ...converter.border(border),
  };

  if (innerPadding?.mobile) {
    css.push({
      type: 'mobile',
      classname: `#${buttonId}`,
      styles: { padding: converter.inset(innerPadding.mobile, 'px') },
      important: true,
    });
  }

  if (fullWidth?.desktop !== globalButtonStyles.fullWidth.desktop) {
    if (fullWidth?.desktop === true) buttonStyle.display = 'block';
    else if (fullWidth?.desktop === false) buttonStyle.display = 'inline-block';
  }

  if (fullWidth?.mobile !== globalButtonStyles.fullWidth?.mobile) {
    if (fullWidth?.mobile === true) buttonClassNames.push('m-fw');
    else if (fullWidth?.mobile === false) buttonClassNames.push('m-il');
  }

  if (fontSize?.mobile !== undefined && fontSize?.mobile !== globalButtonStyles.fontSize?.mobile) {
    css.push({
      type: 'mobile',
      classname: `#${blockId}`,
      styles: { fontSize: `${fontSize.mobile}px` },
      important: true,
    });
  }

  if (align?.mobile !== undefined && align?.mobile !== align?.desktop) {
    const firstLetter = align?.mobile?.charAt(0) || 'l';
    blockClassNames.push(`m-txt-${firstLetter}`);
  }

  const hoverBorderColor = hover?.borderColor;
  const hoverButtonColor = hover?.buttonColor;
  const hoverFontColor = hover?.fontColor;

  if (hoverBorderColor && hoverBorderColor !== globalButtonStyles.hover.borderColor) {
    css.push({
      type: 'desktop',
      classname: `#${buttonId}:hover`,
      styles: { borderColor: hoverBorderColor },
      important: true,
    });
  }

  if (hoverButtonColor && hoverButtonColor !== globalButtonStyles.hover.buttonColor) {
    css.push({
      type: 'desktop',
      classname: `#${buttonId}:hover`,
      styles: { backgroundColor: hoverButtonColor },
      important: true,
    });
  }

  if (hoverFontColor && hoverFontColor !== globalButtonStyles.hover.fontColor) {
    css.push({
      type: 'desktop',
      classname: `#${buttonId}:hover`,
      styles: { color: hoverFontColor },
      important: true,
    });
  }

  return {
    html: (
      <td
        id={blockId}
        align={align?.desktop || 'left'}
        valign={verticalAlign || 'top'}
        style={blockStyle}
        className={blockClassNames.join(' ')}>
        <a id={buttonId} className={buttonClassNames.join(' ')} style={buttonStyle} href={link}>
          {text}
        </a>
      </td>
    ),
    css,
  };
}
