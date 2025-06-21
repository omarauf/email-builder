import { useMemo } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import type { CheckboxProps } from '@mui/material/Checkbox';
import type { SelectProps } from '@mui/material/Select';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import type { FormLabelProps } from '@mui/material/FormLabel';
import type { FormControlProps } from '@mui/material/FormControl';
import type { InputLabelProps } from '@mui/material/InputLabel';
import type { PaperProps } from '@mui/material';
import { Iconify } from '@/components/iconify';
import { convertOptions } from '../utils';
import type { InputBaseProps, Option } from '../common/types';

type Value = string | number;

type Props<T extends Value> = InputBaseProps & {
  options: Option<T, Value>[] | T[];
  value: T | undefined;
  onChange: (value: T | undefined) => void;
  slotProps?: {
    inputLabel?: InputLabelProps;
    control?: FormControlProps;
    select?: SelectProps;
    title?: FormLabelProps;
    checkbox?: CheckboxProps;
    helperText?: FormHelperTextProps;
    paper?: PaperProps;
  };
  maxMenuHeight?: number;
  placeholder?: string;
  // wrapScrollbar?: boolean;
};

export function XSelect<T extends Value>({
  options,
  value,
  error,
  label,
  slotProps,
  helperText,
  onChange,
  fitWidth,
  maxMenuHeight,
  placeholder,
  ...other
}: Props<T>) {
  const id = useMemo(() => `${Math.random().toString(36).substring(7)}-select`, []);
  const labelId = useMemo(() => `${id}-select-label`, [id]);

  /**
   * This is a hack to fix the issue of the out of range value
   * we convert the value to string if the value is undefined
   */
  let v = typeof value === 'undefined' ? '' : value;

  if (placeholder && v === '') v = 'XSelect-placeholder';

  const opts = convertOptions(options);

  return (
    <FormControl error={!!error} fullWidth={!fitWidth} {...slotProps?.control} {...other}>
      {label && (
        <InputLabel htmlFor={labelId} {...slotProps?.inputLabel}>
          {label}
        </InputLabel>
      )}

      <Select
        labelId={labelId}
        id={id}
        value={v}
        label={label}
        onChange={(e) => onChange(e.target.value as T)}
        MenuProps={{
          PaperProps: {
            sx: { maxHeight: maxMenuHeight || 350 },
            ...slotProps?.paper,
          },
        }}
        slotProps={{ input: { sx: { display: 'flex', alignItems: 'center' } } }} // to center the icon
        {...slotProps?.select}
        sx={{
          ...(v === 'XSelect-placeholder' && {
            color: 'text.disabled',
          }),
          ...slotProps?.select?.sx,
        }}>
        {placeholder && (
          <MenuItem value="XSelect-placeholder" sx={{ display: 'none' }}>
            {placeholder}
          </MenuItem>
        )}

        {opts.length === 0 && (
          <MenuItem disabled value="">
            No options available
          </MenuItem>
        )}

        {opts.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.icon && <Iconify icon={option.icon} mr={1} />}
            {option.name}
          </MenuItem>
        ))}
      </Select>

      {(!!error || helperText) && (
        <FormHelperText error={!!error} {...slotProps?.helperText}>
          {error || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
