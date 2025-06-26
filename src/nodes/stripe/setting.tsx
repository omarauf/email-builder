import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { XSelect } from '@/components/x-common';
import { getImageMetaData } from '@/utils/image';
import { StyleComponent } from '@/components/styles';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/hooks/use-builder-store';
import type { StripeTree, StripeIndex } from './type';

interface Props {
  selectedStripe: StripeTree & { idx: StripeIndex };
}

export function StripeSetting({ selectedStripe }: Props) {
  const [styles, setStripeByKey] = useBuilderStore(useShallow((s) => [s.styles, s.setStripeByKey]));
  const { idx, data, style } = selectedStripe;

  return (
    <>
      <StyleComponent.Block title="Message Area">
        <XSelect
          className="w-[120px]"
          value={data.stripeType}
          options={[
            { name: 'Header', id: 'header' },
            { name: 'Content', id: 'content' },
            { name: 'Footer', id: 'footer' },
            { name: 'Info Area', id: 'infoArea' },
          ]}
          onChange={(v) => v && setStripeByKey(idx, `data.stripeType`, v)}
        />
      </StyleComponent.Block>

      <Separator />

      <StyleComponent.Color
        title="Stripe Background Color"
        value={
          style.backgroundColor ||
          styles.stripe[data.stripeType].stripeBackgroundColor ||
          'transparent'
        }
        onChange={(c) => setStripeByKey(idx, 'style.backgroundColor', c)}
      />

      <Separator />

      <StyleComponent.ImageBackground
        title="Stripe Background Image"
        value={style.backgroundImage}
        onSrcChange={async (v) => {
          setStripeByKey(idx, `style.backgroundImage.src`, v);
          try {
            const metaData = await getImageMetaData(v);
            setStripeByKey(idx, 'style.backgroundImage.metaData', metaData);
            setStripeByKey(idx, 'style.backgroundImage.width.customValue', metaData.width);
            setStripeByKey(idx, 'style.backgroundImage.height.customValue', metaData.height);
          } catch {
            toast.error('Failed to fetch image metadata. Please try again.');
          }
        }}
        onChange={(v) => setStripeByKey(idx, `style.backgroundImage`, v)}
      />

      <Separator />

      <StyleComponent.Color
        title="Content Background Color"
        value={
          style.contentBackColor ||
          styles.stripe[data.stripeType].contentBackgroundColor ||
          'transparent'
        }
        onChange={(c) => setStripeByKey(idx, 'style.contentBackColor', c)}
      />

      <Separator />

      <StyleComponent.Border
        value={style.border}
        onChange={(value) => {
          setStripeByKey(idx, 'style.border', value);
        }}
      />

      <Separator />

      <StyleComponent.Hide
        value={data.hide}
        onChange={(v) => setStripeByKey(idx, `data.hide`, v)}
      />
    </>
  );
}
