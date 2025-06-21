import type { CSSProperties } from 'react';
import { converter } from '@/utils/converter';
import type { Css } from '@/types';
import type { BlockImage } from './type';

export function BlockImageConverter({ block }: { block: BlockImage }) {
  const { style, data, id } = block;
  const { alt, sizeType, src, link } = data;
  const { padding, align, borderRadius, height, width, responsive } = style;
  const blockId = `block-${String(id).substring(0, 7)}`;
  const imageId = `image-${String(id).substring(0, 7)}`;
  const blockClassNames = ['block-image'];
  const imageClassNames = ['image'];
  const css: Css[] = [];

  if (padding?.mobile) {
    css.push({
      type: 'mobile',
      classname: `#${blockId}`,
      styles: { padding: converter.inset(padding.mobile, 'px') },
      important: true,
    });
  }

  const blockStyle: CSSProperties = {
    margin: 0,
    padding: converter.inset(padding?.desktop, 'px'),
  };

  const imageStyle = {
    display: 'block',
    borderRadius: converter.inset(borderRadius, 'px'),
  };

  if (align?.mobile !== undefined && align?.mobile !== align?.desktop) {
    const firstLetter = align?.mobile?.charAt(0) || 'l';
    blockClassNames.push(`m-txt-${firstLetter}`);
  }

  if (responsive) imageClassNames.push('adapt-img');

  if (!responsive && width?.mobile !== width?.desktop && width?.mobile !== undefined) {
    css.push({
      type: 'mobile',
      classname: `#${imageId}`,
      styles: { width: `${width.mobile}px` },
      important: true,
    });
  }

  const img = (
    <img
      id={imageId}
      src={src}
      alt={alt}
      className={imageClassNames.join(' ')}
      style={imageStyle}
      width={sizeType === 'width' ? `${width?.desktop}` : 'auto'}
      height={sizeType === 'height' ? `${height?.desktop}` : 'auto'}
    />
  );

  if (link === '' || link === undefined) {
    return {
      html: (
        <td
          id={blockId}
          className={blockClassNames.join(' ')}
          align={align?.desktop}
          style={blockStyle}>
          {img}
        </td>
      ),
      css,
    };
  }

  return {
    html: (
      <td
        id={blockId}
        className={blockClassNames.join(' ')}
        align={align?.desktop}
        style={blockStyle}>
        <a target="_black" href={link}>
          {img}
        </a>
      </td>
    ),
    css,
  };
}
