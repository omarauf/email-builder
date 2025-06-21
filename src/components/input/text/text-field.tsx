import TextField from '@mui/material/TextField';
import { Typography, InputAdornment, type TextFieldProps } from '@mui/material';
import type { InputBaseProps } from '../common/types';

type Value = string | number;

type Props<T extends Value> = InputBaseProps & {
  value: T;
  type?: 'text' | 'number';
  onChange: (value: T) => void;
  slotProps?: {
    input?: TextFieldProps;
  };
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  showCounter?: boolean;
  maxLength?: number;
};

export function XTextField<T extends Value>({
  error,
  type,
  helperText,
  value,
  slotProps,
  onChange,
  fitWidth,
  showCounter,
  maxLength,
  multiline,
  ...other
}: Props<T>) {
  return (
    <TextField
      value={type === 'number' ? value : value}
      fullWidth={!fitWidth}
      type={type}
      onChange={(event) => {
        if (type === 'number' && isNumber(value)) onChange(parseFloat(event.target.value) as T);
        else onChange(event.target.value as T);
      }}
      error={!!error}
      helperText={error || helperText} // helperText={typeof error === "string" ? error || helperText : helperText}
      InputProps={{
        endAdornment: maxLength && showCounter && (
          <InputAdornment position="end" sx={{ alignSelf: multiline ? 'start' : 'auto' }}>
            <Typography variant="body2" color="textSecondary">
              {`${(value as string).length}/${maxLength}`}
            </Typography>
          </InputAdornment>
        ),

        ...slotProps?.input?.InputProps,
      }}
      multiline={multiline}
      {...slotProps?.input}
      {...other}
    />
  );
}

function isNumber(value: string | number): value is number {
  return !Number.isNaN(Number(value));
}
