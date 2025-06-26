import type { TextType } from '@/nodes/block-text/type';
import { TextTypeOptions } from '@/constant/heading';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Block } from './block';

interface Props {
  value: TextType;
  onChange: (value: TextType) => void;
}

export function HeadingTypeSetting({ value, onChange }: Props) {
  return (
    <Block title="Heading Type" control>
      <ToggleGroup
        type="single"
        value={value}
        variant="outline"
        onValueChange={(v) => v && onChange(v as TextType)}
        className="w-full">
        {TextTypeOptions.map((o) => (
          <ToggleGroupItem key={o} value={o}>
            {o}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Block>
  );
}
