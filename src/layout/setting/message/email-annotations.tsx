import { useShallow } from 'zustand/react/shallow';
import { XField } from '@/components/input';
import { Box, Stack, Skeleton, Typography } from '@mui/material';
import { Iconify } from '@/components/iconify';
import { Label } from '@/components/label';
import { useBuilderStore } from '@/hooks/use-builder-store';
import { Block, blockStyle } from '@/components/styles/block';

export function EmailAnnotations() {
  const [meta, setMetaByKey] = useBuilderStore(useShallow((s) => [s.meta, s.setMetaByKey]));

  const onChangeHandler = (v: boolean) => {
    if (v === false)
      setMetaByKey('emailAnnotations', {
        enable: false,
        endOfOffer: undefined,
        offerBadge: undefined,
        promoCode: undefined,
        promoImage: undefined,
        senderLogo: undefined,
      });
    else
      setMetaByKey('emailAnnotations', {
        enable: true,
        endOfOffer: undefined,
        offerBadge: undefined,
        promoCode: undefined,
        promoImage: undefined,
        senderLogo: undefined,
      });
  };

  return (
    <>
      <Block
        title="Email annotations for Gmail"
        control={<XField.Switch value={meta.emailAnnotations.enable} onChange={onChangeHandler} />}>
        <Typography variant="caption" color="textSecondary">
          This feature lets you showcase your deals, discounts, or offers directly in
          recipients&apos; inboxes before they open the email. Effective on mobile devices in
          Gmail’s “Promotions” folder.
        </Typography>
      </Block>

      {meta.emailAnnotations.enable && (
        <Stack spacing={2} sx={{ px: blockStyle.px, pb: blockStyle.py }}>
          <GmailSearch />

          <Typography variant="caption" ml={1} sx={{ textTransform: 'uppercase' }}>
            Promotions
          </Typography>

          <GmailProfile />
        </Stack>
      )}
    </>
  );
}

function GmailProfile() {
  const meta = useBuilderStore((s) => s.meta);

  return (
    <Stack direction="row" spacing={2}>
      {meta.emailAnnotations.senderLogo ? (
        <Box
          component="img"
          src={meta.emailAnnotations.senderLogo}
          width={40}
          height={40}
          borderRadius={999}
        />
      ) : (
        <Skeleton variant="circular" width={40} height={40} />
      )}

      <Stack>
        <Typography variant="subtitle2">Search in mail</Typography>
        <Typography variant="body2">
          {meta.subject || 'Enter subject in the field above'}
        </Typography>
        <Typography variant="body2">
          {meta.preheader || 'Enter hidden preheader in the field above'}
        </Typography>
        <Stack direction="row" spacing={2}>
          {meta.emailAnnotations.offerBadge && (
            <Label color="success" sx={{ px: 1 }}>
              {meta.emailAnnotations.offerBadge}
            </Label>
          )}

          {meta.emailAnnotations.promoCode && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="caption">Code</Typography>
              <Label color="default" sx={{ px: 1 }}>
                {meta.emailAnnotations.promoCode}
              </Label>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

function GmailSearch() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        px: 2,
        py: 1,
        boxShadow: '0 1px 4px -2px #000',
        borderRadius: 1,
        bgcolor: 'background.paper',
      }}>
      <Iconify icon="material-symbols:menu" />

      <Typography variant="subtitle2" ml={1}>
        Search in mail
      </Typography>

      <Box flexGrow={1} />

      <Skeleton variant="circular" width={24} height={24} />
    </Stack>
  );
}
