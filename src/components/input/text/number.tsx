import { IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import { useCallback } from 'react';
import { useDebounce } from '@/hooks/use-debounce-fc';
import { Iconify } from '../../iconify';
import type { InputBaseProps } from '../common/types';

type Props = InputBaseProps & {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  steps?: number;
  slotProps?: {
    input?: TextFieldProps;
  };
};

export function XNumber({
  error,
  helperText,
  value,
  steps = 1,
  min,
  max,
  slotProps,
  fitWidth,
  onChange,
  ...other
}: Props) {
  const { debounceValue, setInnerValue, innerValue } = useDebounce(value, (v) => {
    let n = v;
    if (typeof min === 'number' && v < min) n = min;
    else if (typeof max === 'number' && v > max) n = max;

    onChange(n);
    return n;
  });

  const handleChange = useCallback(
    (v: number) => {
      const rounedV = Math.round(v * 100) / 100;
      setInnerValue(rounedV);
      debounceValue(rounedV);
    },
    [debounceValue, setInnerValue]
  );

  const isMin = value === min;
  const isMax = value === max;

  return (
    <TextField
      value={innerValue}
      type="number"
      onChange={(event) => handleChange(Number(event.target.value))}
      error={!!error}
      helperText={error || helperText}
      fullWidth={!fitWidth}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              onClick={() => handleChange(innerValue - steps)}
              edge="start"
              disabled={isMin}>
              <Iconify icon="solar:minus-circle-line-duotone" />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => handleChange(innerValue + steps)}
              edge="end"
              disabled={isMax}>
              <Iconify icon="solar:add-circle-line-duotone" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...slotProps?.input}
      {...other}
    />
  );
}
