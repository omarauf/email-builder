import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';
import { XField } from '@/components/input';
import { Iconify } from '@/components/iconify';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { getImageMetaData } from '@/utils/image';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { blockStyle, StyleComponent } from '@/components/styles';
import type { StripeTree } from '../stripe/type';
import type { StructureTree, StructureIndex } from './type';

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
      <div className={cn(blockStyle.px, blockStyle.py)}>
        <div className="flex rounded-xl border p-3">
          <div className="flex grow gap-3">
            {children.map((c, i) => (
              <div
                key={c.id}
                className="bg-primary/50 border-muted-foreground rounded-lg border border-dashed py-2 text-center"
                style={{ width: `${(c.style.width / styles.general.width) * 100}%` }}>
                {i}
              </div>
            ))}
          </div>

          <Button
            size="icon"
            variant="outline"
            className="h-10.5 w-10.5"
            onClick={() => {
              addContainer({
                ...selectedStructure.idx,
                containerIndex: children.length,
              });
              adjustStructureContainerWidth(idx);
            }}>
            <Iconify icon="ic:baseline-plus" width={24} />
          </Button>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {children.map((c, i) => (
            <div key={c.id} className="flex w-full items-center gap-2">
              <Iconify icon="ant-design:drag-outlined" width={24} />
              <p className="w-fit">Container {i + 1}</p>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  deleteNode({ ...c, idx: { ...selectedStructure.idx, containerIndex: i } });
                  adjustStructureContainerWidth(idx);
                }}>
                <Iconify icon="solar:trash-bin-trash-bold-duotone" width={24} />
              </Button>
              <div className="grow" />
              <XField.Number
                className="w-[120px]"
                value={c.style.width}
                onChange={(v) => adjustStructureContainerWidth(idx, v, i)}
              />
            </div>
          ))}
        </div>

        <StyleComponent.StructureLayout
          containerWidth={children.map((c) => c.style.width)}
          containerCount={children.length}
          onChange={(v) => changeStructureLayout(idx, v)}
        />
      </div>

      <Separator />

      <StyleComponent.Block badge title="Gap">
        <XField.Number
          value={style.gap?.[screen] || 0}
          steps={5}
          max={screen === 'desktop' ? Math.floor(maxGap) : undefined}
          className="w-[120px]"
          onChange={(v) => {
            setStructureByKey(idx, `style.gap.${screen}`, v);
            adjustStructureContainerWidth(idx);
          }}
        />
      </StyleComponent.Block>

      {screen === 'mobile' && (
        <>
          <Separator />

          <StyleComponent.Block title="Direction on Mobile">
            <Switch
              checked={style.responsive}
              onCheckedChange={(v) => setStructureByKey(idx, `style.responsive`, v)}
            />
          </StyleComponent.Block>
        </>
      )}

      <Separator />

      <StyleComponent.Color
        title="Background Color"
        value={style.backgroundColor || 'transparent'}
        onChange={(c) => setStructureByKey(idx, 'style.backgroundColor', c)}
      />

      <Separator />

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

      <Separator />

      <StyleComponent.BorderRadius
        value={style.borderRadius}
        onChange={(v) => setStructureByKey(idx, 'style.borderRadius', v)}
      />

      <Separator />

      <StyleComponent.MarginPadding
        badge
        title={`Padding ${screen}`}
        value={style.padding?.[screen] || styles.general.structurePadding[screen]}
        onChange={(value) => {
          setStructureByKey(idx, `style.padding.${screen}`, value);
          adjustStructureContainerWidth(idx);
        }}
      />

      <Separator />

      <StyleComponent.Hide
        value={data.hide}
        onChange={(v) => setStructureByKey(idx, `data.hide`, v)}
      />
    </>
  );
}
