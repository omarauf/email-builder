import { Label } from '@/components/label';

interface Props {
  hidden?: boolean;
}

export function HiddenBadge({ hidden }: Props) {
  if (!hidden) return null;

  return (
    <Label
      variant="inverted"
      color="warning"
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
      }}>
      Hidden
    </Label>
  );
}
