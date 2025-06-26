import type { Css } from '@/types';
import { converter } from '@/utils/converter';
import type { GlobalButtonStyle } from './type';

export function globalButtonStyleConverter(button: GlobalButtonStyle) {
  const {
    buttonColor,
    fontColor,
    fontFamily,
    fontSize,
    fullWidth,
    hover,
    letterSpacing,
    padding,
    textStyles,
    border,
    borderRadius,
  } = button;

  // we add this style only if the hover is not enabled,
  // so the stripe hover style will not affect the button hover style
  // because the stripe hover style will effect the button hover
  // if the button hover is not enabled
  // const hoverButtonNotEnabled = `
  //     .es-button-border:hover > a.es-button {
  //       color: ${button.fontColor} !important;
  //     }
  //   `;

  // const hoverButtonStyle = `
  //     .es-button-border:hover {
  //       border-color: ${button.hover?.borderColor} !important;
  //       background: ${button.hover?.buttonColor} !important;
  //     }

  //     .es-button-border:hover a.es-button,
  //     .es-button-border:hover button.es-button {
  //       background: ${button.hover?.buttonColor} !important;
  //       color: ${button.hover?.fontColor} !important;
  //     }
  //   `;

  const css: Css[] = [
    {
      type: 'desktop',
      classname: '.stripe a.button',
      styles: {
        padding: converter.inset(padding.desktop, 'px'),
        display: fullWidth.desktop ? 'block' : 'inline-block',
        background: buttonColor,
        borderRadius: converter.inset(borderRadius, 'px'),
        fontSize: `${fontSize.desktop}px`,
        fontFamily,
        fontWeight: textStyles.includes('bold') ? 'bold' : 'normal',
        fontStyle: textStyles.includes('italic') ? 'italic' : 'normal',
        textDecoration: textStyles.includes('underline') ? 'underline' : 'none',
        color: fontColor,
        letterSpacing: letterSpacing.value + letterSpacing.unit,
        ...converter.border(border),
        // lineHeight: "120%",
        // width: "auto",
        // textAlign: "center",
        // letterSpacing: "0",
        // cursor: "pointer",
      },
    },
    {
      type: 'mobile',
      classname: '.stripe a.button',
      styles: {
        padding: converter.inset(padding.mobile, 'px'),
        display: fullWidth.mobile ? 'block' : 'inline-block',
        fontSize: `${fontSize.mobile}px`,
      },
      important: true,
    },
    {
      type: 'desktop',
      classname: '.stripe a.button:hover',
      styles: {
        borderColor: hover.borderColor,
        background: hover.buttonColor,
        color: hover.fontColor,
      },
      important: true,
    },
  ];

  return css;
}
