import { useShallow } from 'zustand/react/shallow';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { StyleComponent } from '@/components/styles';
import { Separator } from '@/components/ui/separator';
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
      <div className="p-2">
        <Input
          value={data.src}
          placeholder="Enter Image URL here"
          onChange={(e) => {
            setBlockByKey(idx, 'data.src', e.target.value);
            fetchImages();
          }}
        />
      </div>
    );

  return (
    <>
      <StyleComponent.ImageChanger
        src={data.src}
        alt={data.alt}
        metaData={data.image}
        onChange={() => {
          setBlockByKey(idx, 'data.src', '');
          setBlockByKey(idx, 'data.image', undefined);
        }}
      />

      <Separator />

      <StyleComponent.ExternalLink
        value={data.link}
        onChange={(v) => setBlockByKey(idx, 'data.link', v)}
      />

      <Separator />

      <StyleComponent.Block title="Alternate Text" control>
        <Input
          value={data.alt}
          placeholder="Will be add in alt attribute and title"
          onChange={(e) => setBlockByKey(idx, 'data.alt', e.target.value)}
        />
      </StyleComponent.Block>

      <Separator />

      {/* TODO: combine both Responsive Images and Image Size in one components */}
      {screen === 'mobile' && (
        <>
          <StyleComponent.Block badge title="Responsive Image">
            <Switch
              checked={style.responsive}
              onCheckedChange={(v) => {
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

          <Separator />
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

      <Separator />

      <StyleComponent.Alignment
        title={`Alignment (${screen})`}
        disabled={getContainerWidth(idx) === style.width?.[screen]}
        value={style.align?.[screen]}
        defaultValue="left"
        onChange={(v) => setBlockByKey(idx, `style.align.${screen}`, v)}
      />

      <Separator />

      <StyleComponent.BorderRadius
        value={style.borderRadius}
        onChange={(v) => setBlockByKey(idx, 'style.borderRadius', v)}
      />

      <Separator />

      <StyleComponent.MarginPadding
        badge
        title={`Padding (${screen})`}
        value={style.padding?.[screen]}
        onChange={(value) => setBlockByKey(idx, `style.padding.${screen}`, value)}
      />

      <Separator />

      <StyleComponent.Hide value={data.hide} onChange={(v) => setBlockByKey(idx, `data.hide`, v)} />
    </>
  );
}
