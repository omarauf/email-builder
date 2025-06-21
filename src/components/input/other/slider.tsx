import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import type { FormLabelProps } from '@mui/material/FormLabel';
import type { FormControlProps } from '@mui/material/FormControl';
import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import type { SliderProps } from '@mui/material/Slider';
import type { InputBaseProps } from '../common/types';

type Props = InputBaseProps & {
  title?: string;
  value: number;
  onChange: (value: number | number[], activeThumb: number) => void;
  slotProps?: {
    control?: FormControlProps;
    controlLabel?: FormControlLabelProps;
    title?: FormLabelProps;
    helperText?: FormHelperTextProps;
    slider?: SliderProps;
  };
};

export function XSlider({
  error,
  value,
  onChange,
  helperText,
  slotProps,
  label,
  title,
  fitWidth,
  ...other
}: Props) {
  const onChangeHandler = (_: Event, v: number | number[], activeThumb: number) => {
    onChange(v, activeThumb);
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
          control={<Slider value={value} onChange={onChangeHandler} {...slotProps?.slider} />}
          label={label}
          {...slotProps?.controlLabel}
        />
      )}

      {label === undefined && (
        <Slider value={value} onChange={onChangeHandler} {...slotProps?.slider} />
      )}

      {(!!error || helperText) && (
        <FormHelperText error={!!error} {...slotProps?.helperText}>
          {error || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
