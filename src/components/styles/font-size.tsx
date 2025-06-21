import { XField } from '@/components/input';
import { fontSizeOptions } from '@/constant/font';
import { Block } from './block';

interface Props {
  badge?: boolean;
  title?: string;
  value: number;
  onChange: (v: number) => void;
}

export function FontSizeSetting({ badge, title, value, onChange }: Props) {
  return (
    <Block badge={badge} title={title || 'Font Size'}>
      <XField.Select
        options={fontSizeOptions}
        value={value}
        size="small"
        onChange={(v) => {
          if (v) onChange(v);
        }}
        sx={{ width: 120 }}
      />
    </Block>
  );
}
