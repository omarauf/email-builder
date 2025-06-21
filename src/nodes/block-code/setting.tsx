import { Box, Button, Divider } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { XField } from '@/components/input';
import { useState } from 'react';
import { StyleComponent } from '@/components/styles';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { BlockCode } from './type';
import type { BlockIndex } from '../block/type';

interface Props {
  selectedBlock: BlockCode & { idx: BlockIndex };
}

export function CodeSetting({ selectedBlock }: Props) {
  const [screen, setBlockByKey] = useBuilderStore(useShallow((s) => [s.screen, s.setBlockByKey]));
  const [html, setHtml] = useState(selectedBlock.data.code);

  const { idx, data, style } = selectedBlock;

  const showButton = data.code !== html;

  return (
    <>
      <Box position="relative">
        <XField.Code value={html} onChange={setHtml} />
        <Button
          variant="outlined"
          size="small"
          color="primary"
          disabled={!showButton}
          sx={{
            position: 'absolute',
            right: 12,
            bottom: 12,
            borderRadius: 99,
            px: 2,
          }}
          onClick={() => setBlockByKey(idx, 'data.code', html)}>
          Apply Code
        </Button>
      </Box>

      <Divider />

      <StyleComponent.Color
        title="Block Background Color"
        value={style.blockBackgroundColor || 'transparent'}
        onChange={(v) => setBlockByKey(idx, 'style.blockBackgroundColor', v)}
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
