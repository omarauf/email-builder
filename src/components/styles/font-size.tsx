import { Input } from '@/components/ui/input';
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
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-32"
        min={1}
        max={200}
        step={1}
      />
    </Block>
  );
}
