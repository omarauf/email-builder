import type { RecursivePartial } from '@/types/utils';
import type { Inset, Responsive, Visibility } from '@/types';

export function defaultPadding(padding?: RecursivePartial<Inset>) {
  return [padding?.[0] || 0, padding?.[1] || 0, padding?.[2] || 0, padding?.[3] || 0] as Inset;
}

export function defaultResponsivePadding(padding?: Responsive<Inset | undefined>) {
  if (padding === undefined)
    return { desktop: undefined, mobile: undefined } as Responsive<Inset | undefined>;

  return {
    desktop: [
      padding.desktop?.[0] || 0,
      padding.desktop?.[1] || 0,
      padding.desktop?.[2] || 0,
      padding.desktop?.[3] || 0,
    ],
    mobile: [
      padding.mobile?.[0] || 0,
      padding.mobile?.[1] || 0,
      padding.mobile?.[2] || 0,
      padding.mobile?.[3] || 0,
    ],
  } as Responsive<Inset | undefined>;
}

export function defaultVisibility(visibility?: Partial<Visibility>) {
  return {
    desktop: visibility?.desktop || false,
    mobile: visibility?.mobile || false,
  } as Visibility;
}
