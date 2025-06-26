import type { CSSProperties } from 'react';
import type { Css } from '@/types';
import { converter } from '@/utils/converter';
import type { BlockDivider } from './type';

export function BlockDividerConverter({ block }: { block: BlockDivider }) {
  const { style, id } = block;
  const {
    padding,
    blockBackgroundColor,
    width,
    alignment,
    border,
    borderColor,
    borderStyle,
    widthUnit,
  } = style;
  const blockId = `block-${String(id).substring(0, 7)}`;
  const dividerId = `divider-${String(id).substring(0, 7)}`;
  const blockClassNames = ['block-divider'];
  const dividerClassNames = ['divider'];
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
    fontSize: 0,
    backgroundColor: blockBackgroundColor,
  };

  const dividerStyle: CSSProperties = {
    borderBottom: `${border}px ${borderStyle} ${borderColor}`,
  };

  if (alignment?.mobile !== alignment?.desktop) {
    css.push({
      type: 'mobile',
      classname: `#${dividerId}`,
      styles: {
        width: `${width?.mobile || 100}${widthUnit?.mobile || '%'}`,
        display: 'inline-table',
      },
      important: true,
    });
    const firstLetter = alignment?.mobile?.charAt(0) || 'l';
    blockClassNames.push(`m-txt-${firstLetter}`);
  }

  return {
    html: (
      <td
        id={blockId}
        align={alignment?.desktop}
        style={blockStyle}
        className={blockClassNames.join(' ')}>
        <table
          id={dividerId}
          width={`${width?.desktop || 100}${widthUnit?.desktop || '%'}`}
          className={dividerClassNames.join(' ')}
          cellPadding="0"
          cellSpacing="0">
          <tbody>
            <tr>
              <td style={dividerStyle} />
            </tr>
          </tbody>
        </table>
      </td>
    ),
    css,
  };
}
