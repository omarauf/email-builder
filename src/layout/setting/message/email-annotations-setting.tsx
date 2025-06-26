import { useShallow } from 'zustand/react/shallow';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Block } from '@/components/styles/block';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/hooks/use-builder-store';

export function EmailAnnotationsSetting() {
  const [meta, setMetaByKey] = useBuilderStore(useShallow((s) => [s.meta, s.setMetaByKey]));

  if (meta.emailAnnotations.enable === false) return null;

  return (
    <>
      <Separator />

      <Block
        title="Offer Badge"
        control={
          <Switch
            checked={meta.emailAnnotations.offerBadge !== undefined}
            onCheckedChange={(v) => {
              if (v) setMetaByKey('emailAnnotations.offerBadge', '20% off');
              else setMetaByKey('emailAnnotations.offerBadge', undefined);
            }}
          />
        }>
        {meta.emailAnnotations.offerBadge !== undefined && (
          <Input
            value={meta.emailAnnotations.offerBadge || ''}
            onChange={(e) => setMetaByKey('emailAnnotations.offerBadge', e.target.value)}
          />
        )}
      </Block>

      <Separator />

      <Block
        title="Promocode Badge"
        control={
          <Switch
            checked={meta.emailAnnotations.promoCode !== undefined}
            onCheckedChange={(v) => {
              if (v) setMetaByKey('emailAnnotations.promoCode', 'PROMO-20%OFF');
              else setMetaByKey('emailAnnotations.promoCode', undefined);
            }}
          />
        }>
        {meta.emailAnnotations.promoCode !== undefined && (
          <Input
            value={meta.emailAnnotations.promoCode || ''}
            onChange={(e) => setMetaByKey('emailAnnotations.promoCode', e.target.value)}
          />
        )}
      </Block>

      <Separator />

      <Block
        title="Include Sender Logo"
        control={
          <Switch
            checked={meta.emailAnnotations.senderLogo !== undefined}
            onCheckedChange={(v) => {
              if (v) setMetaByKey('emailAnnotations.senderLogo', '');
              else setMetaByKey('emailAnnotations.senderLogo', undefined);
            }}
          />
        }>
        {meta.emailAnnotations.senderLogo !== undefined && (
          <Input
            value={meta.emailAnnotations.senderLogo || ''}
            onChange={(e) => setMetaByKey('emailAnnotations.senderLogo', e.target.value)}
          />
        )}
      </Block>

      {/* <Separator />

      <Block
        title="Include a Promo Image"
        control={
          <XField.Switch
            value={meta.emailAnnotations.promoImage !== undefined}
            onChange={(v) => {
              if (v) setMetaByKey("emailAnnotations.promoImage", "");
              else setMetaByKey("emailAnnotations.promoImage", undefined);
            }}
          />
        }
      >
        {meta.emailAnnotations.promoImage !== undefined && (
          <ImageSelector
            value={meta.emailAnnotations.promoImage}
            onChange={async (v) => setMetaByKey("emailAnnotations.promoImage", v)}
          />
        )}
      </Block>

      <Separator />

      <Block
        title="End of discount offer"
        control={
          <XField.Switch
            value={meta.emailAnnotations.endOfOffer !== undefined}
            onChange={(v) => {
              if (v) setMetaByKey("emailAnnotations.endOfOffer", "");
              else setMetaByKey("emailAnnotations.endOfOffer", undefined);
            }}
          />
        }
      >
        {meta.emailAnnotations.endOfOffer !== undefined && (
          <Stack>
            <XDateTimePicker
              value={meta.emailAnnotations.endOfOffer}
              onChange={(v) => setMetaByKey("emailAnnotations.endOfOffer", v)}
              slotProps={{ textField: { size: "small" } }}
            />
          </Stack>
        )}
      </Block> */}
    </>
  );
}
