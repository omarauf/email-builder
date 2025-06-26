import { Iconify } from '@/components/iconify';
import { Block } from './block';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

type Value = 'bold' | 'italic' | 'underline';

interface Props {
  value: Value[];
  onChange: (newValue: Value[]) => void;
}

export function TextStyles({ value, onChange }: Props) {
  return (
    <Block title="Text Styles">
      <ToggleGroup
        type="multiple"
        variant="outline"
        value={value}
        onValueChange={(v) => onChange(v as Value[])}>
        <ToggleGroupItem key="bold" value="bold">
          <Iconify icon="ooui:bold-b" />
        </ToggleGroupItem>
        <ToggleGroupItem key="italic" value="italic">
          <Iconify icon="ooui:italic-i" />
        </ToggleGroupItem>
        <ToggleGroupItem key="underline" value="underline">
          <Iconify icon="ooui:underline-u" />
        </ToggleGroupItem>
      </ToggleGroup>
    </Block>
  );
}
