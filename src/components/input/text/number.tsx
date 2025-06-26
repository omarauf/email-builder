import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce-fc';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  steps?: number;
  className?: string;
}

export function XNumber({ value, steps = 1, min, max, onChange, className }: Props) {
  const { debounceValue, setInnerValue, innerValue } = useDebounce(value, (v) => {
    let n = v;
    if (typeof min === 'number' && v < min) n = min;
    else if (typeof max === 'number' && v > max) n = max;

    onChange(n);
    return n;
  });

  const handleChange = useCallback(
    (v: number) => {
      const roundedV = Math.round(v * 100) / 100;
      setInnerValue(roundedV);
      debounceValue(roundedV);
    },
    [debounceValue, setInnerValue]
  );

  return (
    <Input
      value={innerValue}
      type="number"
      onChange={(event) => handleChange(event.target.valueAsNumber)}
      step={steps}
      min={min}
      max={max}
      className={className}
    />
  );
}
