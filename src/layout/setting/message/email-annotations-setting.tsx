import { useShallow } from 'zustand/react/shallow';
import { XField } from '@/components/input';
import { Divider } from '@mui/material';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { Block } from '@/components/styles/block';

export function EmailAnnotationsSetting() {
  const [meta, setMetaByKey] = useBuilderStore(useShallow((s) => [s.meta, s.setMetaByKey]));

  if (meta.emailAnnotations.enable === false) return null;

  return (
    <>
      <Divider sx={{ borderBottomWidth: 2 }} />

      <Block
        title="Offer Badge"
        control={
          <XField.Switch
            value={meta.emailAnnotations.offerBadge !== undefined}
            onChange={(v) => {
              if (v) setMetaByKey('emailAnnotations.offerBadge', '20% off');
              else setMetaByKey('emailAnnotations.offerBadge', undefined);
            }}
          />
        }>
        {meta.emailAnnotations.offerBadge !== undefined && (
          <XField.Text
            size="small"
            value={meta.emailAnnotations.offerBadge || ''}
            onChange={(v) => setMetaByKey('emailAnnotations.offerBadge', v)}
          />
        )}
      </Block>

      <Divider sx={{ borderBottomWidth: 2 }} />

      <Block
        title="Promocode Badge"
        control={
          <XField.Switch
            value={meta.emailAnnotations.promoCode !== undefined}
            onChange={(v) => {
              if (v) setMetaByKey('emailAnnotations.promoCode', 'PROMO-20%OFF');
              else setMetaByKey('emailAnnotations.promoCode', undefined);
            }}
          />
        }>
        {meta.emailAnnotations.promoCode !== undefined && (
          <XField.Text
            size="small"
            value={meta.emailAnnotations.promoCode || ''}
            onChange={(v) => setMetaByKey('emailAnnotations.promoCode', v)}
          />
        )}
      </Block>

      <Divider sx={{ borderBottomWidth: 2 }} />

      <Block
        title="Include Sender Logo"
        control={
          <XField.Switch
            value={meta.emailAnnotations.senderLogo !== undefined}
            onChange={(v) => {
              if (v) setMetaByKey('emailAnnotations.senderLogo', '');
              else setMetaByKey('emailAnnotations.senderLogo', undefined);
            }}
          />
        }>
        {meta.emailAnnotations.senderLogo !== undefined && (
          <XField.Text
            size="small"
            value={meta.emailAnnotations.senderLogo || ''}
            onChange={(v) => setMetaByKey('emailAnnotations.senderLogo', v)}
          />
        )}
      </Block>

      {/* <Divider sx={{ borderBottomWidth: 2 }} />

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

      <Divider sx={{ borderBottomWidth: 2 }} />

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
