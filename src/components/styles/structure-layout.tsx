import type { Layout } from '@/nodes/structure/type';
import { cn } from '@/lib/utils';
import * as IcLayout from '@/assets/svg/layout';
import { RippleButton } from '../animate-ui/buttons/ripple';

const layouts = [
  { containerCount: -1, value: 'auto', icon: IcLayout.IcLayout1 },
  { containerCount: 2, value: '1:2', icon: IcLayout.IcLayout12 },
  { containerCount: 2, value: '2:1', icon: IcLayout.IcLayout21 },
  { containerCount: 2, value: '1:3', icon: IcLayout.IcLayout13 },
  { containerCount: 2, value: '3:1', icon: IcLayout.IcLayout31 },
] as const;

interface Props {
  containerWidth: number[];
  containerCount: number;
  onChange: (value: Layout) => void;
}

export function StructureLayout({ containerWidth, containerCount, onChange }: Props) {
  const value = getLayoutFromWidth(containerWidth);

  return (
    <div className="mt-6 grid grid-cols-5 gap-2">
      {layouts.map((l) => {
        const selected = l.value === value;
        const disabled = l.containerCount !== -1 && l.containerCount !== containerCount;

        return (
          <RippleButton
            size="icon"
            onClick={() => onChange(l.value)}
            variant="outline"
            disabled={disabled}
            className={cn(
              'flex aspect-square h-auto w-full flex-col items-center justify-center gap-1',
              selected ? 'text-primary border-primary' : 'border-muted-foreground/20'
            )}>
            <l.icon
              key={l.value}
              className={selected ? 'stroke-foreground' : 'stroke-muted-foreground'}
              style={{ width: 40, height: 40 }}
            />
            <p>{l.value}</p>
          </RippleButton>
        );
      })}
    </div>
  );
}

function getLayoutFromWidth(width: number[]): Layout {
  const totalWidth = width.reduce((acc, w) => acc + w, 0);

  if (width.length !== 2) return 'auto';

  const w1 = width[0];
  const w2 = width[1];
  const wt = w1 + w2;

  if (isNear(w1, 2 * w2) && isNear(wt, totalWidth)) return '2:1';
  if (isNear(2 * w1, w2) && isNear(wt, totalWidth)) return '1:2';

  if (isNear(w1, 3 * w2) && isNear(wt, totalWidth)) return '3:1';
  if (isNear(3 * w1, w2) && isNear(wt, totalWidth)) return '1:3';

  return 'auto';
}

function isNear(a: number, b: number, threshold = 3) {
  return Math.abs(a - b) < threshold;
}
