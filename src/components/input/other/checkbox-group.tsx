import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import type { CheckboxProps } from '@mui/material/Checkbox';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import type { FormLabelProps } from '@mui/material/FormLabel';
import type { FormGroupProps } from '@mui/material/FormGroup';
import type { FormControlProps } from '@mui/material/FormControl';
import type { FormControlLabelProps } from '@mui/material/FormControlLabel';

import { convertOptions } from '../utils';
import type { InputBaseProps, Option } from '../common/types';

type Value = string | number;

type Props<T extends Value> = InputBaseProps & {
  value: T[];
  onChange: (value: T[]) => void;
  title?: string;
  slotProps?: {
    control?: FormControlProps;
    controlLabel?: FormControlLabelProps;
    title?: FormLabelProps;
    group?: FormGroupProps;
    checkbox?: CheckboxProps;
    helperText?: FormHelperTextProps;
  };
  options: Option<T, Value>[] | T[];
};

export function XCheckboxGroup<T extends Value>({
  value,
  onChange,
  options,
  title,
  error,
  helperText,
  slotProps,
  fitWidth,
  ...other
}: Props<T>) {
  const opts = convertOptions(options);

  const onChangeHandler = (id: T) => (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) onChange([...value, id]);
    else onChange(value.filter((v) => v !== id));
  };

  return (
    <FormControl error={!!error} fullWidth={!fitWidth} {...slotProps?.control} {...other}>
      {title && (
        <FormLabel component="legend" {...slotProps?.title}>
          {title}
        </FormLabel>
      )}

      <FormGroup {...slotProps?.group}>
        {opts.map((o) => (
          <FormControlLabel
            key={o.id}
            control={
              <Checkbox
                onChange={onChangeHandler(o.id)}
                checked={value.includes(o.id)}
                {...slotProps?.checkbox}
              />
            }
            label={o.name}
            {...slotProps?.controlLabel}
          />
        ))}
      </FormGroup>

      {(!!error || helperText) && (
        <FormHelperText error={!!error} {...slotProps?.helperText}>
          {error || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
