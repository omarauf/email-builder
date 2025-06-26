import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';
import { XField } from '@/components/input';
import { Separator } from '@/components/ui/separator';
import { ColorPicker } from '@/components/color-picker';
import { XToggleButtonGroup } from '@/components/x-common';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { blockStyle, StyleComponent } from '@/components/styles';
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

      <Separator />

      <StyleComponent.Block badge title={`Width (${screen})`}>
        <XField.Number
          value={style.width?.[screen] || 100}
          onChange={(v) => setBlockByKey(idx, `style.width.${screen}`, v)}
          steps={1}
          className="w-[120px]"
        />
        <XToggleButtonGroup
          type="single"
          value={style.widthUnit?.[screen] || '%'}
          onChange={(v) => setBlockByKey(idx, `style.widthUnit.${screen}`, v)}
          buttons={[
            { title: '%', value: '%' },
            { title: 'px', value: 'px' },
          ]}
        />
      </StyleComponent.Block>

      <Separator />

      <div className={cn('flex flex-col', blockStyle.px, blockStyle.py)}>
        <div className="flex justify-between gap-4">
          <p className="w-1/3">Border</p>
          <p className="w-1/3">Style</p>
          <p className="w-1/3">Color</p>
        </div>
        <div className="my-0.5 flex justify-between gap-4">
          <XField.Number
            value={style.border || 0}
            onChange={(v) => setBlockByKey(idx, 'style.border', v)}
            steps={1}
            min={1}
            className="w-1/3"
          />
          <XToggleButtonGroup
            type="single"
            value={style.borderStyle || 'solid'}
            onChange={(v) => setBlockByKey(idx, 'style.borderStyle', v)}
            className="w-1/3"
            buttons={[
              { value: 'solid', icon: 'gg:border-style-solid' },
              { value: 'dashed', icon: 'gg:border-style-dashed' },
              { value: 'dotted', icon: 'gg:border-style-dotted' },
            ]}
          />
          <ColorPicker
            value={style.borderColor || '#000000'}
            onChange={(v) => setBlockByKey(idx, 'style.borderColor', v)}
            className="w-1/3"
          />
        </div>
      </div>

      <Separator />

      <StyleComponent.Alignment
        title={`Alignment (${screen})`}
        defaultValue="left"
        value={style.alignment?.[screen]}
        onChange={(v) => setBlockByKey(idx, `style.alignment.${screen}`, v)}
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
