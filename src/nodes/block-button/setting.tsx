import { useShallow } from 'zustand/react/shallow';
import { XField } from '@/components/input';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { XTabs } from '@/components/x-common/tabs';
import { StyleComponent } from '@/components/styles';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { BlockButton } from './type';
import type { BlockIndex } from '../block/type';

interface Props {
  selectedBlock: BlockButton & { idx: BlockIndex };
}

export function ButtonSetting({ selectedBlock }: Props) {
  const [globalButtonStyles, screen, setBlockByKey] = useBuilderStore(
    useShallow((s) => [s.styles.button, s.screen, s.setBlockByKey])
  );

  const { idx, data, style } = selectedBlock;

  const tabs = [
    {
      label: 'Settings',
      content: (
        <>
          <StyleComponent.ExternalLink
            title="Link"
            value={data.link}
            onChange={(v) => setBlockByKey(idx, 'data.link', v)}
          />

          <Separator />

          <StyleComponent.Block title="Button Text" control>
            <Input
              value={data.text}
              onChange={(e) => setBlockByKey(idx, 'data.text', e.target.value)}
            />
          </StyleComponent.Block>

          <Separator />

          <StyleComponent.Alignment
            title={`Alignment (${screen})`}
            value={style.align?.[screen]}
            defaultValue="left"
            onChange={(v) => setBlockByKey(idx, `style.align.${screen}`, v)}
          />

          <Separator />

          <StyleComponent.ButtonHeight
            align={style.verticalAlign}
            height={style.height}
            onHeightChange={(h) => setBlockByKey(idx, 'style.height', h)}
            onAlignChange={(a) => setBlockByKey(idx, 'style.verticalAlign', a)}
          />

          <Separator />

          <StyleComponent.MarginPadding
            badge
            title={`Margin (${screen})`}
            value={style.padding?.[screen]}
            onChange={(value) => setBlockByKey(idx, `style.padding.${screen}`, value)}
          />

          <Separator />

          <StyleComponent.Hide
            value={data.hide}
            onChange={(v) => setBlockByKey(idx, `data.hide`, v)}
          />
        </>
      ),
    },

    {
      label: 'Styles',
      content: (
        <>
          <StyleComponent.Color
            title="Block Background Color"
            value={style.blockBackgroundColor || 'transparent'}
            onChange={(v) => setBlockByKey(idx, 'style.blockBackgroundColor', v)}
          />

          <Separator />

          <StyleComponent.Color
            title="Button Color"
            value={style.buttonColor || globalButtonStyles.buttonColor}
            onChange={(v) => setBlockByKey(idx, 'style.buttonColor', v)}
          />

          <Separator />

          <StyleComponent.FontFamily
            value={style.fontFamily || globalButtonStyles.fontFamily}
            onChange={(v) => setBlockByKey(idx, 'style.fontFamily', v)}
          />

          <Separator />

          <StyleComponent.Block badge title={`Font Size (${screen})`}>
            <XField.Number
              value={style.fontSize?.[screen] || globalButtonStyles.fontSize[screen]}
              onChange={(v) => setBlockByKey(idx, `style.fontSize.${screen}`, v)}
              steps={1}
              className="w-[120px]"
            />
          </StyleComponent.Block>

          <Separator />

          <StyleComponent.TextStyles
            value={style.textStyle || globalButtonStyles.textStyles}
            onChange={(v) => setBlockByKey(idx, `style.textStyle`, v)}
          />

          <Separator />

          <StyleComponent.Color
            title="Font Color"
            value={style.fontColor || globalButtonStyles.fontColor}
            onChange={(v) => setBlockByKey(idx, 'style.fontColor', v)}
          />

          <Separator />

          <StyleComponent.Block title={`Fit to Container (${screen})`} badge>
            <Switch
              checked={
                style.fullWidth?.[screen] === undefined
                  ? globalButtonStyles.fullWidth[screen]
                  : style.fullWidth[screen]
              }
              onCheckedChange={(v) => setBlockByKey(idx, `style.fullWidth.${screen}`, v)}
            />
          </StyleComponent.Block>

          <Separator />

          <StyleComponent.BorderRadius
            value={style.borderRadius || globalButtonStyles.borderRadius}
            onChange={(v) => setBlockByKey(idx, 'style.borderRadius', v)}
          />

          <Separator />

          <StyleComponent.Border
            value={style.border || globalButtonStyles.border}
            onChange={(value) => setBlockByKey(idx, `style.border`, value)}
          />

          {globalButtonStyles.hover && (
            <>
              <Separator />

              <StyleComponent.ButtonHover
                value={{
                  borderColor:
                    style.hover?.borderColor ||
                    globalButtonStyles.hover.borderColor ||
                    style.border?.color ||
                    globalButtonStyles.border?.color ||
                    'transparent',
                  buttonColor:
                    style.hover?.buttonColor ||
                    globalButtonStyles.hover.buttonColor ||
                    style.buttonColor ||
                    globalButtonStyles.buttonColor,
                  fontColor:
                    style.hover?.fontColor ||
                    globalButtonStyles.hover.fontColor ||
                    style.fontColor ||
                    globalButtonStyles.fontColor,
                }}
                onChange={(k, v) => setBlockByKey(idx, `style.hover.${k}`, v)}
              />
            </>
          )}

          <Separator />

          <StyleComponent.MarginPadding
            badge
            title={`Padding (${screen})`}
            value={style.innerPadding?.[screen] || globalButtonStyles.padding[screen]}
            onChange={(value) => setBlockByKey(idx, `style.innerPadding.${screen}`, value)}
          />
        </>
      ),
    },
  ];

  return <XTabs tabs={tabs} defaultTab="Settings" className="h-12 rounded-none border-b py-1.5" />;
}
