import type { CSSProperties } from 'react';
import type { Css } from '@/types';
import type { Styles } from '@/styles/type';
import { converter } from '@/utils/converter';
import type { StructureTree } from './type';
import { ContainerConverter } from '../container/converter';

interface Props {
  structure: StructureTree;
  styles: Styles;
}

export function StructureConverter({ structure, styles }: Props) {
  const { children, style, id } = structure;
  const { padding, backgroundColor, borderRadius, gap, backgroundImage, responsive } = style;
  const structureId = `structure-${String(id).substring(0, 7)}`;

  const wrapperStyle: CSSProperties = {
    padding: converter.inset(padding?.desktop, 'px'),
    backgroundColor,
    borderRadius: converter.inset(borderRadius, 'px'),
    ...converter.image(backgroundImage),
  };

  const css: Css[] = [];

  if (padding?.mobile) {
    css.push({
      type: 'mobile',
      classname: `#${structureId}`,
      styles: { padding: converter.inset(padding.mobile, 'px') },
      important: true,
    });
  }

  const classnames = ['structure'];

  if (responsive) {
    classnames.push('structure-row');
    return {
      html: (
        <td align="left" id={structureId} className={classnames.join(' ')} style={wrapperStyle}>
          {children.map((c, i) => {
            // for hGap don't show for last 2 container
            const hGap = i < children.length - 2 && children.length > 2;

            // for vGap don't show for last 1 container
            const vGap = i < children.length - 1 && children.length > 1;

            // const showMobileGap = children.length > 1 && gap.mobile !== undefined && gap.mobile > 0;

            // only for the last container if there are more than 2 containers
            const isRight = children.length >= 2 && i === children.length - 1;

            const contentStyle: CSSProperties = {
              msoTableLspace: '0pt',
              msoTableRspace: '0pt',
              borderCollapse: 'collapse',
              borderSpacing: '0px',
              float: isRight ? 'right' : 'left',
            };

            const { html, css: containerCss } = ContainerConverter({
              container: c,
              styles,
            });

            css.push(...containerCss);

            return (
              <table key={c.id} cellSpacing="0" cellPadding="0" style={contentStyle}>
                <tbody>
                  <tr>
                    {html}
                    {hGap && <td className="m-hidden" style={{ width: `${gap?.desktop}px` }} />}
                  </tr>
                  {vGap && <tr className="d-hidden" style={{ height: `${gap?.mobile}px` }} />}
                </tbody>
              </table>
            );
          })}
        </td>
      ),
      css,
    };
  }

  classnames.push('structure-col');

  return {
    html: (
      <td align="left" id={structureId} className={classnames.join(' ')} style={wrapperStyle}>
        <table cellSpacing="0" cellPadding="0">
          <tbody>
            <tr>
              {children.map((c, i) => {
                // for hGap don't show for last 2 container
                const hGap = i < children.length - 2 && children.length > 2;

                // only for the last container if there are more than 2 containers
                const isRight = children.length >= 2 && i === children.length - 1;

                const contentStyle: CSSProperties = {
                  msoTableLspace: '0pt',
                  msoTableRspace: '0pt',
                  borderCollapse: 'collapse',
                  borderSpacing: '0px',
                  float: isRight ? 'right' : 'left',
                };

                const { html, css: containerCss } = ContainerConverter({
                  container: c,
                  styles,
                });

                css.push(...containerCss);

                return (
                  <>
                    <td valign="top">
                      <table cellSpacing="0" cellPadding="0" style={contentStyle}>
                        <tbody>
                          <tr>{html}</tr>
                        </tbody>
                      </table>
                    </td>
                    {hGap && <td className="m-hidden" style={{ width: `${gap?.desktop}px` }} />}
                  </>
                );
              })}
            </tr>
          </tbody>
        </table>
      </td>
    ),
    css,
  };
}
