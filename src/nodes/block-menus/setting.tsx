import { Fragment, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';
import { XField } from '@/components/input';
import { Input } from '@/components/ui/input';
import { Iconify } from '@/components/iconify';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { XTabs } from '@/components/x-common/tabs';
import { Separator } from '@/components/ui/separator';
import { ColorPicker } from '@/components/color-picker';
import { XToggleButtonGroup } from '@/components/x-common';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { blockStyle, StyleComponent } from '@/components/styles';
import type { BlockMenu } from './type';
import type { BlockIndex } from '../block/type';

interface Props {
  selectedBlock: BlockMenu & { idx: BlockIndex };
}

export function MenuSetting({ selectedBlock }: Props) {
  const [globalStripeStyles, screen, setBlockByKey, getParentStripeType] = useBuilderStore(
    useShallow((s) => [s.styles.stripe, s.screen, s.setBlockByKey, s.getParentStripeType])
  );

  const { idx, data, style } = selectedBlock;
  const stripeType = getParentStripeType(selectedBlock);

  const shiftMenuForward = useCallback(
    (index: number, direction: 1 | -1) => {
      const newMenus = [...data.menus];

      if (direction === 1) {
        if (index < 0 || index >= newMenus.length - 1) return;

        [newMenus[index], newMenus[index + 1]] = [newMenus[index + 1], newMenus[index]];

        setBlockByKey(idx, 'data.menus', newMenus);
      }

      if (direction === -1) {
        if (index <= 0 || index >= newMenus.length) return;

        [newMenus[index], newMenus[index - 1]] = [newMenus[index - 1], newMenus[index]];
        setBlockByKey(idx, 'data.menus', newMenus);
      }
    },
    [data.menus, idx, setBlockByKey]
  );

  const tabs = [
    {
      label: 'Settings',
      content: (
        <>
          {/* TODO: Implement this */}
          {/* <StyleComponent.Block title="Menu Item Type" control>
            <XToggleButtonGroup
              value={data.type}
              onChange={(v) => setBlockByKey(idx, "data.type", v)}
              buttons={[
                { value: "links", title: "Links" },
                { value: "icon", title: "Icons" },
                { value: "link-icons", title: "Link and Icons" },
              ]}
            />
          </StyleComponent.Block> */}

          <Separator />

          <StyleComponent.Block title="Fit to Container">
            <Switch
              checked={style.fullWidth || false}
              onCheckedChange={(v) => setBlockByKey(idx, `style.fullWidth`, v)}
            />
          </StyleComponent.Block>

          <Separator />

          <StyleComponent.Alignment
            disabled={style.fullWidth}
            defaultValue="left"
            title={`Alignment (${screen})`}
            value={style.alignment?.[screen]}
            onChange={(v) => setBlockByKey(idx, `style.alignment.${screen}`, v)}
          />

          <Separator />

          <StyleComponent.MarginPadding
            badge
            title={`Menu Padding (${screen})`}
            value={style.padding?.[screen]}
            onChange={(value) => setBlockByKey(idx, `style.padding.${screen}`, value)}
          />

          <Separator />

          <StyleComponent.MarginPadding
            badge
            title={`Item Margin (${screen})`}
            value={style.margin?.[screen]}
            onChange={(value) => setBlockByKey(idx, `style.margin.${screen}`, value)}
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
      label: 'Items',
      content: (
        <>
          <StyleComponent.Block title="Number of Menus">
            <XField.Number
              value={data.menus.length}
              onChange={(v) => {
                const oldLength = data.menus.length;
                if (oldLength > v) {
                  setBlockByKey(idx, 'data.menus', data.menus.slice(0, v));
                } else {
                  setBlockByKey(idx, 'data.menus', [
                    ...data.menus,
                    {
                      text: `Common Menu ${data.menus.length + 1}`,
                      link: 'https://',
                      hide: { desktop: false, mobile: false },
                    },
                  ]);
                }
              }}
              steps={1}
              min={1}
              max={8}
              className="w-[120px]"
            />
          </StyleComponent.Block>

          <Separator />

          <div className="flex flex-col">
            {data.menus.map((menu, i) => (
              <Fragment key={i}>
                <div className={cn('flex flex-col', blockStyle.px, blockStyle.py)}>
                  <div className="flex items-center justify-between gap-4">
                    <p>Menu {i + 1}</p>

                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={i === data.menus.length - 1}
                        onClick={() => shiftMenuForward(i, 1)}>
                        <Iconify icon="iconamoon:arrow-down-2-duotone" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={i === 0}
                        onClick={() => shiftMenuForward(i, -1)}>
                        <Iconify icon="iconamoon:arrow-up-2-duotone" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-4">
                    <p>Text</p>
                    <Input
                      value={menu.text}
                      onChange={(e) => setBlockByKey(idx, `data.menus.${i}.text`, e.target.value)}
                    />
                  </div>

                  <div className="mt-2 flex items-center gap-4">
                    <p>Link</p>
                    <Input
                      value={menu.link}
                      onChange={(e) => setBlockByKey(idx, `data.menus.${i}.link`, e.target.value)}
                    />
                  </div>

                  {/* TODO: Implement this */}
                  {/* <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                    <Typography variant="body2">Hide on {screen}</Typography>
                    <XField.Switch
                      value={menu.hide[screen]}
                      onChange={(v) => setBlockByKey(idx, `data.menus.${i}.hide.${screen}`, v)}
                    />
                  </Stack> */}
                </div>

                <Separator />
              </Fragment>
            ))}
          </div>
        </>
      ),
    },

    {
      label: 'Styles',
      content: (
        <>
          <div className={cn('flex flex-col', blockStyle.px, blockStyle.py)}>
            <div className="flex justify-between gap-4">
              <p className="w-1/3">Separator</p>
              <p className="w-1/3">Style</p>
              <p className="w-1/3">Color</p>
            </div>
            <div className="mt-0.5 flex justify-between gap-4">
              <XField.Number
                value={style.divider || 0}
                onChange={(v) => setBlockByKey(idx, 'style.divider', v)}
                steps={1}
                min={1}
                className="w-1/3"
              />
              <XToggleButtonGroup
                type="single"
                value={style.dividerStyle || 'solid'}
                onChange={(v) => setBlockByKey(idx, 'style.dividerStyle', v)}
                className="w-1/3"
                buttons={[
                  { value: 'solid', icon: 'gg:border-style-solid' },
                  { value: 'dashed', icon: 'gg:border-style-dashed' },
                  { value: 'dotted', icon: 'gg:border-style-dotted' },
                ]}
              />
              <ColorPicker
                value={style.dividerColor || '#000000'}
                onChange={(v) => setBlockByKey(idx, 'style.dividerColor', v)}
                className="w-1/3"
              />
            </div>
          </div>

          <Separator />

          <StyleComponent.FontFamily
            value={style.fontFamily || globalStripeStyles.fontFamily}
            onChange={(v) => setBlockByKey(idx, 'style.fontFamily', v)}
          />

          <Separator />

          <StyleComponent.FontSize
            badge
            title={`Font Size (${screen})`}
            value={style.fontSize?.[screen] || globalStripeStyles[stripeType].fontSize[screen]}
            onChange={(v) => setBlockByKey(idx, `style.fontSize.${screen}`, v)}
          />

          <Separator />

          <StyleComponent.TextStyles
            value={style.textStyle || []}
            onChange={(v) => setBlockByKey(idx, `style.textStyle`, v)}
          />

          <Separator />

          <StyleComponent.Color
            title={`Link Color (${screen})`}
            value={style.linkColor || globalStripeStyles[stripeType].linkColor}
            onChange={(v) => setBlockByKey(idx, 'style.linkColor', v)}
          />

          <Separator />
        </>
      ),
    },
  ];

  return <XTabs tabs={tabs} defaultTab="Settings" />;
}
