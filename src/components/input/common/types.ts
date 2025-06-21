import type { Theme, SxProps } from '@mui/material';

export interface Option<T = number, U = string> {
  id: T;
  name: U;
  systemColor?: string;
  color?: string;
  icon?: string;
}

export interface InputBaseProps {
  size?: 'small' | 'medium';
  disabled?: boolean;
  className?: string;
  helperText?: React.ReactNode;
  error?: string | boolean;
  label?: string;
  sx?: SxProps<Theme>;
  fitWidth?: boolean;
}
