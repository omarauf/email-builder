import { Iconify } from '@/components/iconify';
import { Scrollbar } from '@/components/scrollbar';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const cardStyle = {
  boxShadow:
    'rgba(0, 0, 0, 0.07) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 15px 35px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px',
  transition: 'margin .15s ease-out',
  display: 'grid',
};

interface ActionButton {
  icon: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

interface Props {
  title?: string;
  children: React.ReactNode;
  actionButton?: { left?: ActionButton; right?: ActionButton };
  style?: React.CSSProperties;
  onClick?: VoidFunction;
  onMouseEnter?: VoidFunction;
  onMouseLeave?: VoidFunction;
}

export function SettingCard({ title, actionButton, children, style, ...other }: Props) {
  return (
    <div
      className="bg-card overflow-hidden rounded-2xl"
      style={{ ...cardStyle, ...style }}
      {...other}>
      {title && (
        <>
          <div className="relative flex cursor-pointer items-center justify-center">
            {actionButton?.left && (
              <Button
                size="icon"
                variant="ghost"
                onClick={actionButton.left.onClick}
                className="absolute left-2.5"
                style={actionButton.left.style}>
                <Iconify icon={actionButton.left.icon} />
              </Button>
            )}

            <p className="py-4 text-center font-semibold">{title}</p>

            {actionButton?.right && (
              <Button
                size="icon"
                variant="ghost"
                onClick={actionButton.right.onClick}
                className="absolute right-2.5"
                style={actionButton.right.style}>
                <Iconify icon={actionButton.right.icon} />
              </Button>
            )}
          </div>
          <Separator />
        </>
      )}

      <Scrollbar>{children}</Scrollbar>
    </div>
  );
}
