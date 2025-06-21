import { Fragment, useCallback } from 'react';
import { Stack, Divider, IconButton, Typography } from '@mui/material';
import { XField } from '@/components/input';
import { useShallow } from 'zustand/react/shallow';
import { Iconify } from '@/components/iconify';
import { blockStyle, StyleComponent } from '@/components/styles';
import { ColorPicker } from '@/components/color-picker';
import { XToggleButtonGroup } from '@/components/buttons';
import { XTabs } from '@/components/tabs';
import { useBuilderStore } from '@/hooks/use-builder-store';
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

          <Divider />

          <StyleComponent.Block title="Fit to Container">
            <XField.Switch
              value={style.fullWidth || false}
              onChange={(v) => setBlockByKey(idx, `style.fullWidth`, v)}
            />
          </StyleComponent.Block>

          <Divider />

          <StyleComponent.Alignment
            disabled={style.fullWidth}
            defaultValue="left"
            title={`Alignment (${screen})`}
            value={style.alignment?.[screen]}
            onChange={(v) => setBlockByKey(idx, `style.alignment.${screen}`, v)}
          />

          <Divider />

          <StyleComponent.MarginPadding
            badge
            title={`Menu Padding (${screen})`}
            value={style.padding?.[screen]}
            onChange={(value) => setBlockByKey(idx, `style.padding.${screen}`, value)}
          />

          <Divider />

          <StyleComponent.MarginPadding
            badge
            title={`Item Margin (${screen})`}
            value={style.margin?.[screen]}
            onChange={(value) => setBlockByKey(idx, `style.margin.${screen}`, value)}
          />

          <Divider />

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
              size="small"
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
              sx={{ width: 120 }}
            />
          </StyleComponent.Block>

          <Divider />

          <Stack>
            {data.menus.map((menu, i) => (
              <Fragment key={i}>
                <Stack sx={{ ...blockStyle, py: 1.5 }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between">
                    <Typography variant="body2">Menu {i + 1}</Typography>

                    <Stack direction="row" spacing={1}>
                      <IconButton
                        disabled={i === data.menus.length - 1}
                        onClick={() => shiftMenuForward(i, 1)}>
                        <Iconify icon="iconamoon:arrow-down-2-duotone" />
                      </IconButton>
                      <IconButton disabled={i === 0} onClick={() => shiftMenuForward(i, -1)}>
                        <Iconify icon="iconamoon:arrow-up-2-duotone" />
                      </IconButton>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                    <Typography variant="body2">Text</Typography>
                    <XField.Text
                      value={menu.text}
                      onChange={(v) => setBlockByKey(idx, `data.menus.${i}.text`, v)}
                      size="small"
                    />
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                    <Typography variant="body2">Link</Typography>
                    <XField.Text
                      value={menu.link}
                      onChange={(v) => setBlockByKey(idx, `data.menus.${i}.link`, v)}
                      size="small"
                    />
                  </Stack>

                  {/* TODO: Implement this */}
                  {/* <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                    <Typography variant="body2">Hide on {screen}</Typography>
                    <XField.Switch
                      value={menu.hide[screen]}
                      onChange={(v) => setBlockByKey(idx, `data.menus.${i}.hide.${screen}`, v)}
                    />
                  </Stack> */}
                </Stack>

                <Divider />
              </Fragment>
            ))}
          </Stack>
        </>
      ),
    },

    {
      label: 'Styles',
      content: (
        <>
          <Stack sx={blockStyle}>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ width: 0.3 }} variant="body2">
                Separator
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
                value={style.divider || 0}
                onChange={(v) => setBlockByKey(idx, 'style.divider', v)}
                steps={1}
                min={1}
                sx={{ width: 0.3 }}
              />
              <XToggleButtonGroup
                value={style.dividerStyle || 'solid'}
                onChange={(v) => setBlockByKey(idx, 'style.dividerStyle', v)}
                sx={{ width: 0.3 }}
                buttons={[
                  {
                    value: 'solid',
                    icon: 'gg:border-style-solid',
                    title: 'Solid',
                  },
                  {
                    value: 'dashed',
                    icon: 'gg:border-style-dashed',
                    title: 'Dashed',
                  },
                  {
                    value: 'dotted',
                    icon: 'gg:border-style-dotted',
                    title: 'Dotted',
                  },
                ]}
              />
              <ColorPicker
                value={style.dividerColor || '#000000'}
                onChange={(v) => setBlockByKey(idx, 'style.dividerColor', v)}
                sx={{ width: 0.3 }}
              />
            </Stack>
          </Stack>

          <Divider />

          <StyleComponent.FontFamily
            value={style.fontFamily || globalStripeStyles.fontFamily}
            onChange={(v) => setBlockByKey(idx, 'style.fontFamily', v)}
          />

          <Divider />

          <StyleComponent.FontSize
            badge
            title={`Font Size (${screen})`}
            value={style.fontSize?.[screen] || globalStripeStyles[stripeType].fontSize[screen]}
            onChange={(v) => setBlockByKey(idx, `style.fontSize.${screen}`, v)}
          />

          <Divider />

          <StyleComponent.TextStyles
            value={style.textStyle || []}
            onChange={(v) => setBlockByKey(idx, `style.textStyle`, v)}
          />

          <Divider />

          <StyleComponent.Color
            title={`Link Color (${screen})`}
            value={style.linkColor || globalStripeStyles[stripeType].linkColor}
            onChange={(v) => setBlockByKey(idx, 'style.linkColor', v)}
          />

          <Divider />
        </>
      ),
    },
  ];

  return <XTabs tabs={tabs} styleType="custom" variant="fullWidth" />;
}
