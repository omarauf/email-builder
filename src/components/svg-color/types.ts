import type { BoxProps } from '@mui/material/Box';

export type SvgColorProps = BoxProps & {
  src: string;
  ref?: React.Ref<HTMLSpanElement>;
};
