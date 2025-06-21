import { XField } from '@/components/input';
import type { FontFamily } from '@/types';
import { fontFamilyOptions } from '@/constant/font';
import { Block } from './block';

interface Props {
  value: FontFamily;
  onChange: (v: FontFamily) => void;
}

export function FontFamilySetting({ value, onChange }: Props) {
  return (
    <Block title="Font Family">
      <XField.Select
        options={[...fontFamilyOptions]}
        value={value}
        size="small"
        onChange={(v) => {
          if (v) onChange(v);
        }}
        sx={{ width: 250 }}
      />
    </Block>
  );
}
