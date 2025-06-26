import type { CSSProperties } from 'react';
import ReactDOMServer from 'react-dom/server';
import type { Css, Meta } from '@/types';
import type { Styles } from '@/styles/type';
import { globalStyleConverter } from '@/styles/converter';
import type { Tree } from './type';
import { StripeConverter } from '../stripe/converter';

export function HTMLTreeConverter(styles: Styles, tree: Tree, meta: Meta) {
  const { css, html: body } = BodyTreeConverter({ tree, styles });

  // this should come after build email because it will add the custom style
  // while iterating the blocks we are adding the custom style
  const cssStyle = globalStyleConverter(styles, css);

  const style: CSSProperties = {
    msoTableLspace: '0pt',
    msoTableRspace: '0pt',
    borderCollapse: 'collapse',
    borderSpacing: '0px',
    padding: '0',
    margin: '0',
    width: '100%',
    height: '100%',
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center top',
    wordBreak: 'break-word',
  };

  const html = (
    <html lang="en">
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta httpEquiv="Content-Type" content="text/html charset=UTF-8" />

        {cssStyle}

        <title>{meta.subject || 'Email Template'}</title>
      </head>

      <body>
        <div dir="ltr">
          <table cellSpacing="0" cellPadding="0" className="es-wrapper" width="100%" style={style}>
            <tbody>
              <tr>{body}</tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  );

  // let stringHtml = `<!DOCTYPE html>\n`;

  // stringHtml += reactElementToJSXString(html)
  //   .replaceAll("{`", "")
  //   .replaceAll("`}", "")
  //   .replaceAll("httpEquiv", "http-equiv")
  //   .replaceAll("className", "class");

  const htmlString = ReactDOMServer.renderToStaticMarkup(html);

  return htmlString;
}

export function BodyTreeConverter({ tree, styles }: { tree: Tree; styles: Styles }) {
  const stripes = tree.children;

  const style: CSSProperties = {
    msoTableLspace: '0pt',
    msoTableRspace: '0pt',
    borderCollapse: 'collapse',
    borderSpacing: '0px',
    width: '100%',
    tableLayout: 'fixed', // !important
    backgroundColor: 'transparent',
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center top',
  };

  const css: Css[] = [];

  return {
    html: (
      <td valign="top" className="email-paddings">
        {stripes.map((s) => {
          const { css: stripeCss, html } = StripeConverter({
            stripe: s,
            styles,
          });

          css.push(...stripeCss);

          return (
            <table key={s.id} style={style} cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>{html}</tr>
              </tbody>
            </table>
          );
        })}
      </td>
    ),
    css,
  };
}
