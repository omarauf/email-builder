import Radio from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import type { RadioGroupProps } from '@mui/material/RadioGroup';
import type { RadioProps } from '@mui/material/Radio';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import type { FormLabelProps } from '@mui/material/FormLabel';
import type { FormControlProps } from '@mui/material/FormControl';
import type { FormControlLabelProps } from '@mui/material/FormControlLabel';

import { convertOptions } from '../utils';
import type { InputBaseProps, Option } from '../common/types';

type Value = string | number;

type Props<T extends Value> = InputBaseProps & {
  options: Option<T, Value>[] | T[];
  value: T;
  onChange: (value: T) => void;
  title?: string;
  slotProps?: {
    control?: FormControlProps;
    controlLabel?: FormControlLabelProps;
    title?: FormLabelProps;
    group?: RadioGroupProps;
    radio?: RadioProps;
    helperText?: FormHelperTextProps;
  };
};

export function XRadioGroup<T extends Value>({
  title,
  error,
  value,
  onChange,
  options,
  helperText,
  slotProps,
  fitWidth,
  ...other
}: Props<T>) {
  const opts = convertOptions(options);

  const onChangeHandler = (_: React.ChangeEvent<HTMLInputElement>, v: string) => {
    if (typeof value === 'number') onChange(parseInt(v, 10) as T);
    else onChange(v as T);
  };

  return (
    <FormControl
      error={!!error}
      component="fieldset"
      fullWidth={!fitWidth}
      {...slotProps?.control}
      {...other}>
      {title && (
        <FormLabel component="legend" {...slotProps?.title}>
          {title}
        </FormLabel>
      )}

      <RadioGroup value={value} onChange={onChangeHandler} {...slotProps?.group}>
        {opts.map((option) => (
          <FormControlLabel
            key={option.id}
            value={option.id}
            control={<Radio {...slotProps?.radio} />}
            label={option.name}
          />
        ))}
      </RadioGroup>

      {(!!error || helperText) && (
        <FormHelperText error={!!error} {...slotProps?.helperText}>
          {error || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
