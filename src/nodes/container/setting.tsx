import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { getImageMetaData } from '@/utils/image';
import { StyleComponent } from '@/components/styles';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { ContainerTree, ContainerIndex } from './type';

interface Props {
  selectedContainer: ContainerTree & { idx: ContainerIndex };
}

export function ContainerSetting({ selectedContainer }: Props) {
  const [styles, screen, setContainerByKey] = useBuilderStore(
    useShallow((s) => [s.styles, s.screen, s.setContainerByKey])
  );

  const { idx, style, data } = selectedContainer;

  return (
    <>
      <StyleComponent.MarginPadding
        badge
        title={`Padding (${screen})`}
        value={style.padding?.[screen] || styles.general.structurePadding[screen]}
        onChange={(value) => setContainerByKey(idx, `style.padding.${screen}`, value)}
      />

      <Separator />

      <StyleComponent.Color
        title={`Background Color (${screen})`}
        value={style.backgroundColor || 'transparent'}
        onChange={(c) => setContainerByKey(idx, 'style.backgroundColor', c)}
      />

      <Separator />

      <StyleComponent.ImageBackground
        title={`Background Image (${screen})`}
        value={style.backgroundImage}
        onSrcChange={async (v) => {
          setContainerByKey(idx, `style.backgroundImage.src`, v);
          try {
            const metaData = await getImageMetaData(v);
            setContainerByKey(idx, 'style.backgroundImage.metaData', metaData);
            setContainerByKey(idx, 'style.backgroundImage.width.customValue', metaData.width);
            setContainerByKey(idx, 'style.backgroundImage.height.customValue', metaData.height);
          } catch {
            toast.error('Failed to fetch image metadata. Please try again.');
          }
        }}
        onChange={(v) => setContainerByKey(idx, `style.backgroundImage`, v)}
      />

      <Separator />

      <StyleComponent.Border
        value={style.border}
        onChange={(v) => setContainerByKey(idx, 'style.border', v)}
      />

      <Separator />

      <StyleComponent.BorderRadius
        value={style.borderRadius}
        onChange={(v) => setContainerByKey(idx, 'style.borderRadius', v)}
      />

      <Separator />

      <StyleComponent.Hide
        value={data.hide}
        onChange={(v) => setContainerByKey(idx, `data.hide`, v)}
      />
    </>
  );
}
