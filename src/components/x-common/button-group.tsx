import { Iconify } from '@/components/iconify';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

type Props<T extends U extends 'single' ? string : string[], U extends 'single' | 'multiple'> = {
  buttons: {
    icon?: string;
    title?: string;
    disabled?: boolean;
    value: T extends string ? T : T[number];
  }[];
  disabled?: boolean;
  className?: string;
} & (
  | {
      type: 'single';
      value: T;
      onChange: (value: T) => void;
    }
  | {
      type: 'multiple';
      value: T[];
      onChange: (value: T[]) => void;
    }
);

// TODO: Replace all ToggleButtonGroup with XToggleButtonGroup
export function XToggleButtonGroup<
  T extends U extends 'single' ? string : string[],
  U extends 'single' | 'multiple',
>({ buttons, value, onChange, disabled, className, type }: Props<T, U>) {
  if (type === 'single') {
    return (
      <ToggleGroup
        type="single"
        variant="outline"
        value={value as string}
        disabled={disabled}
        onValueChange={onChange as (v: string) => void}
        className={className}>
        {buttons.map((b) => (
          <ToggleGroupItem key={b.value} value={b.value} disabled={b.disabled}>
            {b.icon && <Iconify icon={b.icon} />}
            {b.title && <span className={b.icon ? 'ml-1' : ''}>{b.title}</span>}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    );
  }
  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      value={value as string[]}
      disabled={disabled}
      onValueChange={onChange as (v: string[]) => void}
      className={className}>
      {buttons.map((b) => (
        <ToggleGroupItem key={b.value} value={b.value} disabled={b.disabled}>
          {b.icon && <Iconify icon={b.icon} />}
          {b.title && <span className={b.icon ? 'ml-1' : ''}>{b.title}</span>}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
