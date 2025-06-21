import type { TextFieldProps } from '@mui/material/TextField';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { formatStr } from '@/utils/format-time';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { InputBaseProps } from '../common/types';

type Props = InputBaseProps & {
  slotProps?: {
    textField: TextFieldProps;
  };
  minDate?: Dayjs | string;
  maxDate?: Dayjs | string;
} & (
    | {
        value: string | undefined;
        clearable: true;
        onChange: (value: string | undefined) => void;
      }
    | {
        value: string;
        clearable?: false;
        onChange: (value: string) => void;
      }
  );

export function XDatePicker({
  value,
  error,
  label,
  clearable,
  slotProps,
  helperText,
  onChange,
  fitWidth,
  maxDate,
  minDate,
  ...other
}: Props) {
  return (
    <DatePicker
      value={value === undefined ? null : dayjs(value)}
      label={label}
      onChange={(newValue) => {
        const val = newValue === null ? undefined : dayjs(newValue).toISOString();
        if (clearable) onChange(val);
        else if (val !== undefined) onChange(val);
      }}
      format={formatStr.split.date}
      minDate={minDate ? dayjs(minDate) : undefined}
      maxDate={maxDate ? dayjs(maxDate) : undefined}
      slotProps={{
        textField: {
          fullWidth: !fitWidth,
          error: !!error,
          helperText: error ?? helperText,
          ...slotProps?.textField,
        },

        ...(clearable && {
          field: {
            clearable: true,
            onClear: () => onChange(undefined),
          },
        }),

        ...slotProps,
      }}
      {...other}
    />
  );
}
