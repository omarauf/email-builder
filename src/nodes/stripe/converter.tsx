import type { CSSProperties } from 'react';
import type { Styles } from '@/styles/type';
import { converter } from '@/utils/converter';
import type { Css } from '@/types';
import { StructureConverter } from '../structure/converter';
import type { StripeTree } from './type';

export function StripeConverter({ stripe, styles }: { stripe: StripeTree; styles: Styles }) {
  const { data, children, style, id } = stripe;
  const { border, backgroundImage, backgroundColor, contentBackColor } = style;
  const { alignment } = styles.general;
  const stripeId = `container-${String(id).substring(0, 7)}`;

  const wrapperStyle: CSSProperties = {
    backgroundColor,
    ...converter.image(backgroundImage),
  };

  const contentStyle: CSSProperties = {
    msoTableLspace: '0pt',
    msoTableRspace: '0pt',
    borderCollapse: 'collapse',
    borderSpacing: '0px',
    backgroundColor: contentBackColor,
    ...converter.border(border),
  };

  const css: Css[] = [];

  return {
    html: (
      <td
        id={stripeId}
        align={alignment}
        className={`stripe stripe-${data.stripeType}`}
        style={wrapperStyle}>
        <table
          className={`stripe-body stripe-${data.stripeType}-body`}
          style={contentStyle}
          cellSpacing="0"
          cellPadding="0">
          <tbody>
            {children.map((s) => {
              const { html, css: structureCss } = StructureConverter({
                structure: s,
                styles,
              });

              css.push(...structureCss);

              return <tr key={s.id}>{html}</tr>;
            })}
          </tbody>
        </table>
      </td>
    ),
    css,
  };
}
