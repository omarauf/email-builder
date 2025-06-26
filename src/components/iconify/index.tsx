// eslint-disable-next-line import-x/no-extraneous-dependencies
import { Icon, type IconProps } from '@iconify/react';

type IconifyProps = IconProps & {
  ref?: SVGElement;
};
export function Iconify({ className, width = 20, style, ...other }: IconifyProps) {
  return (
    <Icon
      className={className}
      style={{ width, height: width, flexShrink: 0, display: 'inline-flex', ...style }}
      {...other}
    />
  );
}
