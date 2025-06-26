import type { Alignment } from '@/types';
import { Iconify } from '@/components/iconify';
import { Block } from './block';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

interface Props {
  title: string;
  value?: Alignment;
  defaultValue: Alignment;
  disabled?: boolean;
  onChange: (value: Alignment) => void;
}

export function AlignmentSetting({ title, value, disabled, defaultValue, onChange }: Props) {
  const current = value || defaultValue;

  const handleClick = (v: Alignment) => {
    if (v === current) return;
    onChange(v);
  };

  return (
    <Block badge title={title}>
      <ToggleGroup
        type="single"
        disabled={disabled}
        variant="outline"
        value={value || defaultValue}
        onValueChange={handleClick}>
        <ToggleGroupItem value="left">
          <Iconify icon="lucide:align-start-vertical" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <Iconify icon="lucide:align-center-vertical" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <Iconify icon="lucide:align-end-vertical" />
        </ToggleGroupItem>
      </ToggleGroup>
    </Block>
  );
}
