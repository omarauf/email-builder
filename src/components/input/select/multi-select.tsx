import type { ChipProps } from '@mui/material/Chip';
import type { SelectProps } from '@mui/material/Select';
import type { CheckboxProps } from '@mui/material/Checkbox';
import type { InputLabelProps } from '@mui/material/InputLabel';
import type { FormControlProps } from '@mui/material/FormControl';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useMemo } from 'react';
import { convertOptions } from '../utils';
import type { InputBaseProps, Option } from '../common/types';

type Value = string | number;

type Props<T extends Value> = InputBaseProps & {
  options: Option<T, Value>[] | T[];
  value: T[];
  onChange: (value: T[]) => void;
  chip?: boolean;
  checkbox?: boolean;
  placeholder?: string;
  slotProps?: {
    chip?: ChipProps;
    control?: FormControlProps;
    select: SelectProps;
    checkbox?: CheckboxProps;
    inputLabel?: InputLabelProps;
    helperText?: FormHelperTextProps;
  };
};

export function XMultiSelect<T extends Value>({
  chip,
  label,
  options,
  checkbox,
  placeholder,
  slotProps,
  value,
  helperText,
  error,
  onChange,
  fitWidth,
  ...other
}: Props<T>) {
  const id = useMemo(() => `${Math.random().toString(36).substring(7)}-select`, []);
  const labelId = useMemo(() => `${id}-select-label`, [id]);

  const opts = convertOptions(options);

  return (
    <FormControl error={!!error} fullWidth={!fitWidth} {...slotProps?.control} {...other}>
      {label && (
        <InputLabel htmlFor={labelId} {...slotProps?.inputLabel}>
          {label}
        </InputLabel>
      )}

      <Select
        multiple
        labelId={labelId}
        id={id}
        displayEmpty={!!placeholder}
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value as T[])}
        renderValue={(selected) => {
          const selectedItems = opts.filter((item) =>
            (selected as (string | number)[]).includes(item.id)
          );

          if (!selectedItems.length && placeholder) {
            return <Box sx={{ color: 'text.disabled' }}>{placeholder}</Box>;
          }

          if (chip) {
            return (
              <Box sx={{ gap: 0.5, display: 'flex', flexWrap: 'wrap' }}>
                {selectedItems.map((item) => (
                  <Chip
                    key={item.id}
                    size="small"
                    variant="filled"
                    label={item.name}
                    {...slotProps?.chip}
                  />
                ))}
              </Box>
            );
          }

          return selectedItems.map((item) => item.name).join(', ');
        }}
        {...slotProps?.select}>
        {opts.length === 0 && (
          <MenuItem disabled value="">
            No options available
          </MenuItem>
        )}

        {opts.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {checkbox && (
              <Checkbox
                size="small"
                disableRipple
                checked={value.includes(option.id)}
                {...slotProps?.checkbox}
              />
            )}

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
