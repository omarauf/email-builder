import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import type { CheckboxProps } from '@mui/material/Checkbox';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import type { FormLabelProps } from '@mui/material/FormLabel';
import type { FormControlProps } from '@mui/material/FormControl';
import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import type { InputBaseProps } from '../common/types';

type Props = InputBaseProps & {
  value: boolean;
  onChange: (value: boolean) => void;
  title?: string;
  slotProps?: {
    control?: FormControlProps;
    controlLabel?: FormControlLabelProps;
    title?: FormLabelProps;
    checkbox?: CheckboxProps;
    helperText?: FormHelperTextProps;
  };
};

export function XCheckbox({
  value,
  onChange,
  title,
  label,
  error,
  helperText,
  slotProps,
  fitWidth,
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
          control={<Checkbox onChange={onChangeHandler} checked={value} {...slotProps?.checkbox} />}
          label={label}
          {...slotProps?.controlLabel}
        />
      )}

      {label === undefined && (
        <Checkbox onChange={onChangeHandler} checked={value} {...slotProps?.checkbox} />
      )}

      {(!!error || helperText) && (
        <FormHelperText error={!!error} {...slotProps?.helperText}>
          {error || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
