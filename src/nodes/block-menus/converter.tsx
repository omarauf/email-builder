import type { CSSProperties } from 'react';
import { converter } from '@/utils/converter';
import type { Css } from '@/types';
import type { BlockMenu } from './type';

export function BlockMenuConverter({ block }: { block: BlockMenu }) {
  const { style, data, id } = block;
  const { menus } = data;
  const {
    padding,
    blockBackgroundColor,
    fontSize,
    fullWidth,
    margin,
    fontFamily,
    textStyle,
    alignment,
    divider,
    dividerColor,
    dividerStyle,
    linkColor,
  } = style;
  const blockId = `block-${String(id).substring(0, 7)}`;
  const menuId = `menu-${String(id).substring(0, 7)}`;
  const blockClassNames = ['block-menu'];
  const menusClassNames = ['menu'];
  const menuClassNames: string[] = [];
  const css: Css[] = [];

  const blockStyle: CSSProperties = {
    backgroundColor: blockBackgroundColor,
    padding: converter.inset(padding?.desktop, 'px'),
    fontFamily,
  };

  const cellStyle: CSSProperties = {
    padding: converter.inset(margin?.desktop, 'px'),
  };

  const anchorStyle: CSSProperties = {
    fontWeight: textStyle?.includes('bold') ? 'bold' : undefined,
    fontStyle: textStyle?.includes('italic') ? 'italic' : undefined,
    textDecoration: textStyle?.includes('underline') ? 'underline' : undefined,
    color: linkColor,
  };

  const divideStyle: CSSProperties = {
    borderLeft: divider && divider > 0 ? `${divider}px ${dividerStyle} ${dividerColor}` : undefined,
  };

  if (padding?.mobile) {
    css.push({
      type: 'mobile',
      classname: `#${blockId}`,
      styles: { padding: converter.inset(padding.mobile, 'px') },
      important: true,
    });
  }

  if (margin?.mobile) {
    css.push({
      type: 'mobile',
      classname: `#${menuId} td`,
      styles: { padding: converter.inset(margin.mobile, 'px') },
      important: true,
    });
  }

  if (fontSize?.mobile !== undefined && fontSize.mobile !== fontSize.desktop) {
    css.push({
      type: 'mobile',
      classname: `#${menuId} a`,
      styles: {
        fontSize: `${fontSize.mobile}px`,
      },
      important: true,
    });
  }

  if (fullWidth === false && alignment?.mobile !== alignment?.desktop) {
    css.push({
      type: 'mobile',
      classname: `#${menuId}`,
      styles: {
        display: 'inline',
      },
      important: true,
    });

    const firstLetter = alignment?.mobile?.charAt(0) || 'l';
    blockClassNames.push(`m-txt-${firstLetter}`);
  }

  const width = (100 / menus.length).toFixed(2);

  return {
    html: (
      <td
        id={blockId}
        align={alignment?.desktop}
        style={blockStyle}
        className={blockClassNames.join(' ')}>
        <table
          id={menuId}
          cellPadding="0"
          cellSpacing="0"
          {...(fullWidth ? { width: '100%' } : {})}
          className={menusClassNames.join(' ')}>
          <tbody>
            <tr>
              {data.menus.map((menu, index) => (
                <td
                  key={index}
                  align="center"
                  valign="top"
                  style={index === 0 ? cellStyle : { ...cellStyle, ...divideStyle }}
                  className={menuClassNames.join(' ')}
                  width={`${width}%`}>
                  <div>
                    <a target="_blank" href={menu.link} rel="noreferrer" style={anchorStyle}>
                      {menu.text}
                    </a>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </td>
    ),
    css,
  };
}
