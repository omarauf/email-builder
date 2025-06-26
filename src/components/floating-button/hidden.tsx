interface Props {
  hidden?: boolean;
}

export function HiddenBadge({ hidden }: Props) {
  if (!hidden) return null;

  return (
    <span
      className="bg-muted-foreground text-foreground rounded-md px-2 py-1 text-xs font-bold"
      style={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}>
      Hidden
    </span>
  );
}
