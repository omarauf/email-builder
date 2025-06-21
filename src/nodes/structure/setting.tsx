import { Box, Stack, Button, Divider, Typography, IconButton } from '@mui/material';
import { XField } from '@/components/input';
import { Iconify } from '@/components/iconify';
import { useShallow } from 'zustand/react/shallow';
import { toast } from 'sonner';
import { blockStyle, StyleComponent } from '@/components/styles';
import { getImageMetaData } from '@/utils/image';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { StructureTree, StructureIndex } from './type';
import type { StripeTree } from '../stripe/type';

interface Props {
  selectedStructure: StructureTree & { idx: StructureIndex };
}

export function StructureSetting({ selectedStructure }: Props) {
  const [
    styles,
    screen,
    getParent,
    setStructureByKey,
    adjustStructureContainerWidth,
    addContainer,
    deleteNode,
    changeStructureLayout,
  ] = useBuilderStore(
    useShallow((s) => [
      s.styles,
      s.screen,
      s.getParent,
      s.setStructureByKey,
      s.adjustStructureContainerWidth,
      s.addContainer,
      s.deleteNode,
      s.changeStructureLayout,
    ])
  );
  const { idx, style, data, children } = selectedStructure;

  const parentStripe = getParent() as StripeTree | undefined;
  const appliedBorderOnStripe =
    (parentStripe?.style.border?.width[1] || 0) + (parentStripe?.style.border?.width[3] || 0);

  const appliedPadding = style.padding?.desktop || styles.general.structurePadding.desktop;

  const maxGap =
    (styles.general.width -
      appliedPadding[1] -
      appliedPadding[3] -
      appliedBorderOnStripe -
      children.length * 30) /
    (children.length - 1);

  return (
    <>
      <Box {...blockStyle}>
        <Stack
          direction="row"
          sx={{
            p: 1.5,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
          }}>
          <Stack direction="row" flexGrow={1} spacing={1.5}>
            {children.map((c, i) => (
              <Box
                key={c.id}
                sx={{
                  textAlign: 'center',
                  bgcolor: 'primary.lighter',
                  color: 'primary.main',
                  py: 1,
                  borderRadius: 0.75,
                  border: '1px dashed',
                  borderColor: 'primary.main',
                  width: `${(c.style.width / styles.general.width) * 100}%`,
                }}>
                {i}
              </Box>
            ))}
          </Stack>

          <Button
            variant="outlined"
            sx={{ width: '42px', height: '42px', minWidth: 0 }}
            onClick={() => {
              addContainer({
                ...selectedStructure.idx,
                containerIndex: children.length,
              });
              adjustStructureContainerWidth(idx);
            }}>
            <Iconify icon="ic:baseline-plus" width={24} />
          </Button>
        </Stack>

        <Stack direction="column" mt={2} spacing={2}>
          {children.map((c, i) => (
            <Stack key={c.id} direction="row" spacing={1} alignItems="center" width={1}>
              <Iconify icon="ant-design:drag-outlined" width={24} />
              <Typography width={90}>Container {i + 1}</Typography>
              <IconButton
                onClick={() => {
                  deleteNode({
                    ...c,
                    idx: { ...selectedStructure.idx, containerIndex: i },
                  });
                  adjustStructureContainerWidth(idx);
                }}>
                <Iconify icon="solar:trash-bin-trash-bold-duotone" width={24} />
              </IconButton>
              <Box flexGrow={1} />
              <XField.Number
                size="small"
                value={c.style.width}
                onChange={(v) => adjustStructureContainerWidth(idx, v, i)}
                sx={{ width: 120 }}
              />
            </Stack>
          ))}
        </Stack>

        <StyleComponent.StructureLayout
          containerWidth={children.map((c) => c.style.width)}
          containerCount={children.length}
          onChange={(v) => changeStructureLayout(idx, v)}
        />
      </Box>

      <Divider />

      {/* {(screen === "desktop" || (screen === "mobile" && style.mobileDirection !== "row")) && ( */}
      <StyleComponent.Block badge title="Gap">
        <XField.Number
          size="small"
          value={style.gap?.[screen] || 0}
          steps={5}
          max={screen === 'desktop' ? Math.floor(maxGap) : undefined}
          onChange={(v) => {
            setStructureByKey(idx, `style.gap.${screen}`, v);
            adjustStructureContainerWidth(idx);
          }}
          sx={{ width: 120 }}
        />
      </StyleComponent.Block>
      {/* )} */}

      {screen === 'mobile' && (
        <>
          <Divider />

          <StyleComponent.Block title="Direction on Mobile">
            <XField.Switch
              sx={{ m: 0 }}
              value={style.responsive}
              onChange={(v) => setStructureByKey(idx, `style.responsive`, v)}
            />
          </StyleComponent.Block>
        </>
      )}

      <Divider />

      <StyleComponent.Color
        title="Background Color"
        value={style.backgroundColor || 'transparent'}
        onChange={(c) => setStructureByKey(idx, 'style.backgroundColor', c)}
      />

      <Divider />

      <StyleComponent.ImageBackground
        title="Background Image"
        value={style.backgroundImage}
        onSrcChange={async (v) => {
          setStructureByKey(idx, `style.backgroundImage.src`, v);
          try {
            const metaData = await getImageMetaData(v);
            setStructureByKey(idx, 'style.backgroundImage.metaData', metaData);
            setStructureByKey(idx, 'style.backgroundImage.width.customValue', metaData.width);
            setStructureByKey(idx, 'style.backgroundImage.height.customValue', metaData.height);
          } catch {
            toast.error(`Failed to fetch image metadata. Please try again.`);
          }
        }}
        onChange={(v) => setStructureByKey(idx, `style.backgroundImage`, v)}
      />

      <Divider />

      <StyleComponent.BorderRadius
        value={style.borderRadius}
        onChange={(v) => setStructureByKey(idx, 'style.borderRadius', v)}
      />

      <Divider />

      <StyleComponent.MarginPadding
        badge
        title={`Padding ${screen}`}
        value={style.padding?.[screen] || styles.general.structurePadding[screen]}
        onChange={(value) => {
          setStructureByKey(idx, `style.padding.${screen}`, value);
          adjustStructureContainerWidth(idx);
        }}
      />

      <Divider />

      <StyleComponent.Hide
        value={data.hide}
        onChange={(v) => setStructureByKey(idx, `data.hide`, v)}
      />
    </>
  );
}
