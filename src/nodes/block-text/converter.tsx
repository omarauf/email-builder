import type { CSSProperties } from 'react';
import { converter } from '@/utils/converter';
import type { Css } from '@/types';
import type { BlockText } from './type';

export function BlockTextConverter({ block }: { block: BlockText }) {
  const { style, data, id } = block;
  const { padding, blockBackgroundColor, textAlignment } = style;
  const { text } = data;
  const blockId = `block-${String(id).substring(0, 7)}`;
  const blockClassNames = ['block-text'];
  const css: Css[] = [];

  const blockStyle: CSSProperties = {
    padding: converter.inset(padding?.desktop, 'px'),
    backgroundColor: blockBackgroundColor,
  };

  if (padding?.mobile) {
    css.push({
      type: 'mobile',
      classname: `#${blockId}`,
      styles: { padding: converter.inset(padding.mobile, 'px') },
      important: true,
    });
  }

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = text;

  const mobileFontSizeElements = tempDiv.querySelectorAll('[font-size-mobile]');

  mobileFontSizeElements.forEach((e) => {
    const mobileFontSize = e.getAttribute('font-size-mobile');
    if (!mobileFontSize) return;
    const parseMobileFontSize = parseInt(mobileFontSize, 10);
    const className = `text-m-${parseMobileFontSize}`;
    css.push({
      type: 'mobile',
      classname: `.${className}`,
      styles: { fontSize: `${parseMobileFontSize}px` },
      important: true,
    });
    e.classList.add(className);
    e.removeAttribute('font-size-mobile');
  });

  const desktopFontSizeElements = tempDiv.querySelectorAll('[font-size-desktop]');
  desktopFontSizeElements.forEach((e) => {
    if (!e || e instanceof HTMLElement === false) return;
    const desktopFontSize = e.getAttribute('font-size-desktop');
    if (!desktopFontSize) return;
    e.style.fontSize = desktopFontSize;
    e.removeAttribute('font-size-desktop');
  });

  const mobileAlignElements = tempDiv.querySelectorAll('[text-align-mobile]');
  mobileAlignElements.forEach((e) => {
    const mobileTextAlign = e.getAttribute('text-align-mobile');
    if (!mobileTextAlign) return;
    const firstLetter = mobileTextAlign.charAt(0);
    const className = `m-txt-${firstLetter}`;
    e.classList.add(className);
    e.removeAttribute('text-align-mobile');
  });

  const desktopAlignElements = tempDiv.querySelectorAll('[text-align-desktop]');
  desktopAlignElements.forEach((e) => {
    if (!e || e instanceof HTMLElement === false) return;
    const desktopTextAlign = e.getAttribute('text-align-desktop');
    if (!desktopTextAlign) return;
    e.style.textAlign = desktopTextAlign;
    e.removeAttribute('text-align-desktop');
  });

  return {
    html: (
      <td
        id={blockId}
        align={textAlignment?.desktop}
        style={blockStyle}
        className={blockClassNames.join(' ')}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: tempDiv.innerHTML }}
      />
    ),
    css,
  };
}
