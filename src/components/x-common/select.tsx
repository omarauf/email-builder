import {
  Select,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select';
import type { Option } from '../input/common/types';
import { convertOptions } from '../input/utils';

type Value = string | number;

interface Props<T extends Value> {
  options: Option<T, Value>[] | T[];
  value: T | undefined;
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function XSelect<T extends Value>({
  options,
  value,
  label,
  onChange,
  placeholder,
  className,
}: Props<T>) {
  const opts = convertOptions(options);

  return (
    <Select value={String(value)} onValueChange={onChange as (value: string) => void}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label !== undefined && <SelectLabel>{label}</SelectLabel>}
          {opts.map((option) => (
            <SelectItem key={option.id} value={String(option.id)}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
