import Switch from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import type { FormLabelProps } from '@mui/material/FormLabel';
import type { FormControlProps } from '@mui/material/FormControl';
import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import type { SwitchProps } from '@mui/material/Switch';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import type { InputBaseProps } from '../common/types';

type Props = InputBaseProps & {
  value: boolean;
  title?: string;
  onChange: (value: boolean) => void;
  slotProps?: {
    control?: FormControlProps;
    controlLabel?: Partial<FormControlLabelProps>;
    title?: FormLabelProps;
    helperText?: FormHelperTextProps;
    switch?: SwitchProps;
  };
};

export function XSwitch({
  value,
  slotProps,
  label,
  title,
  error,
  helperText,
  fitWidth = true,
  onChange,
  ...other
}: Props) {
  const onChangeHandler = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onChange(checked);
  };

  return (
    <FormControl error={!!error} fullWidth={!fitWidth} {...slotProps?.control} {...other}>
      {title && (
        <FormLabel component="legend" {...slotProps?.title}>
          {title}
        </FormLabel>
      )}

      {label !== undefined && (
        <FormControlLabel
          control={<Switch checked={value} onChange={onChangeHandler} {...slotProps?.switch} />}
          label={label}
          {...slotProps?.controlLabel}
        />
      )}

      {label === undefined && (
        <Switch checked={value} onChange={onChangeHandler} {...slotProps?.switch} />
      )}

      {(!!error || helperText) && (
        <FormHelperText error={!!error} {...slotProps?.helperText}>
          {error || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
