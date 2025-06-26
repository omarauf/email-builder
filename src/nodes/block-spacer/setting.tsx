import { useShallow } from 'zustand/react/shallow';
import { XField } from '@/components/input';
import { StyleComponent } from '@/components/styles';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { BlockSpacer } from './type';
import type { BlockIndex } from '../block/type';

interface Props {
  selectedBlock: BlockSpacer & { idx: BlockIndex };
}

export function SpacerSetting({ selectedBlock }: Props) {
  const [screen, setBlockByKey] = useBuilderStore(useShallow((s) => [s.screen, s.setBlockByKey]));

  const { idx, data, style } = selectedBlock;

  return (
    <>
      <StyleComponent.Color
        title={`Block Background Color (${screen})`}
        value={style.blockBackgroundColor || 'transparent'}
        onChange={(v) => setBlockByKey(idx, 'style.blockBackgroundColor', v)}
      />

      <Separator />

      <StyleComponent.Block badge title={`Height (${screen})`}>
        <XField.Number
          value={style.height[screen] || 0}
          onChange={(v) => setBlockByKey(idx, `style.height.${screen}`, v)}
          steps={1}
          className="w-[120px]"
        />
      </StyleComponent.Block>

      <Separator />

      <StyleComponent.Hide value={data.hide} onChange={(v) => setBlockByKey(idx, `data.hide`, v)} />
    </>
  );
}
