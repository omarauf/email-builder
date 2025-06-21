import { Stack, alpha, Typography, ButtonBase } from '@mui/material';
import type { Layout } from '@/nodes/structure/type';
import * as IcLayout from '@/assets/svg/layout';
import { SvgColor } from '@/components/svg-color';

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
    <Stack display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr 1fr" gap={2} mt={2}>
      {layouts.map((l) => {
        const selected = l.value === value;
        const disabled = l.containerCount !== -1 && l.containerCount !== containerCount;

        return (
          <ButtonBase
            disabled={disabled}
            key={l.value}
            sx={{
              width: 1,
              aspectRatio: '1/1',
              flexDirection: 'column',
              borderRadius: 1,
              border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.08)}`,

              ...(disabled && {
                opacity: 0.4,
              }),

              ...(selected && {
                bgcolor: 'background.paper',
                boxShadow: (theme) =>
                  `-24px 8px 24px -4px ${alpha(
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[500]
                      : theme.palette.common.black,
                    0.08
                  )}`,
              }),
            }}
            onClick={() => onChange(l.value)}>
            <SvgColor
              src={l.icon}
              sx={{
                width: 36,
                height: 36,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.grey[500]} 0%, ${theme.palette.grey[600]} 100%)`,
                ...(selected && {
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                }),
              }}
            />

            <Typography
              variant="subtitle2"
              fontSize={12}
              sx={{ ...(selected && { color: 'primary.main' }) }}>
              {l.value}
            </Typography>
          </ButtonBase>
        );
      })}
    </Stack>
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
