import { Input } from '@/components/ui/input';
import { Block } from './block';

interface Props {
  badge?: boolean;
  title: string;
  subTitle: string;
  value: number;
  onChange: (v: number) => void;
  className?: string;
}

export function BottomSpace({ title, subTitle, badge, value, className, onChange }: Props) {
  return (
    <Block
      title={title}
      badge={badge}
      className={className}
      control={
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-32"
        />
      }>
      <p className="text-muted-foreground mb-2 text-sm">{subTitle}</p>
    </Block>
  );
}
