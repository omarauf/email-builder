import { cn } from '@/lib/utils';

interface Props {
  title: string;
  control?: React.ReactNode | boolean;
  children?: React.ReactNode;
  className?: string;
  badge?: boolean;
}

export const blockStyle = { px: 'px-5', py: 'py-4' };

export function Block({ badge, title, children, control, className }: Props) {
  const bothExist = control && children;

  return (
    <div className={cn('flex flex-col gap-2 px-5 py-4', className)}>
      <div className="flex items-center justify-between">
        {badge ? (
          <BadgedTitle title={title} />
        ) : (
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
        )}

        {/* Only render if control is not a boolean */}
        {typeof control === 'boolean' ? null : (control ?? children)}
      </div>

      {bothExist && <div>{children}</div>}
    </div>
  );
}

function BadgedTitle({ title }: { title: string }) {
  return (
    <div className="relative pl-3">
      <span className="bg-primary absolute top-1.5 left-0 h-1.5 w-1.5 rounded-full" />
      <p className="text-muted-foreground text-sm font-medium">{title}</p>
    </div>
  );
}
