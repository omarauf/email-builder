import * as React from 'react';
import { NumericFormat, type NumericFormatProps } from 'react-number-format';
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  type TextFieldProps,
  type IconButtonProps,
} from '@mui/material';
import { Iconify } from '@/components/iconify';

function NumericFormatCustom(props: NumericFormatProps & { ref: React.Ref<HTMLInputElement> }) {
  const { decimalSeparator, thousandSeparator, value, ref, ...rest } = props;

  const defaultThousandSeparator = React.useMemo(() => getThousandSeparator('en-US'), []);

  const defaultDecimalSeparator = React.useMemo(() => getDecimalSeparator('en-US'), []);

  return (
    <NumericFormat
      {...rest}
      value={value ?? ''} // We can't ever pass undefined to value because it breaks the shrink state of the label, so we pass empty string instead
      getInputRef={ref}
      thousandSeparator={thousandSeparator ?? defaultThousandSeparator}
      decimalSeparator={decimalSeparator ?? defaultDecimalSeparator}
    />
  );
}

type NumberInputProps = Omit<TextFieldProps, 'onChange'> & {
  hideActionButtons?: boolean;
  max?: number;
  min?: number;
  numericFormatProps?: NumericFormatProps;
  onChange?: (value: number | undefined) => void;
  step?: number;
  value?: number | undefined;
};

export function XNumber2(props: NumberInputProps) {
  const {
    disabled = false,
    hideActionButtons = false,
    max = Infinity,
    min = -Infinity,
    numericFormatProps: numericFormatPropsProp,
    onChange,
    size,
    step = 1,
    value: valueProp,
    InputProps,
    ref,
    ...rest
  } = props;
  const isControlled = valueProp !== undefined && onChange !== undefined;

  // We use an internal state when the component is uncontrolled
  const [fallbackValue, setFallbackValue] = React.useState(valueProp);
  const value = isControlled ? valueProp : fallbackValue;
  const setValue = isControlled ? onChange : setFallbackValue;

  const increment = () => {
    // If we increment when the input is empty, we consider the previous value to be 0
    const newValue = (value !== undefined && !Number.isNaN(value) ? value : 0) + step;

    if (newValue > max) {
      return;
    }

    setValue(newValue);
  };

  const decrement = () => {
    // If we decrement when the input is empty, we consider the previous value to be 0
    const newValue = (value !== undefined && !Number.isNaN(value) ? value : 0) - step;

    if (newValue < min) {
      return;
    }

    setValue(newValue);
  };

  const numericFormatProps: NumericFormatProps = {
    // We set a default to avoid displaying floating point errors when using a decimal step
    decimalScale: 5,

    // react-number-format doesn't provide min or max props so we do the checking here instead
    isAllowed: ({ floatValue }) => {
      if (floatValue === undefined) {
        return true;
      }

      return floatValue >= min && floatValue <= max;
    },

    // Only add the min, max and step html attributes when the value isn't the default one
    max: max !== Infinity ? max : undefined,
    min: min !== -Infinity ? min : undefined,
    step: step !== 1 ? step : undefined,

    // Allow to increment with ArrowUp and decrement with ArrowDown
    onKeyDown: (event) => {
      if (event.key === 'ArrowUp') {
        increment();
      } else if (event.key === 'ArrowDown') {
        decrement();
      }
    },

    onValueChange: ({ floatValue }) => {
      // When incrementing or decrementing, the value prop is already up to date
      // so we make sure the value needs to be updated to prevent an unnecessary re-render
      if (floatValue === value) {
        return;
      }

      setValue(floatValue ?? undefined);
    },
    value,

    ...numericFormatPropsProp,
  };

  const commonAdornmentButtonProps: IconButtonProps = {
    edge: 'end',
    sx: {
      p: size !== 'small' ? '1px' : '0',
      pr: size !== 'small' ? '1px' : 0.5,
    },
  };

  const iconSize = size === 'small' ? 16 : 20;

  return (
    <TextField
      {...rest}
      ref={ref}
      value={value ?? ''} // We can't ever pass undefined to value because it breaks the shrink state of the label, so we pass empty string instead
      disabled={disabled}
      size={size}
      InputProps={{
        inputComponent: NumericFormatCustom as any,
        endAdornment: !hideActionButtons && (
          <InputAdornment position="end">
            <Stack>
              <IconButton
                aria-label="incrementAriaLabel"
                disabled={disabled || (value ?? 0) + step > max}
                onClick={increment}
                {...commonAdornmentButtonProps}>
                <Iconify icon="material-symbols:keyboard-arrow-up" width={iconSize} />
              </IconButton>
              <IconButton
                aria-label="decrementAriaLabel"
                disabled={disabled || (value ?? 0) - step < min}
                onClick={decrement}
                {...commonAdornmentButtonProps}>
                <Iconify icon="material-symbols:keyboard-arrow-down" width={iconSize} />
              </IconButton>
            </Stack>
          </InputAdornment>
        ),

        slotProps: {
          // @ts-expect-error The type should be React.ComponentProps<typeof inputComponent> but instead
          // it is hard-coded to InputBaseComponentProps
          input: { ...numericFormatProps },
        },

        ...InputProps,
      }}

      // slotProps={{
      //   ...slotProps,
      //   // @ts-expect-error The type should be React.ComponentProps<typeof inputComponent> but instead
      //   // it is hard-coded to InputBaseComponentProps
      //   htmlInput: { ...slotProps?.htmlInput, ...numericFormatProps },
      // }}
    />
  );
}

// Taken from here:
// https://stackoverflow.com/questions/32054025/how-to-determine-thousands-separator-in-javascript#comments-77517574

function getThousandSeparator(locale: string) {
  return (
    new Intl.NumberFormat(locale).formatToParts(1234.5678).find((part) => part.type === 'group')
      ?.value ?? ''
  );
}

function getDecimalSeparator(locale: string) {
  return (
    new Intl.NumberFormat(locale).formatToParts(1234.5678).find((part) => part.type === 'decimal')
      ?.value ?? '.'
  );
}
