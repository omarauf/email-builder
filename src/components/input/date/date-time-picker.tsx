import type { TextFieldProps } from '@mui/material/TextField';
import { formatStr } from '@/utils/format-time';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import type { InputBaseProps } from '../common/types';

type Props = InputBaseProps & {
  slotProps?: {
    textField: TextFieldProps;
  };
  minDateTime?: Dayjs;
  maxDateTime?: Dayjs;
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

export function XDateTimePicker({
  value,
  error,
  clearable,
  slotProps,
  label,
  helperText,
  onChange,
  fitWidth,
  ...other
}: Props) {
  return (
    <DateTimePicker
      label={label}
      value={value === undefined ? null : dayjs(value)}
      onChange={(newValue) => {
        const val = newValue === null ? undefined : dayjs(newValue).format();
        if (clearable) onChange(val);
        else if (val !== undefined) onChange(val);
      }}
      format={formatStr.split.dateTime}
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
        actionBar: {
          actions: clearable ? ['clear', 'today'] : ['today'],
        },
      }}
      {...other}
    />
  );
}
