import type { BoxProps } from '@mui/material/Box';

export type LabelColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type LabelVariant = 'filled' | 'outlined' | 'soft' | 'inverted';
export type LabelShape = 'rounded' | 'fullRounded' | 'square';
export type LabelSize = 'small' | 'medium' | 'large';

export type LabelProps = BoxProps & {
  startIcon?: React.ReactElement | null;
  endIcon?: React.ReactElement | null;
  color?: LabelColor;
  customColor?: string;
  variant?: LabelVariant;
  shape?: LabelShape;
  size?: LabelSize;
};
