import type { CSSProperties } from 'react';
import type { Css } from '@/types';
import type { BlockSpacer } from './type';

export function BlockSpacerConverter({ block }: { block: BlockSpacer }) {
  const { style, id } = block;

  const { blockBackgroundColor, height } = style;
  const blockId = `block-${String(id).substring(0, 7)}`;
  const blockClassNames = ['block-spacer'];
  const css: Css[] = [];

  const blockStyle: CSSProperties = {
    backgroundColor: blockBackgroundColor,
  };

  if (height.desktop !== height.mobile && height.mobile !== undefined) {
    css.push({
      classname: `#${blockId}`,
      type: 'mobile',
      styles: { height: `${height.mobile}px` },
      important: true,
    });
  }

  return {
    html: (
      <td
        id={blockId}
        style={blockStyle}
        height={`${height.desktop}px`}
        className={blockClassNames.join(' ')}
      />
    ),
    css,
  };
}
