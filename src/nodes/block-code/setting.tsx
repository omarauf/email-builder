import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { html as htmlExt } from '@codemirror/lang-html';
import ReactCodeMirror, { EditorView } from '@uiw/react-codemirror';
import { useTheme } from '@/components/theme';
import { Button } from '@/components/ui/button';
import { Scrollbar } from '@/components/scrollbar';
import { StyleComponent } from '@/components/styles';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { BlockCode } from './type';
import type { BlockIndex } from '../block/type';

interface Props {
  selectedBlock: BlockCode & { idx: BlockIndex };
}

export function CodeSetting({ selectedBlock }: Props) {
  const [screen, setBlockByKey] = useBuilderStore(useShallow((s) => [s.screen, s.setBlockByKey]));
  const [html, setHtml] = useState(selectedBlock.data.code);
  const { resolvedTheme } = useTheme();

  const { idx, data, style } = selectedBlock;

  const showButton = data.code !== html;

  return (
    <>
      <div className="relative">
        <Scrollbar style={{ height: 500 }}>
          <ReactCodeMirror
            value={html}
            height="100%"
            extensions={[htmlExt(), EditorView.lineWrapping]}
            onChange={setHtml}
            style={{
              borderRadius: '8px',
              cursor: 'text',
              height: '100%',
              minHeight: '100%',
            }}
            theme={resolvedTheme}
          />
        </Scrollbar>

        <Button
          variant="outline"
          disabled={!showButton}
          className="absolute right-3 bottom-3 px-4"
          onClick={() => setBlockByKey(idx, 'data.code', html)}>
          Apply Code
        </Button>
      </div>

      <Separator />

      <StyleComponent.Color
        title="Block Background Color"
        value={style.blockBackgroundColor || 'transparent'}
        onChange={(v) => setBlockByKey(idx, 'style.blockBackgroundColor', v)}
      />

      <Separator />

      <StyleComponent.MarginPadding
        badge
        title={`Margin (${screen})`}
        value={style.padding?.[screen]}
        onChange={(value) => setBlockByKey(idx, `style.padding.${screen}`, value)}
      />

      <Separator />

      <StyleComponent.Hide value={data.hide} onChange={(v) => setBlockByKey(idx, `data.hide`, v)} />
    </>
  );
}
