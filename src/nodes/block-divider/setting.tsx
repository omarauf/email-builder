import { Stack, Divider, Typography } from '@mui/material';
import { XField } from '@/components/input';
import { useShallow } from 'zustand/react/shallow';
import { blockStyle, StyleComponent } from '@/components/styles';
import { ColorPicker } from '@/components/color-picker';
import { XToggleButtonGroup } from '@/components/buttons';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { BlockDivider } from './type';
import type { BlockIndex } from '../block/type';

interface Props {
  selectedBlock: BlockDivider & { idx: BlockIndex };
}

export function DividerSetting({ selectedBlock }: Props) {
  const [screen, setBlockByKey] = useBuilderStore(useShallow((s) => [s.screen, s.setBlockByKey]));

  const { idx, data, style } = selectedBlock;

  return (
    <>
      <StyleComponent.Color
        title="Block Background Color"
        value={style.blockBackgroundColor || 'transparent'}
        onChange={(v) => setBlockByKey(idx, 'style.blockBackgroundColor', v)}
      />

      <Divider />

      <StyleComponent.Block badge title={`Width (${screen})`}>
        <XField.Number
          size="small"
          value={style.width?.[screen] || 100}
          onChange={(v) => setBlockByKey(idx, `style.width.${screen}`, v)}
          steps={1}
          sx={{ width: 120 }}
        />
        <XToggleButtonGroup
          value={style.widthUnit?.[screen] || '%'}
          onChange={(v) => setBlockByKey(idx, `style.widthUnit.${screen}`, v)}
          buttons={[
            { title: '%', value: '%' },
            { title: 'px', value: 'px' },
          ]}
        />
      </StyleComponent.Block>

      <Divider />

      <Stack sx={blockStyle}>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ width: 0.3 }} variant="body2">
            Border
          </Typography>
          <Typography sx={{ width: 0.3 }} variant="body2">
            Style
          </Typography>
          <Typography sx={{ width: 0.3 }} variant="body2">
            Color
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <XField.Number
            size="small"
            value={style.border || 0}
            onChange={(v) => setBlockByKey(idx, 'style.border', v)}
            steps={1}
            min={1}
            sx={{ width: 0.3 }}
          />
          <XToggleButtonGroup
            value={style.borderStyle || 'solid'}
            onChange={(v) => setBlockByKey(idx, 'style.borderStyle', v)}
            sx={{ width: 0.3 }}
            buttons={[
              { value: 'solid', icon: 'gg:border-style-solid' },
              { value: 'dashed', icon: 'gg:border-style-dashed' },
              { value: 'dotted', icon: 'gg:border-style-dotted' },
            ]}
          />
          <ColorPicker
            value={style.borderColor || '#000000'}
            onChange={(v) => setBlockByKey(idx, 'style.borderColor', v)}
            sx={{ width: 0.3 }}
          />
        </Stack>
      </Stack>

      <Divider />

      <StyleComponent.Alignment
        title={`Alignment (${screen})`}
        defaultValue="left"
        value={style.alignment?.[screen]}
        onChange={(v) => setBlockByKey(idx, `style.alignment.${screen}`, v)}
      />

      <Divider />

      <StyleComponent.MarginPadding
        badge
        title={`Margin (${screen})`}
        value={style.padding?.[screen]}
        onChange={(value) => setBlockByKey(idx, `style.padding.${screen}`, value)}
      />

      <Divider />

      <StyleComponent.Hide value={data.hide} onChange={(v) => setBlockByKey(idx, `data.hide`, v)} />
    </>
  );
}
