import type { Optional } from '@/types/utils';
import type { Inset, Border, FontFamily, Responsive, ButtonHover } from '@/types';

export interface GlobalButtonStyle {
  fontFamily: FontFamily;
  fontSize: Responsive<number>;
  fontColor: string;
  textStyles: ('bold' | 'italic' | 'underline')[];
  letterSpacing: { value: number; unit: 'px' | 'em' };
  buttonColor: string;
  border: Border | undefined;
  hover: Optional<ButtonHover>;
  borderRadius: Inset | undefined;
  padding: Responsive<Inset>;
  fullWidth: Responsive<boolean>;
}
