import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { TextFieldProps } from '@mui/material';
import { formatStr } from '@/utils/format-time';
import type { InputBaseProps } from '../common/types';

type Props = InputBaseProps & {
  slotProps?: {
    textField: TextFieldProps;
  };
  minTime?: Dayjs | string;
  maxTime?: Dayjs | string;
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

export function XTimePicker({
  value,
  label,
  error,
  clearable,
  disabled,
  slotProps,
  helperText,
  onChange,
  fitWidth,
  minTime,
  maxTime,
  ...other
}: Props) {
  return (
    <TimePicker
      label={label}
      value={value === undefined ? null : dayjs(value)}
      onChange={(newValue) => {
        const val = newValue === null ? undefined : dayjs(newValue).toISOString();
        if (clearable) onChange(val);
        else if (val !== undefined) onChange(val);
      }}
      minTime={minTime ? dayjs(minTime) : undefined}
      maxTime={maxTime ? dayjs(maxTime) : undefined}
      viewRenderers={{
        hours: renderTimeViewClock,
        minutes: renderTimeViewClock,
        seconds: renderTimeViewClock,
      }}
      format={formatStr.time}
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
