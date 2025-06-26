import { useTheme } from '../theme/theme-provider';

export function usePattern() {
  const { resolvedTheme } = useTheme();

  return resolvedTheme === 'light'
    ? 'linear-gradient(45deg, rgba(0, 0, 0, 0.07) 25%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.07) 0px), linear-gradient(45deg, rgba(0, 0, 0, 0.07) 25%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.07) 0px)'
    : 'linear-gradient(45deg,rgba(225, 225, 225, 0.1) 25%,transparent 0,transparent 75%,rgba(225, 225, 225, 0.1) 0),linear-gradient(45deg,rgba(225, 225, 225, 0.1) 25%,transparent 0,transparent 75%,rgba(225, 225, 225, 0.1) 0)';
}
