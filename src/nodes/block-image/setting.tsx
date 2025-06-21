import { Box, Stack, Button, Divider, Tooltip, Typography } from '@mui/material';
import { XField } from '@/components/input';
import { useShallow } from 'zustand/react/shallow';
import { Image as ImageElement } from '@/components/image';
import { fSize } from '@/utils/format-number';
import { blockStyle, StyleComponent } from '@/components/styles';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { BlockImage } from './type';
import type { BlockIndex } from '../block/type';

interface Props {
  selectedBlock: BlockImage & { idx: BlockIndex };
}

export function ImageSetting({ selectedBlock }: Props) {
  const [screen, setBlockByKey, getContainerWidth, fetchImages] = useBuilderStore(
    useShallow((s) => [s.screen, s.setBlockByKey, s.getContainerWidth, s.fetchImages])
  );

  const { idx, data, style } = selectedBlock;

  if (!data.src || !data.image)
    return (
      <XField.Text
        value={data.src}
        label="Image URL"
        onChange={async (v) => {
          setBlockByKey(idx, 'data.src', v);
          fetchImages();
        }}
      />
    );

  return (
    <>
      <Box sx={{ ...blockStyle }}>
        <Stack direction="row" spacing={2}>
          <ImageElement
            src={data.src}
            alt={data.alt}
            sx={{
              width: 120,
              aspectRatio: 1,
              borderRadius: 1,
              backgroundPosition: '0 0, 10px 10px',
              backgroundSize: '20px 20px',
              backgroundImage:
                'linear-gradient(45deg, rgba(0, 0, 0, 0.07) 25%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.07) 0px), linear-gradient(45deg, rgba(0, 0, 0, 0.07) 25%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.07) 0px)',
              boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
            }}
            slotProps={{
              image: { objectFit: 'contain' },
            }}
          />

          <Stack>
            <Tooltip title={data.image.name}>
              <Typography width={200} sx={{ overflow: 'hidden' }}>
                {data.image.name}
              </Typography>
            </Tooltip>

            <Typography variant="body2">
              {data.image.width} x {data.image.height} px
            </Typography>

            {data.image.size !== 0 && (
              <Typography variant="body2">{fSize(data.image.size)}</Typography>
            )}

            <Box flexGrow={1} />

            <Button
              variant="outlined"
              onClick={() => {
                setBlockByKey(idx, 'data.src', '');
                setBlockByKey(idx, 'data.image', undefined);
              }}>
              Change Image
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      <StyleComponent.ExternalLink
        value={data.link}
        onChange={(v) => setBlockByKey(idx, 'data.link', v)}
      />

      <Divider />

      <StyleComponent.Block title="Alternate Text" control>
        <XField.Text
          size="small"
          value={data.alt}
          placeholder="Will be add in alt attribute and title"
          onChange={(v) => setBlockByKey(idx, 'data.alt', v)}
        />
      </StyleComponent.Block>

      <Divider />

      {/* TODO: combine both Responsive Images and Image Size in one components */}
      {screen === 'mobile' && (
        <>
          <StyleComponent.Block badge title="Responsive Image">
            <XField.Switch
              value={style.responsive}
              onChange={(v) => {
                setBlockByKey(idx, 'style.responsive', v);
                if (v) {
                  const maxWidth =
                    getContainerWidth(idx) -
                    (style.padding?.[screen]?.[1] || 0) -
                    (style.padding?.[screen]?.[3] || 0);
                  setBlockByKey(idx, 'style.width.mobile', maxWidth);
                }
              }}
            />
          </StyleComponent.Block>

          <Divider />
        </>
      )}

      <StyleComponent.ImageSize
        title="Image Size"
        originalWidth={data.image.width}
        originalHeight={data.image.height}
        maxWidth={
          getContainerWidth(idx) -
          (style.padding?.[screen]?.[1] || 0) -
          (style.padding?.[screen]?.[3] || 0)
        }
        sizeType={data.sizeType}
        width={style.width?.[screen]}
        height={style.height?.[screen]}
        onChangeValue={(type, v) => {
          setBlockByKey(idx, `style.${type}.${screen}`, v);
          const max =
            getContainerWidth(idx) -
            (style.padding?.[screen]?.[1] || 0) -
            (style.padding?.[screen]?.[3] || 0);
          if (screen === 'mobile' && v !== max) {
            setBlockByKey(idx, 'style.responsive', false);
          }
        }}
        onChangeType={(type) => setBlockByKey(idx, 'data.sizeType', type)}
      />

      <Divider />

      <StyleComponent.Alignment
        title={`Alignment (${screen})`}
        disabled={getContainerWidth(idx) === style.width?.[screen]}
        value={style.align?.[screen]}
        defaultValue="left"
        onChange={(v) => setBlockByKey(idx, `style.align.${screen}`, v)}
      />

      <Divider />

      <StyleComponent.BorderRadius
        value={style.borderRadius}
        onChange={(v) => setBlockByKey(idx, 'style.borderRadius', v)}
      />

      <Divider />

      <StyleComponent.MarginPadding
        badge
        title={`Padding (${screen})`}
        value={style.padding?.[screen]}
        onChange={(value) => setBlockByKey(idx, `style.padding.${screen}`, value)}
      />

      <Divider />

      <StyleComponent.Hide value={data.hide} onChange={(v) => setBlockByKey(idx, `data.hide`, v)} />
    </>
  );
}
