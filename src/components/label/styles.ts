import type { Theme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { varAlpha, stylesMode } from '@/theme/styles';
import { isLight } from '@/utils/color';
import { hexToRgb } from '@/utils/color/hex';

import type { LabelSize, LabelColor, LabelShape, LabelVariant } from './types';

export const StyledLabel = styled(Box)(({
  theme,
  ownerState: { color, variant, customColor, shape, size },
}: {
  theme: Theme;
  ownerState: {
    color: LabelColor;
    customColor?: string;
    variant: LabelVariant;
    shape: LabelShape;
    size: LabelSize;
  };
}) => {
  let style: {
    color?: string | undefined;
    backgroundColor?: string | undefined;
    border?: string | undefined;
  } = {};

  if (color === 'default') {
    style = {
      /**
       * @variant filled
       */
      ...(variant === 'filled' && {
        color: theme.vars.palette.common.white,
        backgroundColor: theme.vars.palette.text.primary,
        [stylesMode.dark]: { color: theme.vars.palette.grey[800] },
      }),
      /**
       * @variant outlined
       */
      ...(variant === 'outlined' && {
        backgroundColor: 'transparent',
        color: theme.vars.palette.text.primary,
        border: `2px solid ${theme.vars.palette.text.primary}`,
      }),
      /**
       * @variant soft
       */
      ...(variant === 'soft' && {
        color: theme.vars.palette.text.secondary,
        backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
      }),
      /**
       * @variant inverted
       */
      ...(variant === 'inverted' && {
        color: theme.vars.palette.grey[800],
        backgroundColor: theme.vars.palette.grey[300],
      }),
    };
  } else {
    style = {
      /**
       * @variant filled
       */
      ...(variant === 'filled' && {
        color: theme.vars.palette[color].contrastText,
        backgroundColor: theme.vars.palette[color].main,
      }),
      /**
       * @variant outlined
       */
      ...(variant === 'outlined' && {
        backgroundColor: 'transparent',
        color: theme.vars.palette[color].main,
        border: `2px solid ${theme.vars.palette[color].main}`,
      }),
      /**
       * @variant soft
       */
      ...(variant === 'soft' && {
        color: theme.vars.palette[color].dark,
        backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.16),
        [stylesMode.dark]: { color: theme.vars.palette[color].light },
      }),
      /**
       * @variant inverted
       */
      ...(variant === 'inverted' && {
        color: theme.vars.palette[color].darker,
        backgroundColor: theme.vars.palette[color].lighter,
      }),
    };
  }

  // if there is a custom color it will override the default color
  if (customColor) {
    const rgb = hexToRgb(customColor);
    style = {
      // FILLED
      ...(variant === 'filled' && {
        color: isLight(customColor) ? 'white' : theme.palette.text.primary,
        backgroundColor: customColor,
      }),
      // OUTLINED
      ...(variant === 'outlined' && {
        backgroundColor: 'transparent',
        color,
        border: `2px solid ${customColor}`,
      }),
      // SOFT
      ...(variant === 'soft' && {
        color,
        backgroundColor: varAlpha(`${rgb.r} ${rgb.g} ${rgb.b}`, 0.16),
      }),
    };
  }

  const shapeStyle = {
    borderRadius: 0,
    padding: '',
  };

  if (shape === 'rounded') {
    shapeStyle.borderRadius = theme.shape.borderRadius * 0.75;
    shapeStyle.padding = theme.spacing(0, 0.75);
  } else if (shape === 'square') {
    shapeStyle.borderRadius = 0;
    shapeStyle.padding = theme.spacing(0, 0.75);
  } else if (shape === 'fullRounded') {
    shapeStyle.borderRadius = theme.shape.borderRadius * 100;
    shapeStyle.padding = theme.spacing(0, 1.5);
  }

  const sizeStyle = {
    fontSize: '',
    fontWeight: theme.typography.fontWeightBold,
  };

  if (size === 'small') {
    sizeStyle.fontSize = theme.typography.pxToRem(10);
    sizeStyle.fontWeight = theme.typography.fontWeightBold;
  } else if (size === 'medium') {
    sizeStyle.fontSize = theme.typography.pxToRem(12);
    sizeStyle.fontWeight = theme.typography.fontWeightBold;
  } else if (size === 'large') {
    sizeStyle.fontSize = theme.typography.pxToRem(14);
    sizeStyle.fontWeight = theme.typography.fontWeightRegular;
  }

  return {
    height: 24,
    minWidth: 24,
    lineHeight: 0,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shorter,
    }),
    ...shapeStyle,
    ...sizeStyle,
    ...style,
  };
});

// function isThemeColor(color: string): color is LabelColor {
//   return ["default", "primary", "secondary", "info", "success", "warning", "error"].includes(color);
// }
