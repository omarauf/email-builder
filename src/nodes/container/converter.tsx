import type { CSSProperties } from 'react';
import type { Styles } from '@/styles/type';
import { converter } from '@/utils/converter';
import type { Css } from '@/types';
import { BlockConverter } from '../block/converter';
import type { ContainerTree } from './type';

interface Props {
  container: ContainerTree;
  styles: Styles;
  // mobileDirection: "row" | "column";
  // totalContainerWidth: number;
}

export function ContainerConverter({ container, styles }: Props) {
  const { children, style, id } = container;
  const { backgroundColor, border, borderRadius, padding, width, backgroundImage } = style;
  const containerId = `container-${String(id).substring(0, 7)}`;

  const xPadding = (padding?.desktop?.[1] || 0) + (padding?.desktop?.[3] || 0);
  const wrapperStyle: CSSProperties = {
    width: `${(width || 0) - xPadding}px`,
    maxWidth: `${(width || 0) - xPadding}px`,
    padding: converter.inset(padding?.desktop, 'px'),
  };

  const contentStyle: CSSProperties = {
    msoTableLspace: '0pt',
    msoTableRspace: '0pt',
    borderCollapse: 'separate',
    borderSpacing: '0px',
    backgroundColor,
    borderRadius: converter.inset(borderRadius, 'px'),
    ...converter.border(border),
    ...converter.image(backgroundImage),
  };

  const css: Css[] = [];

  // if (mobileDirection === "row") {
  //   const w = ((width / totalContainerWidth) * 100).toFixed(2);
  //   css.push({
  //     classname: `#${containerId}`,
  //     type: "mobile",
  //     styles: { width: `${w}%`, maxWidth: `${w}%` },
  //     important: true,
  //   });
  // }

  if (padding?.mobile) {
    css.push({
      type: 'mobile',
      classname: `#${containerId}`,
      styles: { padding: converter.inset(padding.mobile, 'px') },
      important: true,
    });
  }

  return {
    html: (
      <td id={containerId} valign="top" align="left" className="container" style={wrapperStyle}>
        <table width="100%" cellSpacing="0" cellPadding="0" style={contentStyle}>
          <tbody>
            {children.map((b) => {
              const { css: blockCss, html } = BlockConverter({
                block: b,
                styles,
              });

              css.push(...blockCss);

              return <tr key={b.id}>{html}</tr>;
            })}
          </tbody>
        </table>
      </td>
    ),
    css,
  };
}
