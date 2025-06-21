import type { Theme, SxProps, ToggleButtonProps } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Iconify } from '@/components/iconify';

interface Props<T extends string | number> {
  value: T;
  onChange: (value: T) => void;
  buttons: {
    icon?: string;
    title?: string;
    disabled?: boolean;
    color?: ToggleButtonProps['color'];
    value: T;
  }[];
  sx?: SxProps<Theme>;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

// TODO: Replace all ToggleButtonGroup with XToggleButtonGroup
export function XToggleButtonGroup<T extends string | number>({
  buttons,
  value,
  sx,
  size,
  onChange,
  disabled,
}: Props<T>) {
  const width = 1 / buttons.length;

  return (
    <ToggleButtonGroup
      exclusive
      size={size || 'small'}
      onChange={(_, v) => {
        if (v) onChange(v);
      }}
      value={value}
      sx={sx}
      disabled={disabled}>
      {buttons.map(({ value: v, icon, title, color, disabled: d }) => (
        <ToggleButton disabled={d} key={v} color={color} value={v} sx={{ width }}>
          {icon && <Iconify icon={icon} />}
          {title && title}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
